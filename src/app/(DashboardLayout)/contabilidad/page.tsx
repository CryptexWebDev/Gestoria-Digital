"use client"

import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid2"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TablePagination from "@mui/material/TablePagination"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import BlankCard from "@/app/components/shared/BlankCard"
import DashboardCard from "@/app/components/shared/DashboardCard"
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel"
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField"
import { CreateProveedorClienteModal } from "../components/create-proveedor-cliente-modal"


const periodos = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07", "2024-08", "2024-09"]
const periodosLabel = ["Ene 2024", "Feb 2024", "Mar 2024", "Abr 2024", "May 2024", "Jun 2024", "Jul 2024", "Ago 2024", "Sep 2024"]

function buildAsientosDemo() {
  const rows: { id: string; fecha: string; asiento: string; factura: string; dt: string; ct: string; importe: number; tipo: string }[] = []
  const cuentasDt = ["600", "570", "640", "628"]
  const cuentasCt = ["410", "430", "400", "572"]
  for (let i = 1; i <= 48; i++) {
    const mes = (i % 9) + 1
    rows.push({
      id: String(i),
      fecha: `${String((i % 25) + 1).padStart(2, "0")}/${String(mes).padStart(2, "0")}/2024`,
      asiento: String(99 + i),
      factura: `F-${String(i).padStart(3, "0")}`,
      dt: cuentasDt[i % cuentasDt.length],
      ct: cuentasCt[i % cuentasCt.length],
      importe: 300 + (i * 41) % 1500,
      tipo: i % 3 === 0 ? "Ingreso" : "Gasto",
    })
  }
  return rows
}

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

export default function ContabilidadPage() {
  const { t } = useTranslation()
  const [asientos, setAsientos] = useState(buildAsientosDemo)
  const [desde, setDesde] = useState("2024-01")
  const [hasta, setHasta] = useState("2024-09")
  const [tipoFilter, setTipoFilter] = useState("")
  const [tipoOperacion, setTipoOperacion] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [proveedorModalOpen, setProveedorModalOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "" })

  const BCrumb = [
    { to: "/", title: t("Inicio") },
    { title: t("Contabilidad") },
  ]

  const filteredRows = useMemo(() => {
    return asientos.filter((row) => {
      const parts = row.fecha.split("/")
      const rowMes = Number(parts[1])
      const rowPeriodo = `2024-${String(rowMes).padStart(2, "0")}`
      if (rowPeriodo < desde || rowPeriodo > hasta) return false
      if (tipoFilter && row.tipo !== tipoFilter) return false
      return true
    })
  }, [asientos, desde, hasta, tipoFilter])

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage
    return filteredRows.slice(start, start + rowsPerPage)
  }, [filteredRows, page, rowsPerPage])

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const handleCrearAsiento = () => {
    const nextId = String(asientos.length + 1)
    const last = asientos[asientos.length - 1]
    const nextAsiento = last ? String(parseInt(last.asiento, 10) + 1) : "150"
    setAsientos((prev) => [
      ...prev,
      {
        id: nextId,
        fecha: new Date().toISOString().slice(0, 10).split("-").reverse().join("/"),
        asiento: nextAsiento,
        factura: "F-NEW",
        dt: "600",
        ct: "410",
        importe: 500,
        tipo: tipoOperacion === "ingreso" ? "Ingreso" : "Gasto",
      },
    ])
    setSnackbar({ open: true, message: t("contabilidad.asientoCreadoOk") })
  }

  return (
    <PageContainer title={t("contabilidad.pageTitle")} description={t("contabilidad.pageDescription")}>
      <Breadcrumb title={t("Contabilidad")} items={BCrumb} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <BlankCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("contabilidad.nuevaOperacion")}
              </Typography>
              <Stack spacing={2}>
                <CustomFormLabel>{t("contabilidad.fecha")}</CustomFormLabel>
                <CustomTextField type="date" fullWidth size="small" />
                <FormControl size="small" fullWidth>
                  <Select value={tipoOperacion} onChange={(e) => setTipoOperacion(e.target.value)} sx={{ minHeight: 40 }}>
                    <MenuItem value="">{t("contabilidad.elegir")}</MenuItem>
                    <MenuItem value="gasto">{t("contabilidad.gasto")}</MenuItem>
                    <MenuItem value="ingreso">{t("contabilidad.ingreso")}</MenuItem>
                  </Select>
                </FormControl>
                <CustomFormLabel>{t("contabilidad.proveedorCliente")}</CustomFormLabel>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CustomTextField fullWidth size="small" placeholder={t("contabilidad.seleccionarCrear")} />
                  <Button variant="outlined" size="small" onClick={() => setProveedorModalOpen(true)}>
                    {t("contabilidad.crear")}
                  </Button>
                </Stack>
                <CustomFormLabel>{t("contabilidad.concepto")}</CustomFormLabel>
                <CustomTextField fullWidth size="small" />
                <CustomFormLabel>{t("contabilidad.importeSinIva")}</CustomFormLabel>
                <Stack direction="row" spacing={2}>
                  <CustomTextField fullWidth size="small" placeholder={t("contabilidad.sinIva")} />
                  <CustomTextField fullWidth size="small" placeholder={t("contabilidad.conIva")} />
                </Stack>
                <Button variant="contained" onClick={handleCrearAsiento}>{t("contabilidad.crearAsiento")}</Button>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <DashboardCard
            title={t("contabilidad.libroContable")}
            subtitle={t("contabilidad.filtrosPeriodo")}
          >
            <Box>
              <Stack direction="row" flexWrap="wrap" gap={2} mb={2}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value={desde} onChange={(e) => { setDesde(e.target.value); setPage(0) }} sx={{ minHeight: 40 }}>
                    {periodos.map((p, i) => (
                      <MenuItem key={p} value={p}>{periodosLabel[i]}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value={hasta} onChange={(e) => { setHasta(e.target.value); setPage(0) }} sx={{ minHeight: 40 }}>
                    {periodos.map((p, i) => (
                      <MenuItem key={p} value={p}>{periodosLabel[i]}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value={tipoFilter} onChange={(e) => { setTipoFilter(e.target.value); setPage(0) }} sx={{ minHeight: 40 }}>
                    <MenuItem value="">{t("common.todos")}</MenuItem>
                    <MenuItem value="Gasto">{t("contabilidad.gasto")}</MenuItem>
                    <MenuItem value="Ingreso">{t("contabilidad.ingreso")}</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <TableContainer>
                <Table size="small" sx={{ whiteSpace: "nowrap" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("contabilidad.fecha")}</Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("contabilidad.numeroAsiento")}</Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("contabilidad.numeroFactura")}</Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>Dt</Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>Ct</Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("common.importe")}</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedRows.map((row) => (
                      <TableRow key={row.id} sx={{ cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}>
                        <TableCell>{row.fecha}</TableCell>
                        <TableCell>{row.asiento}</TableCell>
                        <TableCell>{row.factura}</TableCell>
                        <TableCell>{row.dt}</TableCell>
                        <TableCell>{row.ct}</TableCell>
                        <TableCell>€{row.importe}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={filteredRows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                labelRowsPerPage={t("common.filasPorPagina")}
                labelDisplayedRows={({ from, to, count }) => t("common.paginatedCount", { from, to, count })}
              />
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
      <CreateProveedorClienteModal
        open={proveedorModalOpen}
        onClose={() => setProveedorModalOpen(false)}
        type="proveedor"
        onCreate={() => setSnackbar({ open: true, message: t("contabilidad.proveedorCreadoOk") })}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </PageContainer>
  )
}

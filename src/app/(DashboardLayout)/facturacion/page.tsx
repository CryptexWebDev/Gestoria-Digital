"use client"

import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import FormControl from "@mui/material/FormControl"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
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
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import BlankCard from "@/app/components/shared/BlankCard"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { CreateProveedorClienteModal } from "../components/create-proveedor-cliente-modal"
import { IconSearch } from "@tabler/icons-react"


const proveedores = ["Proveedor A", "Proveedor B", "Suministros XYZ", "Servicios Técnicos SL", "Marketing Plus", "Cliente Alpha", "Cliente Beta"]
const estados = ["Pendiente", "Contabilizado"] as const

function buildFacturasDemo() {
  const rows: { id: string; fecha: string; numero: string; proveedor: string; importe: number; estado: typeof estados[number] }[] = []
  for (let i = 1; i <= 55; i++) {
    const prov = proveedores[i % proveedores.length]
    const estado = i % 3 === 0 ? "Contabilizado" : "Pendiente"
    rows.push({
      id: String(i),
      fecha: `${String((i % 28) + 1).padStart(2, "0")}/09/2024`,
      numero: `F-2024-${String(i).padStart(3, "0")}`,
      proveedor: prov,
      importe: 400 + (i * 37) % 2000,
      estado,
    })
  }
  return rows
}

const facturasDemo = buildFacturasDemo()
const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50]

export default function FacturacionPage() {
  const { t } = useTranslation()
  const [search, setSearch] = useState("")
  const [estadoFilter, setEstadoFilter] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [proveedorModalOpen, setProveedorModalOpen] = useState(false)
  const [clienteModalOpen, setClienteModalOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "" })

  const BCrumb = [
    { to: "/", title: t("Inicio") },
    { title: t("Facturación") },
  ]

  const filteredRows = useMemo(() => {
    return facturasDemo.filter((row) => {
      if (estadoFilter && row.estado !== estadoFilter) return false
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        if (!row.proveedor.toLowerCase().includes(q) && !row.numero.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [search, estadoFilter])

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage
    return filteredRows.slice(start, start + rowsPerPage)
  }, [filteredRows, page, rowsPerPage])

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <PageContainer title={t("facturacion.pageTitle")} description={t("facturacion.pageDescription")}>
      <Breadcrumb title={t("Facturación")} items={BCrumb} />
      <Stack spacing={3}>
        <BlankCard>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {t("facturacion.dragText")}
            </Typography>
            <Box
              sx={{
                border: "2px dashed",
                borderColor: "divider",
                borderRadius: 1,
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {t("facturacion.zonaDrop")}
              </Typography>
            </Box>
          </CardContent>
        </BlankCard>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => setProveedorModalOpen(true)}>{t("facturacion.nuevoProveedor")}</Button>
          <Button variant="contained" color="secondary" onClick={() => setClienteModalOpen(true)}>{t("facturacion.nuevoCliente")}</Button>
        </Stack>
        <DashboardCard title={t("facturacion.documentosCargados")} subtitle={t("common.demo")}>
          <Box>
          <Stack direction="row" flexWrap="wrap" gap={2} mb={2} alignItems="center">
            <TextField
              size="small"
              placeholder={t("facturacion.buscarPlaceholder")}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0) }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size={18} />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 260 }}
            />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select value={estadoFilter} onChange={(e) => { setEstadoFilter(e.target.value); setPage(0) }} sx={{ minHeight: 40 }}>
                <MenuItem value="">{t("common.todos")}</MenuItem>
                <MenuItem value="Pendiente">{t("facturacion.pendiente")}</MenuItem>
                <MenuItem value="Contabilizado">{t("facturacion.contabilizado")}</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("facturacion.fecha")}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("facturacion.numeroFactura")}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("facturacion.proveedorCliente")}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("common.importe")}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("facturacion.estado")}</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row) => (
                  <TableRow key={row.id} sx={{ cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}>
                    <TableCell>{row.fecha}</TableCell>
                    <TableCell>{row.numero}</TableCell>
                    <TableCell>{row.proveedor}</TableCell>
                    <TableCell>€{row.importe}</TableCell>
                    <TableCell>{row.estado === "Pendiente" ? t("facturacion.pendiente") : t("facturacion.contabilizado")}</TableCell>
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
      </Stack>
      <CreateProveedorClienteModal
        open={proveedorModalOpen}
        onClose={() => setProveedorModalOpen(false)}
        type="proveedor"
        onCreate={() => setSnackbar({ open: true, message: t("facturacion.proveedorCreadoOk") })}
      />
      <CreateProveedorClienteModal
        open={clienteModalOpen}
        onClose={() => setClienteModalOpen(false)}
        type="cliente"
        onCreate={() => setSnackbar({ open: true, message: t("facturacion.clienteCreadoOk") })}
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

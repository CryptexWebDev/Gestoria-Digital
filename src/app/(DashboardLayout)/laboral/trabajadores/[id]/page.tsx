"use client"

import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
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
import Link from "next/link"
import { useParams } from "next/navigation"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import BlankCard from "@/app/components/shared/BlankCard"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { SendEmailModal } from "../../../components/send-email-modal"
import { trabajadoresListDemo, buildDocumentosLaboralesMock, MONTHS } from "../../../inicio-data"
import { IconDownload, IconMail } from "@tabler/icons-react"

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

export default function TrabajadorProfilePage() {
  const params = useParams()
  const id = params?.id as string
  const worker = trabajadoresListDemo.find((w) => w.id === id) ?? trabajadoresListDemo[0]

  const [tipoFilter, setTipoFilter] = useState("")
  const [anoFilter, setAnoFilter] = useState("")
  const [mesFilter, setMesFilter] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "" })

  const allDocs = useMemo(() => buildDocumentosLaboralesMock(trabajadoresListDemo).filter((d) => d.trabajadorId === id), [id])
  const filteredDocs = useMemo(() => {
    return allDocs.filter((row) => {
      if (tipoFilter && row.tipoValue !== tipoFilter) return false
      if (anoFilter && String(row.ano) !== anoFilter) return false
      if (mesFilter && String(row.mes) !== mesFilter) return false
      return true
    })
  }, [allDocs, tipoFilter, anoFilter, mesFilter])

  const paginatedDocs = useMemo(() => {
    const start = page * rowsPerPage
    return filteredDocs.slice(start, start + rowsPerPage)
  }, [filteredDocs, page, rowsPerPage])

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedDocs.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(paginatedDocs.map((d) => d.id)))
  }
  const toggleSelect = (docId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(docId)) next.delete(docId)
      else next.add(docId)
      return next
    })
  }
  const emailItems = useMemo(() => {
    const docs = selectedIds.size ? paginatedDocs.filter((d) => selectedIds.has(d.id)) : paginatedDocs
    return docs.map((d) => ({ id: d.id, label: `${d.tipo} - ${d.mesLabel} ${d.ano}` }))
  }, [paginatedDocs, selectedIds])

  const { t } = useTranslation()
  const BCrumb = [
    { to: "/", title: t("Inicio") },
    { to: "/laboral/documentos-laborales", title: t("Laboral") },
    { to: "/laboral/trabajadores", title: t("Trabajadores") },
    { title: worker.nombre },
  ]

  return (
    <PageContainer title={worker.nombre} description={t("laboral.profileDescription")}>
      <Breadcrumb title={worker.nombre} items={BCrumb} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <BlankCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("laboral.datosTrabajador")}
              </Typography>
              <Stack spacing={1.5}>
                <Typography variant="body2"><strong>{t("laboral.nombre")}:</strong> {worker.nombre}</Typography>
                <Typography variant="body2"><strong>{t("laboral.nif")}:</strong> {worker.nif}</Typography>
                <Typography variant="body2"><strong>{t("laboral.numeroSS")}:</strong> {worker.numeroSS}</Typography>
                <Typography variant="body2"><strong>{t("laboral.direccion")}:</strong> Calle Ejemplo 5, Madrid (demo)</Typography>
                <Typography variant="body2"><strong>{t("laboral.telefono")}:</strong> {worker.telefono}</Typography>
                <Typography variant="body2"><strong>{t("modals.email")}:</strong> {worker.email}</Typography>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardCard
            title={t("laboral.documentosTrabajador")}
            subtitle={t("laboral.filtrosDocumentoAnoMes")}
            action={
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  startIcon={<IconDownload size={16} />}
                  onClick={() => setSnackbar({ open: true, message: t("laboral.descargaIniciadaN", { n: selectedIds.size || paginatedDocs.length }) })}
                >
                  {t("common.descargar")}
                </Button>
                <Button size="small" startIcon={<IconMail size={16} />} onClick={() => setEmailModalOpen(true)}>
                  {t("common.enviar")}
                </Button>
              </Stack>
            }
          >
            <Box>
            <Stack direction="row" flexWrap="wrap" gap={2} mb={2}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={tipoFilter}
                  onChange={(e) => { setTipoFilter(e.target.value); setPage(0) }}
                  displayEmpty
                  renderValue={(v) => {
                    if (v === "") return t("common.todos")
                    return v === "nomina" ? t("documentosLaborales.nomina") : v === "contrato" ? t("documentosLaborales.contrato") : t("documentosLaborales.finiquito")
                  }}
                  sx={{ minHeight: 40 }}
                >
                  <MenuItem value="">{t("common.todos")}</MenuItem>
                  <MenuItem value="nomina">{t("documentosLaborales.nomina")}</MenuItem>
                  <MenuItem value="contrato">{t("documentosLaborales.contrato")}</MenuItem>
                  <MenuItem value="finiquito">{t("documentosLaborales.finiquito")}</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 90 }}>
                <Select
                  value={anoFilter}
                  onChange={(e) => { setAnoFilter(e.target.value); setPage(0) }}
                  displayEmpty
                  renderValue={(v) => (v === "" ? t("common.todos") : v)}
                  sx={{ minHeight: 40 }}
                >
                  <MenuItem value="">{t("common.todos")}</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 90 }}>
                <Select
                  value={mesFilter}
                  onChange={(e) => { setMesFilter(e.target.value); setPage(0) }}
                  displayEmpty
                  renderValue={(v) => (v === "" ? t("common.todos") : (MONTHS[Number(v) - 1] ?? v))}
                  sx={{ minHeight: 40 }}
                >
                  <MenuItem value="">{t("common.todos")}</MenuItem>
                  {MONTHS.map((label, i) => (
                    <MenuItem key={label} value={String(i + 1)}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <TableContainer>
              <Table size="small" sx={{ whiteSpace: "nowrap" }}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={paginatedDocs.length > 0 && selectedIds.size === paginatedDocs.length}
                        indeterminate={selectedIds.size > 0 && selectedIds.size < paginatedDocs.length}
                        onChange={toggleSelectAll}
                      />
                      <Typography component="span" variant="subtitle2" fontWeight={600} sx={{ ml: 0.5 }}>{t("laboral.sel")}</Typography>
                    </TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("laboral.documento")}</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("common.mes")}</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("common.ano")}</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("common.importe")}</Typography></TableCell>
                    <TableCell width={80} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedDocs.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox size="small" checked={selectedIds.has(row.id)} onChange={() => toggleSelect(row.id)} />
                      </TableCell>
                      <TableCell>{row.tipo}</TableCell>
                      <TableCell>{row.mesLabel}</TableCell>
                      <TableCell>{row.ano}</TableCell>
                      <TableCell>{row.importe != null ? `€${row.importe}` : "—"}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => setSnackbar({ open: true, message: t("laboral.descargaIniciadaDoc", { tipo: row.tipo, mes: row.mesLabel, ano: row.ano }) })}>
                          {t("common.descargar")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredDocs.length}
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
      <SendEmailModal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        defaultEmail={worker.email}
        defaultSubject={t("laboral.asuntoDocumentos", { nombre: worker.nombre })}
        items={emailItems.length ? emailItems : [{ id: "0", label: t("laboral.ningunDocumento") }]}
        title={t("modals.enviarPorEmail")}
        onSend={() => setSnackbar({ open: true, message: t("laboral.emailEnviadoOk") })}
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

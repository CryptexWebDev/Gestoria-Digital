"use client"

import { useMemo, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Snackbar from "@mui/material/Snackbar"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TablePagination from "@mui/material/TablePagination"
import Typography from "@mui/material/Typography"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { SendEmailModal } from "../../components/send-email-modal"
import { trabajadoresListDemo, buildDocumentosLaboralesMock, MONTHS, companyDemo } from "../../inicio-data"
import { IconDownload, IconMail } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"


const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50]

export default function DocumentosLaboralesPage() {
  const { t } = useTranslation()
  const [tipoDoc, setTipoDoc] = useState<string>("")
  const [ano, setAno] = useState<string>("")
  const [mes, setMes] = useState<string>("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [emailModalItems, setEmailModalItems] = useState<{ id: string; label: string }[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: "" })

  const allRows = useMemo(() => buildDocumentosLaboralesMock(trabajadoresListDemo), [])

  const filteredRows = useMemo(() => {
    return allRows.filter((row) => {
      if (tipoDoc && row.tipoValue !== tipoDoc) return false
      if (ano && String(row.ano) !== ano) return false
      if (mes && String(row.mes) !== mes) return false
      return true
    })
  }, [allRows, tipoDoc, ano, mes])

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage
    return filteredRows.slice(start, start + rowsPerPage)
  }, [filteredRows, page, rowsPerPage])

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedRows.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(paginatedRows.map((r) => r.id)))
  }
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const BCrumb = [
    { to: "/", title: "Inicio" },
    { to: "/laboral/documentos-laborales", title: "Laboral" },
    { title: "Documentos laborales" },
  ]

  const handleDownloadSelected = () => {
    const n = selectedIds.size || paginatedRows.length
    setSnackbar({ open: true, message: n ? t("documentosLaborales.descargaIniciada", { n }) : t("laboral.ningunDocumento") })
  }
  const handleOpenEmailModal = (items: { id: string; label: string }[]) => {
    setEmailModalItems(items)
    setEmailModalOpen(true)
  }
  const handleSendEmail = () => {
    setSnackbar({ open: true, message: t("documentosLaborales.emailEnviadoOk") })
  }
  const handleRowDownload = (row: (typeof paginatedRows)[0]) => {
    setSnackbar({ open: true, message: t("documentosLaborales.descargaFila", { tipo: row.tipo, trabajador: row.trabajador }) })
  }
  const handleRowEmail = (row: (typeof paginatedRows)[0]) => {
    handleOpenEmailModal([{ id: row.id, label: `${row.tipo} - ${row.trabajador} (${row.mesLabel} ${row.ano})` }])
  }

  return (
    <PageContainer title={t("documentosLaborales.pageTitle")} description={t("documentosLaborales.pageDescription")}>
      <Breadcrumb title={t("documentosLaborales.title")} items={BCrumb.map((b) => ({ ...b, title: t(b.title) }))} />
      <DashboardCard
        title={t("documentosLaborales.cardTitle")}
        subtitle={t("documentosLaborales.cardSubtitle")}
        action={
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" startIcon={<IconDownload size={18} />} onClick={handleDownloadSelected}>
              {t("documentosLaborales.download")}
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<IconMail size={18} />}
              onClick={() => {
                const items = selectedIds.size
                  ? paginatedRows.filter((r) => selectedIds.has(r.id)).map((r) => ({ id: r.id, label: `${r.tipo} - ${r.trabajador} (${r.mesLabel} ${r.ano})` }))
                  : paginatedRows.map((r) => ({ id: r.id, label: `${r.tipo} - ${r.trabajador} (${r.mesLabel} ${r.ano})` }))
                handleOpenEmailModal(items.length ? items : [{ id: "0", label: t("laboral.ningunDocumento") }])
              }}
            >
              {t("documentosLaborales.sendEmail")}
            </Button>
          </Stack>
        }
      >
        <Box>
        <Stack direction="row" flexWrap="wrap" gap={2} mb={3}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={tipoDoc}
              onChange={(e) => { setTipoDoc(e.target.value); setPage(0) }}
              sx={{ minHeight: 40 }}
            >
              <MenuItem value="">{t("documentosLaborales.todos")}</MenuItem>
              <MenuItem value="nomina">{t("documentosLaborales.nomina")}</MenuItem>
              <MenuItem value="contrato">{t("documentosLaborales.contrato")}</MenuItem>
              <MenuItem value="finiquito">{t("documentosLaborales.finiquito")}</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={ano}
              onChange={(e) => { setAno(e.target.value); setPage(0) }}
              sx={{ minHeight: 40 }}
            >
              <MenuItem value="">{t("documentosLaborales.todos")}</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={mes}
              onChange={(e) => { setMes(e.target.value); setPage(0) }}
              sx={{ minHeight: 40 }}
            >
              <MenuItem value="">{t("documentosLaborales.todos")}</MenuItem>
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
                    checked={paginatedRows.length > 0 && selectedIds.size === paginatedRows.length}
                    indeterminate={selectedIds.size > 0 && selectedIds.size < paginatedRows.length}
                    onChange={toggleSelectAll}
                  />
                  <Typography component="span" variant="subtitle2" fontWeight={600} sx={{ ml: 0.5 }}>{t("documentosLaborales.sel")}</Typography>
                </TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("documentosLaborales.tipoDocumento")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("documentosLaborales.trabajador")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("laboral.nif")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("documentosLaborales.ano")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("documentosLaborales.mes")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("documentosLaborales.importe")}</Typography></TableCell>
                <TableCell width={80} />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" checked={selectedIds.has(row.id)} onChange={() => toggleSelect(row.id)} />
                  </TableCell>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>{row.trabajador}</TableCell>
                  <TableCell>{row.nif}</TableCell>
                  <TableCell>{row.ano}</TableCell>
                  <TableCell>{row.mesLabel}</TableCell>
                  <TableCell>{row.importe != null ? `€${row.importe}` : "—"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      <Button size="small" onClick={() => handleRowDownload(row)}>{t("documentosLaborales.download")}</Button>
                      <Button size="small" onClick={() => handleRowEmail(row)}>{t("modals.email")}</Button>
                    </Stack>
                  </TableCell>
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
          labelRowsPerPage={t("documentosLaborales.rowsPerPage")}
          labelDisplayedRows={({ from, to, count }) => t("common.paginatedCount", { from, to, count })}
        />
        </Box>
      </DashboardCard>
      <SendEmailModal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        defaultEmail={companyDemo.email}
        defaultSubject="Documentos laborales"
        items={emailModalItems}
        title={t("documentosLaborales.sendEmail")}
        onSend={handleSendEmail}
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

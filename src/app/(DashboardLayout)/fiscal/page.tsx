"use client"

import React, { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Box from "@mui/material/Box"
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
import DashboardCard from "@/app/components/shared/DashboardCard"
import { SendEmailModal } from "../components/send-email-modal"
import { ultimasDeclaracionesDemo, companyDemo } from "../inicio-data"
import { IconDownload, IconMail } from "@tabler/icons-react"


const currentYear = new Date().getFullYear()

const fiscalDocTypes = [
  { doc: "IVA", modelo: "303" },
  { doc: "IRPF trabajadores", modelo: "111" },
  { doc: "IRPF alquiler", modelo: "115" },
  { doc: "IRPF", modelo: "130" },
  { doc: "Sociedades", modelo: "202" },
  { doc: "Resumen anual", modelo: "390" },
]
const periodos = ["1T", "2T", "3T", "4T", "Anual"]

function buildFiscalDemoRows() {
  const rows = [...ultimasDeclaracionesDemo]
  let id = rows.length + 1
  const periodosQt = ["1T", "2T", "3T", "4T"]
  for (const { doc, modelo } of fiscalDocTypes) {
    for (const ano of [currentYear - 1, currentYear]) {
      for (const p of periodosQt) {
        rows.push({ id: String(id++), documento: doc, modelo, periodo: p, ano, importe: 500 + (id % 4500) })
      }
      if (doc === "Resumen anual" || doc === "IVA") {
        rows.push({ id: String(id++), documento: doc, modelo, periodo: "Anual", ano, importe: 0 })
      }
    }
  }
  return rows
}

const fiscalDemoRows = buildFiscalDemoRows()

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50]

export default function FiscalPage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const anoParam = searchParams.get("ano")
  const defaultYear = anoParam && /^\d{4}$/.test(anoParam) ? anoParam : String(currentYear)

  const BCrumb = [
    { to: "/", title: t("Inicio") },
    { title: t("Fiscal") },
  ]

  const [ano, setAno] = useState(defaultYear)
  const [modelo, setModelo] = useState("")
  const [periodo, setPeriodo] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "" })

  const filteredRows = useMemo(() => {
    return fiscalDemoRows.filter((row) => {
      if (ano && String(row.ano) !== ano) return false
      if (modelo && row.modelo !== modelo) return false
      if (periodo && row.periodo !== periodo) return false
      return true
    })
  }, [ano, modelo, periodo])

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
  const itemsForEmail = useMemo(() => {
    const rows = selectedIds.size ? paginatedRows.filter((r) => selectedIds.has(r.id)) : paginatedRows
    return rows.map((r) => ({ id: r.id, label: `${r.documento} ${r.modelo} - ${r.periodo} ${r.ano}` }))
  }, [paginatedRows, selectedIds])

  return (
    <PageContainer title={t("fiscal.pageTitle")} description={t("fiscal.pageDescription")}>
      <Breadcrumb title={t("Fiscal")} items={BCrumb} />
      <DashboardCard
        title={t("fiscal.declaraciones")}
        subtitle={t("fiscal.filtrosDescarga")}
        action={
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<IconDownload size={18} />}
              onClick={() => setSnackbar({ open: true, message: t("fiscal.descargaIniciadaN", { n: selectedIds.size || paginatedRows.length }) })}
            >
              {t("fiscal.descargarSeleccionados")}
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<IconMail size={18} />}
              onClick={() => setEmailModalOpen(true)}
            >
              {t("fiscal.enviarPorEmail")}
            </Button>
          </Stack>
        }
      >
        <Box>
        <Stack direction="row" flexWrap="wrap" gap={2} mb={3}>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={ano}
              onChange={(e) => { setAno(e.target.value); setPage(0) }}
              displayEmpty
              renderValue={(v) => (v === "" ? t("common.todos") : v)}
              sx={{ minHeight: 40 }}
            >
              <MenuItem value="">{t("common.todos")}</MenuItem>
              <MenuItem value={String(currentYear)}>{currentYear}</MenuItem>
              <MenuItem value={String(currentYear - 1)}>{currentYear - 1}</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={modelo}
              onChange={(e) => { setModelo(e.target.value); setPage(0) }}
              displayEmpty
              renderValue={(v) => (v === "" ? t("common.todos") : v)}
              sx={{ minHeight: 40 }}
            >
              <MenuItem value="">{t("common.todos")}</MenuItem>
              <MenuItem value="303">303</MenuItem>
              <MenuItem value="111">111</MenuItem>
              <MenuItem value="115">115</MenuItem>
              <MenuItem value="130">130</MenuItem>
              <MenuItem value="202">202</MenuItem>
              <MenuItem value="390">390</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={periodo}
              onChange={(e) => { setPeriodo(e.target.value); setPage(0) }}
              displayEmpty
              renderValue={(v) => (v === "" ? t("common.todos") : v)}
              sx={{ minHeight: 40 }}
            >
              <MenuItem value="">{t("common.todos")}</MenuItem>
              <MenuItem value="1T">1T</MenuItem>
              <MenuItem value="2T">2T</MenuItem>
              <MenuItem value="3T">3T</MenuItem>
              <MenuItem value="4T">4T</MenuItem>
              <MenuItem value="Anual">Anual</MenuItem>
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
                </TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("common.documento")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("common.modelo")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("common.periodo")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("common.ano")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("common.importe")}</Typography></TableCell>
                <TableCell width={48} />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" checked={selectedIds.has(row.id)} onChange={() => toggleSelect(row.id)} />
                  </TableCell>
                  <TableCell>{row.documento}</TableCell>
                  <TableCell>{row.modelo}</TableCell>
                  <TableCell>{row.periodo}</TableCell>
                  <TableCell>{row.ano}</TableCell>
                  <TableCell>€{row.importe}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<IconDownload size={16} />}
                      onClick={() => setSnackbar({ open: true, message: t("inicio.descargaIniciada", { doc: row.documento, modelo: row.modelo }) })}
                    >
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
      <SendEmailModal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        defaultEmail={companyDemo.email}
        defaultSubject={t("fiscal.asuntoDefault", { ano: ano || currentYear })}
        items={itemsForEmail.length ? itemsForEmail : [{ id: "0", label: t("fiscal.ningunaSeleccionada") }]}
        title={t("fiscal.enviarPorEmail")}
        onSend={() => setSnackbar({ open: true, message: t("fiscal.emailEnviadoOk") })}
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

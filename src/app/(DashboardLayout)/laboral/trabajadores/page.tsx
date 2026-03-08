"use client"

import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import Box from "@mui/material/Box"
import InputAdornment from "@mui/material/InputAdornment"
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
import Link from "next/link"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { trabajadoresListDemo } from "../../inicio-data"
import { IconSearch } from "@tabler/icons-react"


const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

export default function TrabajadoresPage() {
  const { t } = useTranslation()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const BCrumb = [
    { to: "/", title: t("Inicio") },
    { to: "/laboral/documentos-laborales", title: t("Laboral") },
    { title: t("Trabajadores") },
  ]

  const filteredRows = useMemo(() => {
    if (!search.trim()) return trabajadoresListDemo
    const q = search.trim().toLowerCase()
    return trabajadoresListDemo.filter(
      (row) =>
        row.nombre.toLowerCase().includes(q) ||
        row.nif.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q)
    )
  }, [search])

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
    <PageContainer title={t("laboral.trabajadoresPageTitle")} description={t("laboral.trabajadoresDescription")}>
      <Breadcrumb title={t("Trabajadores")} items={BCrumb} />
      <DashboardCard title={t("laboral.trabajadoresPageTitle")} subtitle={t("laboral.clicVerPerfil")}>
        <Box>
        <Box mb={2} display="flex" flexWrap="wrap" gap={2} alignItems="center">
          <TextField
            size="small"
            placeholder={t("laboral.buscarPlaceholder")}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0) }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 280 }}
          />
        </Box>
        <TableContainer>
          <Table size="small" sx={{ whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("laboral.nombre")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("laboral.nif")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("laboral.numeroSS")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("laboral.telefono")}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>{t("modals.email")}</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row.id}
                  component={Link}
                  href={`/laboral/trabajadores/${row.id}`}
                  sx={{
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.nif}</TableCell>
                  <TableCell>{row.numeroSS}</TableCell>
                  <TableCell>{row.telefono}</TableCell>
                  <TableCell>{row.email}</TableCell>
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
    </PageContainer>
  )
}

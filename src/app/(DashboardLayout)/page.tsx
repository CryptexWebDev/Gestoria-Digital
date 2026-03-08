"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
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
import IconButton from "@mui/material/IconButton"
import Link from "next/link"
import React, { useMemo, useState } from "react"
import Snackbar from "@mui/material/Snackbar"
import { useTranslation } from "react-i18next"
import PageContainer from "@/app/components/container/PageContainer"
import DashboardCard from "@/app/components/shared/DashboardCard"
import CompanyInfoCard from "@/app/components/dashboards/dashboard-cliente/company-info-card"
import IngresosVsGastosWidget from "@/app/components/dashboards/dashboard-cliente/ingresos-vs-gastos-widget"
import EstructuraGastosWidget from "@/app/components/dashboards/dashboard-cliente/estructura-gastos-widget"
import CosteLaboralWidget from "@/app/components/dashboards/dashboard-cliente/coste-laboral-widget"
import NumeroTrabajadoresWidget from "@/app/components/dashboards/dashboard-cliente/numero-trabajadores-widget"
import DashboardWidgetSkeleton from "@/app/components/dashboards/dashboard-cliente/dashboard-widget-skeleton"
import { companyDemo, ultimasDeclaracionesDemo } from "./inicio-data"
import { IconDownload } from "@tabler/icons-react"

const currentYear = new Date().getFullYear()

const DECLARACIONES_ROWS_PER_PAGE = 5

export default function InicioPage() {
  const { t } = useTranslation()
  const [year, setYear] = useState(String(currentYear))
  const [isLoading, setIsLoading] = useState(false)
  const [declPage, setDeclPage] = useState(0)
  const [snackbar, setSnackbar] = useState({ open: false, message: "" })

  const declaracionesFiltered = useMemo(
    () => ultimasDeclaracionesDemo.filter((row) => String(row.ano) === year),
    [year]
  )
  const declaracionesPaginated = useMemo(
    () => declaracionesFiltered.slice(declPage * DECLARACIONES_ROWS_PER_PAGE, (declPage + 1) * DECLARACIONES_ROWS_PER_PAGE),
    [declaracionesFiltered, declPage]
  )

  const handleDeclPageChange = (_: unknown, newPage: number) => setDeclPage(newPage)

  return (
    <PageContainer title={t("inicio.pageTitle")} description={t("inicio.pageDescription")}>
      <Box>
        <Grid container spacing={3}>
          {/* Company info block */}
          <Grid size={{ xs: 12 }}>
            <CompanyInfoCard
              denominacion={companyDemo.denominacion}
              nombreComercial={companyDemo.nombreComercial}
              tipo={companyDemo.tipo}
              nif={companyDemo.nif}
              direccion={companyDemo.direccion}
              cp={companyDemo.cp}
              municipio={companyDemo.municipio}
              provincia={companyDemo.provincia}
              pais={companyDemo.pais}
              telefono={companyDemo.telefono}
              email={companyDemo.email}
              logoUrl={companyDemo.logoUrl}
            />
          </Grid>

          {/* Global filter: Year */}
          <Grid size={{ xs: 12 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle2" color="textSecondary">
                {t("common.ano")}:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  value={year}
                  onChange={(e) => { setYear(e.target.value); setDeclPage(0) }}
                  sx={{ minHeight: 40 }}
                >
                  <MenuItem value={String(currentYear)}>{currentYear}</MenuItem>
                  <MenuItem value={String(currentYear - 1)}>{currentYear - 1}</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          {/* Widgets 2×2 — equal height per row */}
          <Grid size={{ xs: 12, sm: 6, lg: 6 }} sx={{ display: "flex" }}>
            <Box sx={{ width: "100%", height: "100%", minHeight: 0, display: "flex", flexDirection: "column" }}>
              {isLoading ? (
                <DashboardWidgetSkeleton />
              ) : (
                <IngresosVsGastosWidget
                  cardSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                  contentSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                />
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }} sx={{ display: "flex" }}>
            <Box sx={{ width: "100%", height: "100%", minHeight: 0, display: "flex", flexDirection: "column" }}>
              {isLoading ? (
                <DashboardWidgetSkeleton />
              ) : (
                <EstructuraGastosWidget
                  cardSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                  contentSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                />
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }} sx={{ display: "flex" }}>
            <Box sx={{ width: "100%", height: "100%", minHeight: 0, display: "flex", flexDirection: "column" }}>
              {isLoading ? (
                <DashboardWidgetSkeleton />
              ) : (
                <CosteLaboralWidget
                  cardSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                  contentSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                />
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }} sx={{ display: "flex" }}>
            <Box sx={{ width: "100%", height: "100%", minHeight: 0, display: "flex", flexDirection: "column" }}>
              {isLoading ? (
                <DashboardWidgetSkeleton />
              ) : (
                <NumeroTrabajadoresWidget
                  cardSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                  contentSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                />
              )}
            </Box>
          </Grid>

          {/* Últimas declaraciones de impuestos */}
          <Grid size={{ xs: 12 }}>
            <DashboardCard
              title={t("inicio.ultimasDeclaraciones")}
              subtitle={t("inicio.accesoRapidoFiscal")}
              action={
                <Button component={Link} href={`/fiscal?ano=${year}`} size="small">
                  {t("inicio.verTodas")}
                </Button>
              }
            >
              <Box>
                <TableContainer>
                  <Table size="small" sx={{ whiteSpace: "nowrap" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t("common.documento")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t("common.modelo")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t("common.periodo")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t("common.ano")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t("common.importe")}
                          </Typography>
                        </TableCell>
                        <TableCell width={48} />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {declaracionesPaginated.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.documento}</TableCell>
                          <TableCell>{row.modelo}</TableCell>
                          <TableCell>{row.periodo}</TableCell>
                          <TableCell>{row.ano}</TableCell>
                          <TableCell>€{row.importe}</TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              aria-label={t("common.descargar")}
                              onClick={() => setSnackbar({ open: true, message: t("inicio.descargaIniciada", { doc: row.documento, modelo: row.modelo }) })}
                            >
                              <IconDownload size={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={declaracionesFiltered.length}
                  page={declPage}
                  onPageChange={handleDeclPageChange}
                  rowsPerPage={DECLARACIONES_ROWS_PER_PAGE}
                  rowsPerPageOptions={[DECLARACIONES_ROWS_PER_PAGE]}
                  labelRowsPerPage={t("common.filasPorPagina")}
                  labelDisplayedRows={({ from, to, count }) => t("common.paginatedCount", { from, to, count })}
                />
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
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

"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid2"
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
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Link from "next/link"
import React from "react"
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

export default function InicioPage() {
  const [year, setYear] = React.useState(String(currentYear))
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <PageContainer title="Inicio" description="Dashboard cliente">
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
                Año:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <InputLabel>Año</InputLabel>
                <Select
                  label="Año"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
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
              title="Últimas declaraciones de impuestos"
              subtitle="Acceso rápido a Fiscal"
              action={
                <Button component={Link} href="/fiscal" size="small">
                  Ver todas
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
                            Documento
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Modelo
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Periodo
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Año
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Importe
                          </Typography>
                        </TableCell>
                        <TableCell width={48} />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ultimasDeclaracionesDemo.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.documento}</TableCell>
                          <TableCell>{row.modelo}</TableCell>
                          <TableCell>{row.periodo}</TableCell>
                          <TableCell>{row.ano}</TableCell>
                          <TableCell>€{row.importe}</TableCell>
                          <TableCell>
                            <IconButton size="small" aria-label="Descargar">
                              <IconDownload size={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

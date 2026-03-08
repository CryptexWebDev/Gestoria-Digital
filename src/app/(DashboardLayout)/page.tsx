"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import PageContainer from "@/app/components/container/PageContainer"
import BlankCard from "@/app/components/shared/BlankCard"
import DashboardCard from "@/app/components/shared/DashboardCard"
import ProfielExpanceCard from "@/app/components/dashboards/dashboard2/ProfileExpanceCard"
import TrafficDistribution from "@/app/components/dashboards/dashboard2/TrafficDistribution"
import ProductSales from "@/app/components/dashboards/dashboard2/ProductSales"
import {
  companyDemo,
  trabajadoresMesDemo,
  ultimasDeclaracionesDemo,
} from "./inicio-data"
import { IconDownload, IconEdit } from "@tabler/icons-react"

export default function InicioPage() {
  return (
    <PageContainer title="Inicio" description="Dashboard cliente">
      <Box>
        <Grid container spacing={3}>
          {/* Company info block */}
          <Grid size={{ xs: 12 }}>
            <BlankCard>
              <CardContent>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap={2}
                >
                  <Box>
                    <Typography variant="h5" fontWeight={600}>
                      {companyDemo.denominacion}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {companyDemo.tipo} · NIF/CIF: {companyDemo.nif}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mt={1}>
                      {companyDemo.direccion}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {companyDemo.telefono} · {companyDemo.email}
                    </Typography>
                  </Box>
                  <Button
                    component={Link}
                    href="/datos"
                    variant="outlined"
                    size="small"
                    startIcon={<IconEdit size={18} />}
                  >
                    Editar contactos
                  </Button>
                </Stack>
              </CardContent>
            </BlankCard>
          </Grid>

          {/* Financial dynamics - only when Facturación + Contabilidad enabled (demo) */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              Dinámica financiera
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }} sx={{ display: "flex" }}>
            <Box sx={{ width: "100%", height: "100%", minHeight: 0, display: "flex", flexDirection: "column" }}>
              <ProfielExpanceCard
                cardSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                contentSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }} sx={{ display: "flex" }}>
            <Box sx={{ width: "100%", height: "100%", minHeight: 0, display: "flex", flexDirection: "column" }}>
              <TrafficDistribution
                cardSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                contentSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
              />
            </Box>
          </Grid>

          {/* Laboral */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              Laboral / Trabajadores
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <ProductSales />
          </Grid>
          <Grid size={{ xs: 12, lg: 7 }} sx={{ display: "flex" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              <DashboardCard
                title="Trabajadores del mes"
                subtitle="Clic en fila para ver perfil"
                action={
                  <Button
                    component={Link}
                    href="/laboral/trabajadores"
                    size="small"
                  >
                    Ver todos
                  </Button>
                }
                sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
                contentSx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
              >
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <TableContainer sx={{ flex: 1, minHeight: 0 }}>
                    <Table size="small" sx={{ whiteSpace: "nowrap" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Nombre
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          NIF
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Neto nómina
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Cotización SS
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Coste empresa
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trabajadoresMesDemo.map((row) => (
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
                        <TableCell>€{row.neto}</TableCell>
                        <TableCell>€{row.cotizacion}</TableCell>
                        <TableCell>€{row.coste}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
                </Box>
              </DashboardCard>
            </Box>
          </Grid>

          {/* Impuestos */}
          <Grid size={{ xs: 12 }}>
            <DashboardCard
              title="Últimas declaraciones"
              subtitle="Impuestos (demo)"
              action={
                <Button
                  component={Link}
                  href="/fiscal"
                  size="small"
                >
                  Ver todo
                </Button>
              }
            >
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
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

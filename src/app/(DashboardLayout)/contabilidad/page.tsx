"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
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
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import BlankCard from "@/app/components/shared/BlankCard"
import DashboardCard from "@/app/components/shared/DashboardCard"
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel"
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField"

const BCrumb = [
  { to: "/", title: "Inicio" },
  { title: "Contabilidad" },
]

const asientosDemo = [
  { id: "1", fecha: "01/09/2024", asiento: "100", factura: "F-001", dt: "600", ct: "410", importe: 1210 },
  { id: "2", fecha: "05/09/2024", asiento: "101", factura: "F-002", dt: "570", ct: "430", importe: 500 },
]

export default function ContabilidadPage() {
  return (
    <PageContainer title="Contabilidad" description="Módulo contable (demo)">
      <Breadcrumb title="Contabilidad" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <BlankCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Nueva operación (demo)
              </Typography>
              <Stack spacing={2}>
                <CustomFormLabel>Fecha</CustomFormLabel>
                <CustomTextField type="date" fullWidth size="small" />
                <FormControl size="small" fullWidth>
                  <InputLabel>Tipo operación</InputLabel>
                  <Select label="Tipo operación">
                    <MenuItem value="gasto">Gasto</MenuItem>
                    <MenuItem value="ingreso">Ingreso</MenuItem>
                  </Select>
                </FormControl>
                <CustomFormLabel>Proveedor/Cliente</CustomFormLabel>
                <CustomTextField fullWidth size="small" placeholder="Seleccionar o crear" />
                <CustomFormLabel>Concepto</CustomFormLabel>
                <CustomTextField fullWidth size="small" />
                <CustomFormLabel>Importe (sin IVA / con IVA)</CustomFormLabel>
                <Stack direction="row" spacing={2}>
                  <CustomTextField fullWidth size="small" placeholder="Sin IVA" />
                  <CustomTextField fullWidth size="small" placeholder="Con IVA" />
                </Stack>
                <Button variant="contained">Crear asiento</Button>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <DashboardCard
            title="Libro contable"
            subtitle="Filtros por periodo, cuentas (demo)"
          >
            <Box>
              <Stack direction="row" flexWrap="wrap" gap={2} mb={2}>
                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <InputLabel>Desde</InputLabel>
                  <Select label="Desde"><MenuItem value="2024-09">Sep 2024</MenuItem></Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <InputLabel>Hasta</InputLabel>
                  <Select label="Hasta"><MenuItem value="2024-09">Sep 2024</MenuItem></Select>
                </FormControl>
              </Stack>
              <TableContainer>
              <Table size="small" sx={{ whiteSpace: "nowrap" }}>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Fecha</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Nº asiento</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Nº factura</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Dt</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Ct</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Importe</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asientosDemo.map((row) => (
                    <TableRow key={row.id}>
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
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

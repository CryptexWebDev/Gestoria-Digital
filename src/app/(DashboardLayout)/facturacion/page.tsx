"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
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

const BCrumb = [
  { to: "/", title: "Inicio" },
  { title: "Facturación" },
]

const facturasDemo = [
  { id: "1", fecha: "01/09/2024", numero: "F-2024-001", proveedor: "Proveedor A", importe: 1200, estado: "Pendiente" },
  { id: "2", fecha: "15/09/2024", numero: "F-2024-002", proveedor: "Proveedor B", importe: 850, estado: "Contabilizado" },
]

export default function FacturacionPage() {
  return (
    <PageContainer title="Facturación" description="Módulo de facturación (demo)">
      <Breadcrumb title="Facturación" items={BCrumb} />
      <Stack spacing={3}>
        <BlankCard>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Arrastra aquí facturas (PNG, JPG, PDF) para subir. Demo.
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
                Zona de drag-and-drop
              </Typography>
            </Box>
          </CardContent>
        </BlankCard>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">+ Nuevo proveedor</Button>
          <Button variant="contained" color="secondary">+ Nuevo cliente</Button>
        </Stack>
        <DashboardCard title="Documentos cargados" subtitle="(demo)">
          <Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Fecha</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Nº factura</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Proveedor/Cliente</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Importe</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>Estado</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facturasDemo.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.fecha}</TableCell>
                    <TableCell>{row.numero}</TableCell>
                    <TableCell>{row.proveedor}</TableCell>
                    <TableCell>€{row.importe}</TableCell>
                    <TableCell>{row.estado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
        </DashboardCard>
      </Stack>
    </PageContainer>
  )
}

"use client"

import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import { useParams } from "next/navigation"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import BlankCard from "@/app/components/shared/BlankCard"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { trabajadoresListDemo } from "../../../inicio-data"
import { IconDownload, IconMail } from "@tabler/icons-react"

const docsDemo = [
  { id: "1", tipo: "Nómina", mes: "Sep", ano: 2024, importe: 1850 },
  { id: "2", tipo: "Nómina", mes: "Ago", ano: 2024, importe: 1850 },
]

export default function TrabajadorProfilePage() {
  const params = useParams()
  const id = params?.id as string
  const worker = trabajadoresListDemo.find((w) => w.id === id) ?? trabajadoresListDemo[0]

  const BCrumb = [
    { to: "/", title: "Inicio" },
    { to: "/laboral/documentos-laborales", title: "Laboral" },
    { to: "/laboral/trabajadores", title: "Trabajadores" },
    { title: worker.nombre },
  ]

  return (
    <PageContainer title={worker.nombre} description="Perfil del trabajador">
      <Breadcrumb title={worker.nombre} items={BCrumb} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <BlankCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Datos del trabajador
              </Typography>
              <Stack spacing={1.5}>
                <Typography variant="body2"><strong>Nombre:</strong> {worker.nombre}</Typography>
                <Typography variant="body2"><strong>NIF:</strong> {worker.nif}</Typography>
                <Typography variant="body2"><strong>Nº Seguridad Social:</strong> {worker.numeroSS}</Typography>
                <Typography variant="body2"><strong>Dirección:</strong> Calle Ejemplo 5, Madrid (demo)</Typography>
                <Typography variant="body2"><strong>Teléfono:</strong> {worker.telefono}</Typography>
                <Typography variant="body2"><strong>Email:</strong> {worker.email}</Typography>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardCard
            title="Documentos del trabajador"
            subtitle="Filtros: Documento, Año, Mes (demo)"
            action={
              <Stack direction="row" spacing={1}>
                <Button size="small" startIcon={<IconDownload size={16} />}>Descargar</Button>
                <Button size="small" startIcon={<IconMail size={16} />}>Enviar</Button>
              </Stack>
            }
          >
            <Box>
            <TableContainer>
              <Table size="small" sx={{ whiteSpace: "nowrap" }}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"><Typography variant="subtitle2" fontWeight={600}>Sel.</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Documento</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Mes</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Año</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight={600}>Importe</Typography></TableCell>
                    <TableCell width={80} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {docsDemo.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell padding="checkbox"><Checkbox size="small" /></TableCell>
                      <TableCell>{row.tipo}</TableCell>
                      <TableCell>{row.mes}</TableCell>
                      <TableCell>{row.ano}</TableCell>
                      <TableCell>€{row.importe}</TableCell>
                      <TableCell>
                        <Button size="small">Descargar</Button>
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
    </PageContainer>
  )
}

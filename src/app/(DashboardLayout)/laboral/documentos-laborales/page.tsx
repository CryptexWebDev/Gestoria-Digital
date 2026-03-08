"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
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
import DashboardCard from "@/app/components/shared/DashboardCard"
import { IconDownload, IconMail } from "@tabler/icons-react"

const BCrumb = [
  { to: "/", title: "Inicio" },
  { to: "/laboral/documentos-laborales", title: "Laboral" },
  { title: "Documentos laborales" },
]

const documentosDemo = [
  { id: "1", tipo: "Nómina", trabajador: "Ana García López", nif: "12345678A", ano: 2024, mes: "Sep", importe: 1850 },
  { id: "2", tipo: "Nómina", trabajador: "Carlos Ruiz Sánchez", nif: "87654321B", ano: 2024, mes: "Sep", importe: 2100 },
  { id: "3", tipo: "Contrato", trabajador: "María Fernández", nif: "11223344C", ano: 2024, mes: "Ago", importe: null },
]

export default function DocumentosLaboralesPage() {
  return (
    <PageContainer title="Documentos laborales" description="Documentos laborales">
      <Breadcrumb title="Documentos laborales" items={BCrumb} />
      <DashboardCard
        title="Documentos"
        subtitle="Filtros y acciones (demo)"
        action={
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" startIcon={<IconDownload size={18} />}>
              Descargar
            </Button>
            <Button variant="outlined" size="small" startIcon={<IconMail size={18} />}>
              Enviar por email
            </Button>
          </Stack>
        }
      >
        <Box>
        <Stack direction="row" flexWrap="wrap" gap={2} mb={3}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Tipo documento</InputLabel>
            <Select label="Tipo documento" value="">
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="nomina">Nómina</MenuItem>
              <MenuItem value="contrato">Contrato</MenuItem>
              <MenuItem value="finiquito">Finiquito</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Año</InputLabel>
            <Select label="Año" value="2024">
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Mes</InputLabel>
            <Select label="Mes" value="">
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="9">Sep</MenuItem>
              <MenuItem value="8">Ago</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <TableContainer>
          <Table size="small" sx={{ whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"><Typography variant="subtitle2" fontWeight={600}>Sel.</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Tipo documento</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Trabajador</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>NIF</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Año</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Mes</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Importe</Typography></TableCell>
                <TableCell width={80} />
              </TableRow>
            </TableHead>
            <TableBody>
              {documentosDemo.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox"><Checkbox size="small" /></TableCell>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>{row.trabajador}</TableCell>
                  <TableCell>{row.nif}</TableCell>
                  <TableCell>{row.ano}</TableCell>
                  <TableCell>{row.mes}</TableCell>
                  <TableCell>{row.importe != null ? `€${row.importe}` : "—"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      <Button size="small">Descargar</Button>
                      <Button size="small">Email</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </DashboardCard>
    </PageContainer>
  )
}

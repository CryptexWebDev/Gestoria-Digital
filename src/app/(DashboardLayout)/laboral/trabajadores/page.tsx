"use client"

import Box from "@mui/material/Box"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { trabajadoresListDemo } from "../../inicio-data"
import { IconSearch } from "@tabler/icons-react"

const BCrumb = [
  { to: "/", title: "Inicio" },
  { to: "/laboral/documentos-laborales", title: "Laboral" },
  { title: "Trabajadores" },
]


export default function TrabajadoresPage() {
  return (
    <PageContainer title="Trabajadores" description="Listado de trabajadores">
      <Breadcrumb title="Trabajadores" items={BCrumb} />
      <DashboardCard title="Trabajadores" subtitle="Clic en fila para ver perfil">
        <Box>
        <Box mb={2}>
          <TextField
            size="small"
            placeholder="Buscar por nombre o apellido"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 320 }}
          />
        </Box>
        <TableContainer>
          <Table size="small" sx={{ whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Nombre</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>NIF</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Nº SS</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Teléfono</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Email</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trabajadoresListDemo.map((row) => (
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
        </Box>
      </DashboardCard>
    </PageContainer>
  )
}

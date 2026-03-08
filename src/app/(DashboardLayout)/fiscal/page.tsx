"use client"

import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
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
import Typography from "@mui/material/Typography"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { ultimasDeclaracionesDemo } from "../inicio-data"
import { IconDownload } from "@tabler/icons-react"

const BCrumb = [
  { to: "/", title: "Inicio" },
  { title: "Fiscal" },
]

const fiscalDemoRows = [
  ...ultimasDeclaracionesDemo,
  { id: "5", documento: "IRPF", modelo: "130", periodo: "3T", ano: 2024, importe: 1200 },
  { id: "6", documento: "IVA", modelo: "303", periodo: "2T", ano: 2024, importe: 3100 },
]

export default function FiscalPage() {
  return (
    <PageContainer title="Fiscal" description="Declaraciones fiscales">
      <Breadcrumb title="Fiscal" items={BCrumb} />
      <DashboardCard
        title="Declaraciones"
        subtitle="Filtros y descarga (demo)"
        action={
          <Button variant="outlined" size="small" startIcon={<IconDownload size={18} />}>
            Descargar seleccionados
          </Button>
        }
      >
        <Box>
        <Stack direction="row" flexWrap="wrap" gap={2} mb={3}>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Año</InputLabel>
            <Select label="Año" defaultValue="2024">
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Modelo</InputLabel>
            <Select label="Modelo" defaultValue="">
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="303">303</MenuItem>
              <MenuItem value="111">111</MenuItem>
              <MenuItem value="390">390</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Periodo</InputLabel>
            <Select label="Periodo" defaultValue="">
              <MenuItem value="">Todos</MenuItem>
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
                  <Checkbox size="small" />
                </TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Documento</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Modelo</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Periodo</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Año</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Importe</Typography></TableCell>
                <TableCell width={48} />
              </TableRow>
            </TableHead>
            <TableBody>
              {fiscalDemoRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell>{row.documento}</TableCell>
                  <TableCell>{row.modelo}</TableCell>
                  <TableCell>{row.periodo}</TableCell>
                  <TableCell>{row.ano}</TableCell>
                  <TableCell>€{row.importe}</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<IconDownload size={16} />}>
                      Descargar
                    </Button>
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

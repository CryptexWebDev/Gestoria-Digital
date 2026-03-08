"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import BlankCard from "@/app/components/shared/BlankCard"
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel"
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField"
import { companyDemo } from "../inicio-data"

const BCrumb = [
  { to: "/", title: "Inicio" },
  { title: "Datos" },
]

export default function DatosPage() {
  return (
    <PageContainer title="Datos" description="Datos de la empresa">
      <Breadcrumb title="Datos de la empresa" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomFormLabel>Tipo</CustomFormLabel>
              <CustomTextField
                fullWidth
                variant="outlined"
                defaultValue={companyDemo.tipo}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomFormLabel>Denominación social / Nombre</CustomFormLabel>
              <CustomTextField
                fullWidth
                variant="outlined"
                defaultValue={companyDemo.denominacion}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomFormLabel>NIF/CIF</CustomFormLabel>
              <CustomTextField
                fullWidth
                variant="outlined"
                defaultValue={companyDemo.nif}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <CustomFormLabel>Dirección fiscal</CustomFormLabel>
              <CustomTextField
                fullWidth
                variant="outlined"
                defaultValue={companyDemo.direccion}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomFormLabel>Teléfono(s)</CustomFormLabel>
              <CustomTextField
                fullWidth
                variant="outlined"
                defaultValue={companyDemo.telefono}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomFormLabel>Email(s)</CustomFormLabel>
              <CustomTextField
                fullWidth
                variant="outlined"
                type="email"
                defaultValue={companyDemo.email}
              />
            </Grid>
            <Grid size={12}>
              <Box mt={2}>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="primary">
                    Guardar
                  </Button>
                  <Button variant="outlined">Cancelar</Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </BlankCard>
    </PageContainer>
  )
}

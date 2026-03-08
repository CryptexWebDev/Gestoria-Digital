"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import BlankCard from "@/app/components/shared/BlankCard"
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel"
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField"
import { companyDemo } from "../inicio-data"
import { IconPlus } from "@tabler/icons-react"

const GESTORIA_TOOLTIP = "Para modificar estos datos contacte con su gestoría."

const BCrumb = [
  { to: "/", title: "Inicio" },
  { title: "Datos" },
]

const actividadesDemo = [
  { codigo: "6201", descripcion: "Desarrollo de software", fechaInicio: "01/01/2020" },
]
const cccDemo = [{ ccc: "28 12345678 90", centro: "Madrid - Sede principal" }]

export default function DatosPage() {
  return (
    <PageContainer title="Datos" description="Datos de la empresa">
      <Breadcrumb title="Datos de la empresa" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomFormLabel>Tipo</CustomFormLabel>
              <Tooltip title={GESTORIA_TOOLTIP}>
                <span>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    defaultValue={companyDemo.tipo}
                    InputProps={{ readOnly: true }}
                  />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomFormLabel>Denominación social / Nombre y apellidos</CustomFormLabel>
              <Tooltip title={GESTORIA_TOOLTIP}>
                <span>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    defaultValue={companyDemo.denominacion}
                    InputProps={{ readOnly: true }}
                  />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomFormLabel>NIF/CIF</CustomFormLabel>
              <Tooltip title={GESTORIA_TOOLTIP}>
                <span>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    defaultValue={companyDemo.nif}
                    InputProps={{ readOnly: true }}
                  />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <CustomFormLabel>Actividad(es)</CustomFormLabel>
              <Tooltip title={GESTORIA_TOOLTIP}>
                <span>
                  <Box sx={{ p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
                    {actividadesDemo.map((a, i) => (
                      <Typography key={i} variant="body2">
                        {a.codigo} — {a.descripcion} (desde {a.fechaInicio})
                      </Typography>
                    ))}
                  </Box>
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomFormLabel>Dirección (calle, número)</CustomFormLabel>
              <Tooltip title={GESTORIA_TOOLTIP}>
                <span>
                  <CustomTextField fullWidth variant="outlined" defaultValue={companyDemo.direccion} InputProps={{ readOnly: true }} />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <CustomFormLabel>CP</CustomFormLabel>
              <Tooltip title={GESTORIA_TOOLTIP}>
                <span>
                  <CustomTextField fullWidth variant="outlined" defaultValue={companyDemo.cp} InputProps={{ readOnly: true }} />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <CustomFormLabel>Municipio</CustomFormLabel>
              <Tooltip title={GESTORIA_TOOLTIP}>
                <span>
                  <CustomTextField fullWidth variant="outlined" defaultValue={companyDemo.municipio} InputProps={{ readOnly: true }} />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <CustomFormLabel>Provincia</CustomFormLabel>
              <Tooltip title={GESTORIA_TOOLTIP}>
                <span>
                  <CustomTextField fullWidth variant="outlined" defaultValue={companyDemo.provincia} InputProps={{ readOnly: true }} />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <CustomFormLabel>País</CustomFormLabel>
              <Tooltip title={GESTORIA_TOOLTIP}>
                <span>
                  <CustomTextField fullWidth variant="outlined" defaultValue={companyDemo.pais} InputProps={{ readOnly: true }} />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <CustomFormLabel>CCC y centros de trabajo</CustomFormLabel>
              <Tooltip title={GESTORIA_TOOLTIP}>
                <span>
                  <Box sx={{ p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
                    {cccDemo.map((c, i) => (
                      <Typography key={i} variant="body2">
                        {c.ccc} — {c.centro}
                      </Typography>
                    ))}
                  </Box>
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box id="contactos">
                <CustomFormLabel>Teléfonos</CustomFormLabel>
                <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
                  <CustomTextField size="small" variant="outlined" defaultValue={companyDemo.telefono} sx={{ minWidth: 200 }} />
                  <Button size="small" variant="outlined" startIcon={<IconPlus size={18} />}>
                    Añadir teléfono
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <CustomFormLabel>Emails</CustomFormLabel>
              <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
                <CustomTextField size="small" variant="outlined" type="email" defaultValue={companyDemo.email} sx={{ minWidth: 240 }} />
                <Button size="small" variant="outlined" startIcon={<IconPlus size={18} />}>
                  Añadir email
                </Button>
              </Stack>
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

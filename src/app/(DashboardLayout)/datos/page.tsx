"use client"

import React, { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import { useTranslation } from "react-i18next"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import PageContainer from "@/app/components/container/PageContainer"
import BlankCard from "@/app/components/shared/BlankCard"
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel"
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField"
import { AddContactModal } from "../components/add-contact-modal"
import { companyDemo } from "../inicio-data"
import { IconPlus, IconTrash } from "@tabler/icons-react"

const actividadesDemo = [
  { codigo: "6201", descripcion: "Desarrollo de software", fechaInicio: "01/01/2020" },
]
const cccDemo = [{ ccc: "28 12345678 90", centro: "Madrid - Sede principal" }]

export default function DatosPage() {
  const { t } = useTranslation()
  const [phones, setPhones] = useState<string[]>([companyDemo.telefono])
  const [emails, setEmails] = useState<string[]>([companyDemo.email])
  const [addPhoneOpen, setAddPhoneOpen] = useState(false)
  const [addEmailOpen, setAddEmailOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "" })

  const BCrumb = [
    { to: "/", title: t("Inicio") },
    { title: t("Datos") },
  ]

  const handleAddPhone = (value: string) => {
    setPhones((prev) => [...prev, value])
    setSnackbar({ open: true, message: t("datos.telefonoAñadido") })
  }
  const handleAddEmail = (value: string) => {
    setEmails((prev) => [...prev, value])
    setSnackbar({ open: true, message: t("datos.emailAñadido") })
  }
  const handleRemovePhone = (index: number) => {
    setPhones((prev) => prev.filter((_, i) => i !== index))
    setSnackbar({ open: true, message: t("datos.telefonoEliminado") })
  }
  const handleRemoveEmail = (index: number) => {
    setEmails((prev) => prev.filter((_, i) => i !== index))
    setSnackbar({ open: true, message: t("datos.emailEliminado") })
  }
  const handleGuardar = () => {
    setSnackbar({ open: true, message: t("datos.guardadoOk") })
  }

  return (
    <PageContainer title={t("datos.pageTitle")} description={t("datos.pageDescription")}>
      <Breadcrumb title={t("datos.breadcrumbTitle")} items={BCrumb} />
      <BlankCard>
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomFormLabel>{t("datos.tipo")}</CustomFormLabel>
              <Tooltip title={t("datos.gestoriaTooltip")}>
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
              <CustomFormLabel>{t("datos.denominacion")}</CustomFormLabel>
              <Tooltip title={t("datos.gestoriaTooltip")}>
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
              <CustomFormLabel>{t("datos.nifCif")}</CustomFormLabel>
              <Tooltip title={t("datos.gestoriaTooltip")}>
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
              <CustomFormLabel>{t("datos.actividades")}</CustomFormLabel>
              <Tooltip title={t("datos.gestoriaTooltip")}>
                <span>
                  <Box sx={{ p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
                    {actividadesDemo.map((a, i) => (
                      <Typography key={i} variant="body2">
                        {a.codigo} — {a.descripcion} ({t("datos.desde")} {a.fechaInicio})
                      </Typography>
                    ))}
                  </Box>
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomFormLabel>{t("datos.direccion")}</CustomFormLabel>
              <Tooltip title={t("datos.gestoriaTooltip")}>
                <span>
                  <CustomTextField fullWidth variant="outlined" defaultValue={companyDemo.direccion} InputProps={{ readOnly: true }} />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <CustomFormLabel>{t("datos.cp")}</CustomFormLabel>
              <Tooltip title={t("datos.gestoriaTooltip")}>
                <span>
                  <CustomTextField fullWidth variant="outlined" defaultValue={companyDemo.cp} InputProps={{ readOnly: true }} />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <CustomFormLabel>{t("datos.municipio")}</CustomFormLabel>
              <Tooltip title={t("datos.gestoriaTooltip")}>
                <span>
                  <CustomTextField fullWidth variant="outlined" defaultValue={companyDemo.municipio} InputProps={{ readOnly: true }} />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <CustomFormLabel>{t("datos.provincia")}</CustomFormLabel>
              <Tooltip title={t("datos.gestoriaTooltip")}>
                <span>
                  <CustomTextField fullWidth variant="outlined" defaultValue={companyDemo.provincia} InputProps={{ readOnly: true }} />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <CustomFormLabel>{t("datos.pais")}</CustomFormLabel>
              <Tooltip title={t("datos.gestoriaTooltip")}>
                <span>
                  <CustomTextField fullWidth variant="outlined" defaultValue={companyDemo.pais} InputProps={{ readOnly: true }} />
                </span>
              </Tooltip>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <CustomFormLabel>{t("datos.cccCentros")}</CustomFormLabel>
              <Tooltip title={t("datos.gestoriaTooltip")}>
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
                <CustomFormLabel>{t("datos.telefonos")}</CustomFormLabel>
                <Stack spacing={1}>
                  {phones.map((p, i) => (
                    <Stack key={i} direction="row" alignItems="center" spacing={1}>
                      <CustomTextField size="small" variant="outlined" value={p} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhones((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))} sx={{ minWidth: 200 }} />
                      <IconButton size="small" color="error" aria-label={t("datos.eliminar")} onClick={() => handleRemovePhone(i)}>
                        <IconTrash size={18} />
                      </IconButton>
                    </Stack>
                  ))}
                  <Button size="small" variant="outlined" startIcon={<IconPlus size={18} />} onClick={() => setAddPhoneOpen(true)}>
                    {t("datos.añadirTelefono")}
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <CustomFormLabel>{t("datos.emails")}</CustomFormLabel>
              <Stack spacing={1}>
                {emails.map((e, i) => (
                  <Stack key={i} direction="row" alignItems="center" spacing={1}>
                    <CustomTextField size="small" variant="outlined" type="email" value={e} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setEmails((prev) => prev.map((v, j) => (j === i ? ev.target.value : v)))} sx={{ minWidth: 240 }} />
                    <IconButton size="small" color="error" aria-label={t("datos.eliminar")} onClick={() => handleRemoveEmail(i)}>
                      <IconTrash size={18} />
                    </IconButton>
                  </Stack>
                ))}
                <Button size="small" variant="outlined" startIcon={<IconPlus size={18} />} onClick={() => setAddEmailOpen(true)}>
                  {t("datos.añadirEmail")}
                </Button>
              </Stack>
            </Grid>
            <Grid size={12}>
              <Box mt={2}>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="primary" onClick={handleGuardar}>
                    {t("common.guardar")}
                  </Button>
                  <Button variant="outlined" onClick={() => setSnackbar({ open: true, message: t("datos.canceladoOk") })}>
                    {t("common.cancelar")}
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </BlankCard>
      <AddContactModal open={addPhoneOpen} onClose={() => setAddPhoneOpen(false)} type="phone" onAdd={handleAddPhone} />
      <AddContactModal open={addEmailOpen} onClose={() => setAddEmailOpen(false)} type="email" onAdd={handleAddEmail} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </PageContainer>
  )
}

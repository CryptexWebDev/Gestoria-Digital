"use client"

import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"

export interface CreateProveedorClienteModalProps {
  open: boolean
  onClose: () => void
  type: "proveedor" | "cliente"
  onCreate: (data: { nombre: string; nif: string; email: string }) => void
}

export function CreateProveedorClienteModal({ open, onClose, type, onCreate }: CreateProveedorClienteModalProps) {
  const { t } = useTranslation()
  const [nombre, setNombre] = useState("")
  const [nif, setNif] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (open) {
      setNombre("")
      setNif("")
      setEmail("")
    }
  }, [open])

  const title = type === "proveedor" ? t("modals.crearProveedor") : t("modals.crearCliente")
  const handleSubmit = () => {
    if (nombre.trim()) {
      onCreate({ nombre: nombre.trim(), nif: nif.trim(), email: email.trim() })
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField fullWidth label={t("modals.nombreRazonSocial")} value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <TextField fullWidth label={t("modals.nifCif")} value={nif} onChange={(e) => setNif(e.target.value)} />
          <TextField fullWidth label={t("modals.email")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.cancelar")}</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!nombre.trim()}>
          {t("modals.crear")}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

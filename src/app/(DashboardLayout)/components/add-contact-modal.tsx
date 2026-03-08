"use client"

import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

export interface AddContactModalProps {
  open: boolean
  onClose: () => void
  type: "phone" | "email"
  onAdd: (value: string) => void
}

export function AddContactModal({ open, onClose, type, onAdd }: AddContactModalProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState("")

  useEffect(() => {
    if (open) setValue("")
  }, [open])

  const title = type === "phone" ? t("modals.añadirTelefono") : t("modals.añadirEmail")
  const label = type === "phone" ? t("modals.telefono") : t("modals.email")
  const placeholder = type === "phone" ? t("modals.placeholderPhone") : t("modals.placeholderEmail")

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (trimmed) {
      onAdd(trimmed)
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label={label}
          type={type === "email" ? "email" : "tel"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.cancelar")}</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!value.trim()}>
          {t("modals.añadir")}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

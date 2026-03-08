"use client"

import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"

export interface SendEmailModalProps {
  open: boolean
  onClose: () => void
  defaultEmail?: string
  defaultSubject?: string
  items: { id: string; label: string }[]
  title?: string
  onSend?: (email: string, subject: string, body: string) => void
}

export function SendEmailModal({
  open,
  onClose,
  defaultEmail = "",
  defaultSubject = "Documentos",
  items,
  title,
  onSend,
}: SendEmailModalProps) {
  const { t } = useTranslation()
  const modalTitle = title ?? t("modals.enviarPorEmail")
  const [email, setEmail] = useState(defaultEmail)
  const [subject, setSubject] = useState(defaultSubject)
  const [body, setBody] = useState("")

  useEffect(() => {
    if (open) {
      setEmail(defaultEmail)
      setSubject(defaultSubject)
      setBody("")
    }
  }, [open, defaultEmail, defaultSubject])

  const handleSend = () => {
    onSend?.(email, subject, body)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>
        <TextField
          label={t("modals.emailDestinatario")}
          type="email"
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={t("modals.asunto")}
          fullWidth
          margin="dense"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          label={t("modals.mensaje")}
          fullWidth
          multiline
          rows={3}
          margin="dense"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>
          {t("modals.adjuntos", { n: items.length })}
        </Typography>
        <List dense sx={{ maxHeight: 160, overflow: "auto", bgcolor: "action.hover", borderRadius: 1 }}>
          {items.slice(0, 10).map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.label} primaryTypographyProps={{ variant: "body2" }} />
            </ListItem>
          ))}
          {items.length > 10 && (
            <ListItem>
              <ListItemText primary={t("modals.yMas", { n: items.length - 10 })} primaryTypographyProps={{ variant: "body2" }} />
            </ListItem>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.cancelar")}</Button>
        <Button variant="contained" onClick={handleSend}>{t("common.enviar")}</Button>
      </DialogActions>
    </Dialog>
  )
}


"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Link from "next/link"

interface NoDataPlaceholderProps {
  message?: string
  linkHref?: string
  linkLabel?: string
}

export default function NoDataPlaceholder({
  message = "No hay suficientes datos",
  linkHref,
  linkLabel = "Ir al módulo para empezar",
}: NoDataPlaceholderProps) {
  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        textAlign: "center",
        color: "text.secondary",
      }}
    >
      <Typography variant="body2">{message}</Typography>
      {linkHref && (
        <Button component={Link} href={linkHref} size="small" sx={{ mt: 1 }}>
          {linkLabel}
        </Button>
      )}
    </Box>
  )
}

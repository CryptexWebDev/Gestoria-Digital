"use client"

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import BlankCard from "@/app/components/shared/BlankCard"
import { IconEdit } from "@tabler/icons-react"

interface CompanyInfoCardProps {
  denominacion: string
  nombreComercial?: string
  tipo: string
  nif: string
  direccion: string
  cp: string
  municipio: string
  provincia: string
  pais: string
  telefono: string
  email: string
  logoUrl?: string | null
}

export default function CompanyInfoCard({
  denominacion,
  tipo,
  nif,
  direccion,
  cp,
  municipio,
  provincia,
  pais,
  telefono,
  email,
  logoUrl,
}: CompanyInfoCardProps) {
  const fullAddress = [direccion, cp, municipio, provincia, pais].filter(Boolean).join(", ")

  return (
    <BlankCard>
      <CardContent>
        <Stack direction="row" spacing={3} alignItems="flex-start" flexWrap="wrap">
          <Avatar
            src={logoUrl ?? undefined}
            variant="rounded"
            sx={{ width: 72, height: 72, bgcolor: "primary.light", color: "primary.main" }}
          >
            {denominacion.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h5" fontWeight={600}>
              {denominacion}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {tipo} · NIF/CIF: {nif}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              {fullAddress}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {telefono} · {email}
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/datos#contactos"
            variant="outlined"
            size="small"
            startIcon={<IconEdit size={18} />}
          >
            Editar contactos
          </Button>
        </Stack>
      </CardContent>
    </BlankCard>
  )
}

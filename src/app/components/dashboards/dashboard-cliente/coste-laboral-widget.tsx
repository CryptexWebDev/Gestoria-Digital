"use client"

import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import { useTheme } from "@mui/material/styles"
import dynamic from "next/dynamic"
import Link from "next/link"
import React from "react"
import { useTranslation } from "react-i18next"
import Button from "@mui/material/Button"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { MONTHS, costeLaboralDemo } from "@/app/(DashboardLayout)/inicio-data"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const currentYear = new Date().getFullYear()

interface CosteLaboralWidgetProps {
  cardSx?: Record<string, unknown>
  contentSx?: Record<string, unknown>
}

export default function CosteLaboralWidget({ cardSx, contentSx }: CosteLaboralWidgetProps = {}) {
  const { t } = useTranslation()
  const theme = useTheme()
  const [showLastYear, setShowLastYear] = React.useState(true)

  const primary = theme.palette.primary.main
  const success = theme.palette.success.main

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: { show: false },
      height: 280,
    },
    stroke: { curve: "smooth", width: 2 },
    colors: [primary, success],
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    grid: {
      borderColor: theme.palette.divider,
      padding: { top: 0, bottom: -8, left: 12, right: 12 },
    },
    xaxis: {
      categories: [...MONTHS],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => (val >= 1000 ? `€${(val / 1000).toFixed(0)}K` : `€${val}`),
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      y: {
        formatter: (val: number) => `€${val.toLocaleString()}`,
      },
    },
  }

  const series: ApexCharts.ApexOptions["series"] = [
    { name: `${currentYear}`, data: costeLaboralDemo.currentYear },
    ...(showLastYear ? [{ name: `${currentYear - 1}`, data: costeLaboralDemo.lastYear }] : []),
  ]

  return (
    <DashboardCard
      title={t("widgets.costeLaboral")}
      subtitle={t("widgets.costeTotalSubtitle")}
      sx={cardSx}
      contentSx={contentSx}
      action={
        <Stack direction="row" alignItems="center" spacing={1}>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={showLastYear}
                onChange={(e) => setShowLastYear(e.target.checked)}
              />
            }
            label={t("widgets.compararAnoAnterior")}
            sx={{ "& .MuiFormControlLabel-label": { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" } }}
          />
        </Stack>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        <Box sx={{ flex: 1, minHeight: 280 }}>
          <Chart options={options} series={series} type="line" height={280} width="100%" />
        </Box>
        <Button component={Link} href="/laboral/documentos-laborales" size="small" sx={{ mt: 1 }}>
          {t("widgets.verEnLaboral")}
        </Button>
      </Box>
    </DashboardCard>
  )
}

"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/material/styles"
import dynamic from "next/dynamic"
import Link from "next/link"
import React from "react"
import { useTranslation } from "react-i18next"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { MONTHS, estructuraGastosByYearMonth } from "@/app/(DashboardLayout)/inicio-data"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const currentYear = new Date().getFullYear()

interface EstructuraGastosWidgetProps {
  cardSx?: Record<string, unknown>
  contentSx?: Record<string, unknown>
}

export default function EstructuraGastosWidget({ cardSx, contentSx }: EstructuraGastosWidgetProps = {}) {
  const { t } = useTranslation()
  const theme = useTheme()
  const [year, setYear] = React.useState("")
  const [month, setMonth] = React.useState(String(new Date().getMonth() + 1))

  const availableYears = Object.keys(estructuraGastosByYearMonth).sort((a, b) => Number(b) - Number(a))
  const defaultYear = availableYears[0] ?? String(currentYear)
  const yearData = year
    ? (estructuraGastosByYearMonth[year] ?? estructuraGastosByYearMonth[defaultYear])
    : estructuraGastosByYearMonth[defaultYear]
  const monthData = yearData?.[month] ?? yearData?.["1"] ?? []

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: { show: false },
    },
    labels: monthData.map((d) => d.label),
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.success.main,
      theme.palette.error.main,
      "#9e9e9e",
    ],
    dataLabels: {
      enabled: true,
      formatter: (_: number, opts) => `${opts.w.config.series[opts.seriesIndex]}%`,
      style: { fontSize: "14px" },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "13px",
      itemMargin: { horizontal: 16, vertical: 6 },
      labels: { colors: theme.palette.text.secondary },
      markers: { width: 10, height: 10 },
    },
    plotOptions: {
      pie: {
        dataLabels: { offset: 14 },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      y: {
        formatter: (val: number) => `${val}% del total`,
      },
    },
  }

  const series = monthData.map((d) => d.value)

  return (
    <DashboardCard
      title={t("widgets.estructuraGastos")}
      subtitle={t("widgets.porCategoria")}
      sx={cardSx}
      contentSx={contentSx}
      action={
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 72 }}>
            <Select value={month} onChange={(e) => setMonth(e.target.value)} sx={{ minHeight: 40 }}>
              {MONTHS.map((m, i) => (
                <MenuItem key={m} value={String(i + 1)}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              displayEmpty
              renderValue={(v) => (v === "" ? t("common.elegir") : v)}
              sx={{ minHeight: 40 }}
            >
              <MenuItem value="">
                <em>{t("common.elegir")}</em>
              </MenuItem>
              {Object.keys(estructuraGastosByYearMonth)
                .sort((a, b) => Number(b) - Number(a))
                .map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Stack>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        <Box
          sx={{
            flex: 1,
            minHeight: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .apexcharts-legend": { overflow: "visible", maxHeight: "none" },
            "& .apexcharts-legend-inner": { overflow: "visible", maxHeight: "none" },
          }}
        >
          <Box sx={{ width: "100%", height: 320, maxWidth: 520 }}>
            <Chart options={options} series={series} type="pie" height={320} width="100%" />
          </Box>
        </Box>
        <Button component={Link} href="/contabilidad" size="small" sx={{ mt: 1 }}>
          {t("widgets.detallesContabilidad")}
        </Button>
      </Box>
    </DashboardCard>
  )
}

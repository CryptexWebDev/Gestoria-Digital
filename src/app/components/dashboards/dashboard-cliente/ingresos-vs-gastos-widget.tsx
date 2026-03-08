"use client"

import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import { useTheme } from "@mui/material/styles"
import dynamic from "next/dynamic"
import React from "react"
import { useTranslation } from "react-i18next"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { MONTHS, ingresosGastosByYear } from "@/app/(DashboardLayout)/inicio-data"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const currentYear = new Date().getFullYear()

interface IngresosVsGastosWidgetProps {
  cardSx?: Record<string, unknown>
  contentSx?: Record<string, unknown>
}

export default function IngresosVsGastosWidget({ cardSx, contentSx }: IngresosVsGastosWidgetProps = {}) {
  const { t } = useTranslation()
  const theme = useTheme()
  const [year, setYear] = React.useState("")
  const [compareLastYear, setCompareLastYear] = React.useState(false)

  const primary = theme.palette.primary.main
  const error = theme.palette.error.main
  const success = theme.palette.success.main
  const warning = theme.palette.warning.main

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: { show: false },
      height: 280,
    },
    colors: compareLastYear ? [primary, error, success, warning] : [primary, error],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
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
      title: { text: "€" },
      labels: {
        formatter: (val: number) => (val >= 1000 ? `€${(val / 1000).toFixed(0)}K` : `€${val}`),
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      y: {
        formatter: (val: number) => (val >= 1000 ? `€${(val / 1000).toFixed(0)}K` : `€${val.toLocaleString()}`),
      },
    },
  }

  const availableYears = Object.keys(ingresosGastosByYear).sort((a, b) => Number(b) - Number(a))
  const fallbackYear = availableYears[0] ?? String(currentYear)
  const dataCurrent = year ? (ingresosGastosByYear[year] ?? ingresosGastosByYear[fallbackYear]) : ingresosGastosByYear[fallbackYear]
  const prevYear = String(Number(year) - 1)
  const dataPrev = ingresosGastosByYear[prevYear]

  const series = [
    { name: t("widgets.ingresos"), data: dataCurrent.ingresos },
    { name: t("widgets.gastos"), data: dataCurrent.gastos },
    ...(compareLastYear && dataPrev
      ? [
          { name: `${t("widgets.ingresos")} (${t("widgets.anoAnterior")})`, data: dataPrev.ingresos },
          { name: `${t("widgets.gastos")} (${t("widgets.anoAnterior")})`, data: dataPrev.gastos },
        ]
      : []),
  ]

  return (
    <DashboardCard
      title={t("widgets.ingresosVsGastos")}
      subtitle={t("widgets.porMes")}
      sx={cardSx}
      contentSx={contentSx}
      action={
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 90 }}>
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
              {Object.keys(ingresosGastosByYear)
                .sort((a, b) => Number(b) - Number(a))
                .map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={compareLastYear}
                onChange={(e) => setCompareLastYear(e.target.checked)}
              />
            }
            label={t("widgets.compararAnoAnterior")}
            sx={{ "& .MuiFormControlLabel-label": { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" } }}
          />
        </Stack>
      }
    >
      <Box sx={{ flex: 1, minHeight: 280 }}>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={280}
          width="100%"
        />
      </Box>
    </DashboardCard>
  )
}

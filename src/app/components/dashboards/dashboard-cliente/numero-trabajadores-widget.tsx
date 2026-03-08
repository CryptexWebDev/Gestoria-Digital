"use client"

import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import dynamic from "next/dynamic"
import Link from "next/link"
import React from "react"
import Button from "@mui/material/Button"
import DashboardCard from "@/app/components/shared/DashboardCard"
import { MONTHS, numeroTrabajadoresDemo } from "@/app/(DashboardLayout)/inicio-data"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const currentYear = new Date().getFullYear()

interface NumeroTrabajadoresWidgetProps {
  cardSx?: Record<string, unknown>
  contentSx?: Record<string, unknown>
}

export default function NumeroTrabajadoresWidget({ cardSx, contentSx }: NumeroTrabajadoresWidgetProps = {}) {
  const theme = useTheme()
  const primary = theme.palette.primary.main

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: { show: false },
      height: 280,
    },
    colors: [primary],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 4,
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => String(val),
      offsetY: -20,
      style: { fontSize: "12px" },
    },
    legend: { show: false },
    grid: {
      borderColor: theme.palette.divider,
      padding: { top: 24, bottom: -8, left: 12, right: 12 },
    },
    xaxis: {
      categories: [...MONTHS],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { formatter: (val: number) => String(Math.round(val)) },
      max: Math.max(...numeroTrabajadoresDemo) + 2,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      y: {
        formatter: (val: number) => `${val} trabajador${val !== 1 ? "es" : ""}`,
      },
    },
  }

  const series = [{ name: "Trabajadores", data: numeroTrabajadoresDemo }]

  return (
    <DashboardCard
      title="Número de trabajadores"
      subtitle={`${currentYear} por mes`}
      sx={cardSx}
      contentSx={contentSx}
    >
      <Box sx={{ flex: 1, minHeight: 280 }}>
        <Chart options={options} series={series} type="bar" height={280} width="100%" />
      </Box>
      <Button component={Link} href="/laboral/trabajadores" size="small" sx={{ mt: 1 }}>
        Ver en Trabajadores
      </Button>
    </DashboardCard>
  )
}

"use client"

import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import DashboardCard from "@/app/components/shared/DashboardCard"

export default function DashboardWidgetSkeleton() {
  return (
    <DashboardCard>
      <Box>
        <Skeleton variant="text" width="40%" height={28} />
        <Skeleton variant="text" width="20%" height={20} sx={{ mt: 0.5 }} />
        <Skeleton variant="rounded" width="100%" height={260} sx={{ mt: 2 }} />
      </Box>
    </DashboardCard>
  )
}

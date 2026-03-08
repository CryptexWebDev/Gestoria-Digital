import { pageMetadata } from "@/lib/seo"
import DashboardClientLayout from "./dashboard-client-layout"

export const metadata = pageMetadata({
  title: "Panel",
  description:
    "Panel de cliente para gestión fiscal, laboral, facturación y contabilidad.",
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>
}

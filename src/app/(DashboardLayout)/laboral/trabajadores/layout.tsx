import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Trabajadores",
  description:
    "Listado de trabajadores, altas y bajas, datos de empleados.",
})

export default function TrabajadoresLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Contabilidad",
  description:
    "Asientos contables, libro diario y resúmenes por periodo. Crear asientos y consultar facturas asociadas.",
})

export default function ContabilidadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

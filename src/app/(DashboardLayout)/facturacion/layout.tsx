import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Facturación",
  description:
    "Facturas recibidas y emitidas, proveedores y clientes. Crear facturas y seguimiento de estados.",
})

export default function FacturacionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

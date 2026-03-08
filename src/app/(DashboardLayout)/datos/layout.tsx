import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Datos",
  description:
    "Datos de la empresa, actividades, dirección, CCC y centros, teléfonos y correos de contacto.",
})

export default function DatosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

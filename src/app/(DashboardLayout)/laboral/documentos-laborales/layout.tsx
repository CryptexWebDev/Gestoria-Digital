import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Documentos laborales",
  description:
    "Contratos, nóminas, certificados y otros documentos laborales por trabajador.",
})

export default function DocumentosLaboralesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

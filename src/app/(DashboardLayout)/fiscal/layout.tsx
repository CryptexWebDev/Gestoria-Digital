import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Fiscal",
  description:
    "Declaraciones fiscales, modelos y periodos. Descarga de justificantes y envío a la Agencia Tributaria.",
})

export default function FiscalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

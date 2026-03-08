import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Laboral",
  description:
    "Área laboral: trabajadores, documentos laborales y nóminas.",
})

export default function LaboralLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

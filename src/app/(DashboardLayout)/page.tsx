import { pageMetadata } from "@/lib/seo"
import InicioContent from "./inicio-content"

export const metadata = pageMetadata({
  title: "Inicio",
  description:
    "Panel de inicio con datos de la empresa, ingresos y gastos, coste laboral y últimas declaraciones.",
})

export default function InicioPage() {
  return <InicioContent />
}

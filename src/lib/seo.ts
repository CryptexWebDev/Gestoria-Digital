export const SITE_NAME = "Cliente - Gestoría"
export const DEFAULT_DESCRIPTION =
  "Panel de cliente para gestión fiscal, laboral, facturación y contabilidad."

export interface PageMeta {
  title: string
  description?: string
}

export function pageMetadata({ title, description }: PageMeta) {
  return {
    title,
    description: description ?? DEFAULT_DESCRIPTION,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: description ?? DEFAULT_DESCRIPTION,
    },
  }
}

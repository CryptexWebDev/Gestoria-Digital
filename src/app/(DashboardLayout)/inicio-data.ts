// Demo data for Inicio dashboard (no logic)

export const companyDemo = {
  denominacion: "Ejemplo S.L.",
  nombreComercial: "Ejemplo",
  tipo: "Persona Jurídica",
  nif: "B12345678",
  direccion: "Calle Mayor 1",
  cp: "28001",
  municipio: "Madrid",
  provincia: "Madrid",
  pais: "España",
  telefono: "+34 912 345 678",
  email: "contacto@ejemplo.es",
  logoUrl: null as string | null,
}

export const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"] as const

// Ingresos vs Gastos (monthly, €) — current and previous year
export const ingresosGastosDemo = {
  ingresos: [42, 48, 45, 52, 55, 58, 62, 60, 65, 70, 68, 72],
  gastos: [38, 42, 40, 45, 48, 50, 52, 51, 55, 58, 56, 60],
  ingresosLastYear: [38, 42, 40, 46, 50, 52, 56, 55, 58, 62, 60, 64],
  gastosLastYear: [35, 38, 36, 42, 44, 46, 48, 47, 50, 52, 51, 54],
}

// Estructura gastos (categories, current month)
export const estructuraGastosDemo = [
  { label: "Mercaderías / materias primas", value: 28 },
  { label: "Suministros", value: 12 },
  { label: "Arrendamientos", value: 18 },
  { label: "Servicios profesionales", value: 22 },
  { label: "Publicidad/marketing", value: 8 },
  { label: "Servicios bancarios", value: 5 },
  { label: "Otros gastos", value: 7 },
]

// Coste laboral: current year vs last year (total coste empresa per month)
export const costeLaboralDemo = {
  currentYear: [18500, 19200, 18900, 21000, 21500, 22000, 21800, 22500, 23000, 22800, 23200, 23500],
  lastYear: [17200, 17800, 17500, 19000, 19500, 20000, 19800, 20500, 21000, 20800, 21200, 21500],
}

// Número de trabajadores per month (optionally: permanentes / nuevos)
export const numeroTrabajadoresDemo = [3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6]

export const trabajadoresMesDemo = [
  { id: "1", nombre: "Ana García López", nif: "12345678A", neto: 1850, cotizacion: 320, coste: 2170 },
  { id: "2", nombre: "Carlos Ruiz Sánchez", nif: "87654321B", neto: 2100, cotizacion: 380, coste: 2480 },
  { id: "3", nombre: "María Fernández", nif: "11223344C", neto: 1650, cotizacion: 290, coste: 1940 },
]

export const trabajadoresListDemo = [
  { id: "1", nombre: "Ana García López", nif: "12345678A", numeroSS: "28 12345678 90", telefono: "+34 612 345 678", email: "ana@ejemplo.es" },
  { id: "2", nombre: "Carlos Ruiz Sánchez", nif: "87654321B", numeroSS: "28 87654321 01", telefono: "+34 623 456 789", email: "carlos@ejemplo.es" },
  { id: "3", nombre: "María Fernández", nif: "11223344C", numeroSS: "28 11223344 12", telefono: "+34 634 567 890", email: "maria@ejemplo.es" },
  { id: "4", nombre: "Pedro Martínez", nif: "55667788D", numeroSS: "28 55667788 90", telefono: "+34 600 111 222", email: "pedro@ejemplo.es" },
]

export const ultimasDeclaracionesDemo = [
  { id: "1", documento: "IVA", modelo: "303", periodo: "3T", ano: 2024, importe: 4250 },
  { id: "2", documento: "IRPF trabajadores", modelo: "111", periodo: "3T", ano: 2024, importe: 1890 },
  { id: "3", documento: "IRPF alquiler", modelo: "115", periodo: "3T", ano: 2024, importe: 320 },
  { id: "4", documento: "Resumen anual", modelo: "390", periodo: "Anual", ano: 2023, importe: 0 },
]

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

const ESTRUCTURA_CATEGORIES = [
  "Mercaderías / materias primas",
  "Suministros",
  "Arrendamientos",
  "Servicios profesionales",
  "Publicidad/marketing",
  "Servicios bancarios",
  "Otros gastos",
] as const

// Ingresos vs Gastos: by year (monthly, €)
export const ingresosGastosByYear: Record<string, { ingresos: number[]; gastos: number[] }> = {
  "2024": {
    ingresos: [42, 48, 45, 52, 55, 58, 62, 60, 65, 70, 68, 72],
    gastos: [38, 42, 40, 45, 48, 50, 52, 51, 55, 58, 56, 60],
  },
  "2023": {
    ingresos: [38, 42, 40, 46, 50, 52, 56, 55, 58, 62, 60, 64],
    gastos: [35, 38, 36, 42, 44, 46, 48, 47, 50, 52, 51, 54],
  },
  "2022": {
    ingresos: [35, 38, 37, 42, 45, 47, 50, 49, 52, 55, 53, 57],
    gastos: [32, 35, 34, 39, 41, 43, 45, 44, 47, 50, 48, 52],
  },
}

// Legacy shape for backward compatibility (uses current year data)
export const ingresosGastosDemo = {
  ingresos: ingresosGastosByYear["2024"].ingresos,
  gastos: ingresosGastosByYear["2024"].gastos,
  ingresosLastYear: ingresosGastosByYear["2023"].ingresos,
  gastosLastYear: ingresosGastosByYear["2023"].gastos,
}

// Estructura gastos: by year and month (pie % per category)
function buildEstructuraGastosByYearMonth(): Record<string, Record<string, { label: string; value: number }[]>> {
  const years = ["2022", "2023", "2024"]
  const result: Record<string, Record<string, { label: string; value: number }[]>> = {}
  const base = [28, 12, 18, 22, 8, 5, 7]
  years.forEach((y, yi) => {
    result[y] = {}
    for (let m = 1; m <= 12; m++) {
      result[y][String(m)] = ESTRUCTURA_CATEGORIES.map((label, i) => {
        const variation = Math.sin((yi * 3 + m) * 0.5 + i) * 2
        const value = Math.round(Math.max(3, Math.min(35, base[i] + variation)))
        return { label, value }
      })
      const sum = result[y][String(m)].reduce((s, d) => s + d.value, 0)
      const diff = 100 - sum
      if (diff !== 0) {
        const idx = diff > 0 ? 0 : 1
        result[y][String(m)][idx].value += diff
      }
    }
  })
  return result
}

export const estructuraGastosByYearMonth = buildEstructuraGastosByYearMonth()

export const estructuraGastosDemo = estructuraGastosByYearMonth["2024"][String(new Date().getMonth() + 1)] ?? [
  { label: ESTRUCTURA_CATEGORIES[0], value: 28 },
  { label: ESTRUCTURA_CATEGORIES[1], value: 12 },
  { label: ESTRUCTURA_CATEGORIES[2], value: 18 },
  { label: ESTRUCTURA_CATEGORIES[3], value: 22 },
  { label: ESTRUCTURA_CATEGORIES[4], value: 8 },
  { label: ESTRUCTURA_CATEGORIES[5], value: 5 },
  { label: ESTRUCTURA_CATEGORIES[6], value: 7 },
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

const workerNames = [
  "Ana García López", "Carlos Ruiz Sánchez", "María Fernández", "Pedro Martínez",
  "Laura Gómez", "Javier Díaz", "Elena Torres", "Miguel Ángel Ruiz",
  "Isabel Moreno", "Francisco López", "Carmen Sánchez", "Antonio Jiménez",
  "Rosa Martín", "José García", "Patricia Hernández", "David Fernández",
  "Sandra Martínez", "Daniel González", "Cristina Rodríguez", "Pablo Pérez",
  "Marta López", "Alberto Sánchez", "Lucía Martín", "Raúl García",
]

export const trabajadoresListDemo = workerNames.map((nombre, i) => ({
  id: String(i + 1),
  nombre,
  nif: `${String(10000000 + i).slice(-8)}${"ABCDEFGHJKLMNPQRSTUVWXYZ"[i % 24]}`,
  numeroSS: `28 ${String(10000000 + i).slice(-8)} ${String(10 + (i % 90)).padStart(2, "0")}`,
  telefono: `+34 6${String(100000000 + i).slice(-8)}`,
  email: nombre.toLowerCase().replace(/\s+/g, ".").replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u") + "@ejemplo.es",
}))

export const ultimasDeclaracionesDemo = [
  { id: "1", documento: "IVA", modelo: "303", periodo: "3T", ano: 2024, importe: 4250 },
  { id: "2", documento: "IRPF trabajadores", modelo: "111", periodo: "3T", ano: 2024, importe: 1890 },
  { id: "3", documento: "IRPF alquiler", modelo: "115", periodo: "3T", ano: 2024, importe: 320 },
  { id: "4", documento: "Resumen anual", modelo: "390", periodo: "Anual", ano: 2023, importe: 0 },
  { id: "5", documento: "IRPF", modelo: "130", periodo: "3T", ano: 2024, importe: 1200 },
  { id: "6", documento: "IVA", modelo: "303", periodo: "2T", ano: 2024, importe: 3100 },
  { id: "7", documento: "IRPF trabajadores", modelo: "111", periodo: "2T", ano: 2024, importe: 1650 },
  { id: "8", documento: "Sociedades", modelo: "202", periodo: "1T", ano: 2024, importe: 5200 },
  { id: "9", documento: "IRPF", modelo: "130", periodo: "1T", ano: 2024, importe: 980 },
  { id: "10", documento: "Resumen anual", modelo: "390", periodo: "Anual", ano: 2024, importe: 0 },
]

// Build many labour documents for pagination (used by documentos-laborales and worker profile)
const TIPOS_DOC = ["Nómina", "Contrato", "Finiquito"] as const
const TIPO_TO_VALUE: Record<string, string> = { "Nómina": "nomina", "Contrato": "contrato", "Finiquito": "finiquito" }
export function buildDocumentosLaboralesMock(workers: typeof trabajadoresListDemo) {
  const rows: { id: string; tipo: string; tipoValue: string; trabajador: string; trabajadorId: string; nif: string; ano: number; mes: number; mesLabel: string; importe: number | null }[] = []
  let id = 1
  const monthsToAdd = [1, 3, 5, 6, 8, 9]
  for (const w of workers.slice(0, 10)) {
    for (const ano of [2023, 2024]) {
      for (const mes of monthsToAdd) {
        if (ano === 2024 && mes > 9) continue
        const tipo = mes % 4 === 0 ? "Contrato" : mes % 5 === 0 ? "Finiquito" : "Nómina"
        rows.push({
          id: String(id++),
          tipo,
          tipoValue: TIPO_TO_VALUE[tipo] ?? "nomina",
          trabajador: w.nombre,
          trabajadorId: w.id,
          nif: w.nif,
          ano,
          mes,
          mesLabel: MONTHS[mes - 1],
          importe: tipo === "Nómina" ? 1600 + (id % 600) : tipo === "Finiquito" ? 3200 : null,
        })
      }
    }
  }
  return rows
}

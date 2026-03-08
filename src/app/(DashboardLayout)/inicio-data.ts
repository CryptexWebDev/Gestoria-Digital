// Demo data for Inicio dashboard (no logic)

export const companyDemo = {
  denominacion: "Ejemplo S.L.",
  tipo: "Persona Jurídica",
  nif: "B12345678",
  direccion: "Calle Mayor 1, 28001 Madrid, España",
  telefono: "+34 912 345 678",
  email: "contacto@ejemplo.es",
}

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

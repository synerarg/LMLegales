import { z } from "zod"

export const BrandFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  type: z
    .string()
    .min(2, { message: "El tipo debe tener al menos 2 caracteres" }),
  quantity: z
    .number()
    .int()
    .min(1, { message: "Debe seleccionar al menos una clase" }),
  classes: z.array(z.number().int().min(1).max(45)).optional(),
})

export const PaidmentFormSchema = z.object({
  client: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  enterprisePhone: z.string(),
  registration: z
    .string()
    .regex(
      /^([0-9]{2}-[0-9]{8}-[0-9]{1}|[0-9]{11}|[0-9]{2}-[0-9]{8}-[0-9]{1})$/,
      { message: "Ingrese un CUIT, CIF o NIF válido" }
    ),
  rent: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  locality: z.string().optional(),
  webiste: z.string().optional(),
  instutionalEmail: z.string().optional(),
  enterpriseName: z.string().optional(),
})

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email(),
  message: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
  subject: z
    .string()
    .min(2, { message: "El asunto debe tener al menos 2 caracteres" }),
})

export const NewsletterSchema = z.object({
  email: z.string().email(),
})

// Consulta de disponibilidad de marca (/consulta-disponibilidad). Las opciones viajan como claves
// fijas y el mail las traduce a texto, asi nadie puede mandar respuestas inventadas.
export const AvailabilitySchema = z.object({
  brand: z.string().trim().min(1).max(120),
  offer: z.enum(["products", "services", "both"]),
  description: z.string().trim().min(2).max(2000),
  stage: z.enum(["check", "register"]),
  holder: z.enum(["individual", "company"]),
  countries: z.array(z.enum(["argentina", "abroad"])).min(1),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+\d{1,4} [\d\s-]{6,20}$/),
  locale: z.string().optional(),
  // Trampa para bots: campo invisible que una persona nunca completa. No se rechaza aca porque el
  // autocompletado del navegador a veces lo llena; la ruta decide que hacer (ver api/availability).
  website: z.string().max(500).optional(),
})

export type AvailabilityValues = z.infer<typeof AvailabilitySchema>

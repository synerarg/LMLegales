import { Resend } from "resend"
import { NextResponse } from "next/server"
import { AvailabilitySchema } from "@/lib/validations/Forms"
import { AvailabilityEmailTemplate } from "@/components/availability-email-template"

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: "No data provided" }, { status: 400 })
  }

  const parsed = AvailabilitySchema.safeParse(body)
  if (!parsed.success) {
    // Solo los nombres de los campos que fallaron, sin los datos de la persona.
    console.error(
      "availability: validacion fallida",
      parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
    )
    return NextResponse.json(
      { message: "Datos incompletos o invalidos" },
      { status: 400 }
    )
  }

  const data = parsed.data

  // Campo trampa completo: puede ser un bot o el autocompletado del navegador. Para no perder una
  // consulta real se envia igual, marcada en el asunto.
  const suspicious = !!data.website

  try {
    const resend = new Resend(process.env.RESEND_API_KEY as string)

    const { data: emailData, error } = await resend.emails.send({
      from: "LMLegales <contacto@lmlegales.com.ar>",
      to: [
        "info@lmlegales.com.ar",
        "ip@lmlegales.com.ar",
        "go@lmlegales.com.ar",
      ],
      // Responder el mail le escribe directo a quien hizo la consulta.
      replyTo: data.email,
      subject: `${suspicious ? "[Posible spam] " : ""}Consulta de disponibilidad: ${data.brand}`,
      react: AvailabilityEmailTemplate(data),
    })

    if (error) {
      console.error(error)
      return NextResponse.json(
        { message: "Error al enviar el email" },
        { status: 500 }
      )
    }

    console.log(emailData)
    return NextResponse.json({ message: "ok" }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error al enviar el email" },
      { status: 500 }
    )
  }
}

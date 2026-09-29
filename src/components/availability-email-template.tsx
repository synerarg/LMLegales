import type { AvailabilityValues } from "@/lib/validations/Forms"
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

const baseUrl = "https://lmlegales.com.ar"

// El mail al estudio siempre va en castellano, sin importar el idioma en que se completo el formulario.
const labels = {
  offer: { products: "Productos", services: "Servicios", both: "Ambos" },
  stage: {
    check: "Solo quiere saber si la marca está disponible",
    register: "Quiere registrar la marca",
  },
  holder: { individual: "Persona física", company: "Persona jurídica" },
  countries: { argentina: "Argentina", abroad: "Argentina y exterior" },
}

export const AvailabilityEmailTemplate = (data: AvailabilityValues) => {
  const rows: [string, string][] = [
    ["Marca", data.brand],
    ["Qué ofrece", labels.offer[data.offer]],
    ["Productos o servicios", data.description],
    ["Etapa", labels.stage[data.stage]],
    ["Tipo de titular", labels.holder[data.holder]],
    ["Países", data.countries.map((c) => labels.countries[c]).join(", ")],
    ["Nombre y apellido", data.name],
    ["Mail", data.email],
    ["WhatsApp", data.whatsapp],
  ]

  return (
    <Html>
      <Head />
      <Preview>{`Consulta de disponibilidad: ${data.brand}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={114} src={`${baseUrl}/logo.png`} alt="logo" />
          </Section>
          <Section style={content}>
            <Text style={heading}>Nueva consulta de disponibilidad de marca</Text>
            <Text style={muted}>
              Enviada desde lmlegales.com.ar
              {data.locale && data.locale !== "es" ? ` (sitio en ${data.locale})` : ""}.
              Respondé este mail para escribirle directo a {data.name}.
            </Text>
            <Hr style={hr} />
            {rows.map(([label, value]) => (
              <Section key={label} style={row}>
                <Text style={rowLabel}>{label}</Text>
                <Text style={rowValue}>{value}</Text>
              </Section>
            ))}
          </Section>
        </Container>
        <Section style={footer}>
          <Text style={{ textAlign: "center", color: "#706a7b", fontSize: 12 }}>
            © {new Date().getFullYear()} LMLegales, Todos los derechos reservados
          </Text>
        </Section>
      </Body>
    </Html>
  )
}

export default AvailabilityEmailTemplate

const fontFamily = "Poppins,sans-serif"

const main = { backgroundColor: "#efeef1", fontFamily }

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
}

const logo = { padding: 30, textAlign: "center" as const }

const content = { padding: "0 28px 20px 28px" }

const heading = { fontSize: 18, fontWeight: 600, margin: "0 0 6px 0" }

const muted = { fontSize: 13, color: "#706a7b", margin: 0, lineHeight: 1.5 }

const hr = { borderColor: "#eeeeee", margin: "18px 0" }

const row = { marginBottom: 10 }

const rowLabel = {
  fontSize: 12,
  color: "#706a7b",
  margin: 0,
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
}

const rowValue = {
  fontSize: 15,
  margin: "2px 0 0 0",
  lineHeight: 1.5,
  whiteSpace: "pre-wrap" as const,
}

const footer = { maxWidth: "580px", margin: "0 auto" }

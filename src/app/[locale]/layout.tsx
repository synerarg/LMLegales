import clsx from "clsx"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Footer from "@/components/sections/Footer"
import { TagManagerProvider } from "@/context/TagManager"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import FacebookPixel from "@/components/facebook-pixel/facebook-pixel"
import Chat from "@/components/sections/chatbot/Chatbot"
import FloatingButton from "@/components/sections/FloatingButton"

const poppins = localFont({
  variable: "--font-poppins",
  src: [
    {
      path: "./fonts/Poppins-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
})

const meshedDisplay = localFont({
  variable: "--font-meshedDisplay",
  src: [
    {
      path: "./fonts/MeshedDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/MeshedDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/MeshedDisplay-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
})

const dmSerif = localFont({
  variable: "--font-dmSerif",
  src: [
    {
      path: "./fonts/DMSerifDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
})

// Color de marca para la UI del navegador. Metadata no puede leer CSS, por eso es el
// unico valor hex fuera de globals.css (ver docs/color-system.md).
export const viewport: Viewport = {
  themeColor: "#f0e9d9",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title:
      locale === "es"
        ? "Litvin Marzorati Legales | Estudio especializado en PI | Registro de Marcas y Patentes"
        : "Litvin Marzorati Legales | IP law firm in Argentina | Trademark & Patent",
    description:
      locale === "es"
        ? "LMLegales es un estudio jurídico líder en propiedad intelectual, asesoría legal para emprendedores, startups y proyectos innovadores. Ofrecemos servicios legales expertos en marcas, patentes, derechos de autor, metaverso, inteligencia artificial, derecho de internet y consultoría empresarial. Protege tus ideas, marcas y activos digitales con nuestras soluciones legales innovadoras y personalizadas."
        : "LMLegales is a leading law firm specializing in intellectual property, legal advice for entrepreneurs, startups, and innovative projects. We offer expert legal services in trademarks, patents, copyright, metaverse, artificial intelligence, internet law, and business consulting. Protect your ideas, brands, and digital assets with our innovative and personalized legal solutions.",
    keywords:
      locale === "es"
        ? [
            "propiedad intelectual",
            "asesoría legal",
            "estudio jurídico",
            "marcas",
            "patentes",
            "derechos de autor",
            "derecho empresarial",
            "emprendedores",
            "startups",
            "innovación",
            "metaverso",
            "inteligencia artificial",
            "derecho de internet",
            "derecho digital",
            "protección de marcas",
            "consultoría legal",
            "Argentina",
            "Latinoamérica",
            "LMLegales",
            "Litvin Marzorati Legales",
          ]
        : [
            "intellectual property",
            "legal advice",
            "law firm",
            "trademarks",
            "patents",
            "copyright",
            "business law",
            "entrepreneurs",
            "startups",
            "innovation",
            "metaverse",
            "artificial intelligence",
            "internet law",
            "digital law",
            "brand protection",
            "legal consulting",
            "Argentina",
            "Latin America",
            "LMLegales",
            "Litvin Marzorati Legales",
          ],
    other: {
      "facebook-domain-verification": "fgq8xipe10elrapblrnyhtyevriw09",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body
        className={clsx(
          poppins.variable,
          meshedDisplay.variable,
          dmSerif.variable,
          "bg-surface-page",
          "font-poppins"
        )}
      >
        <FacebookPixel />

        <NextIntlClientProvider messages={messages}>
          <TagManagerProvider>
            <main className="flex flex-col overflow-hidden">
              {children}
              <Chat />
              <Footer />
              <FloatingButton phoneNumber="5491163606526" />
            </main>
          </TagManagerProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

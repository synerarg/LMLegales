// Capturas de pantalla de todas las rutas del sitio, desktop y mobile.
// Uso: node scripts/screenshots.mjs --base http://localhost:3000 --out .screenshots --label before
import { chromium } from "@playwright/test"
import { mkdirSync } from "fs"
import { join } from "path"

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

const BASE = arg("base", "http://localhost:3000")
const OUT = join(arg("out", ".screenshots"), arg("label", "shots"))
mkdirSync(OUT, { recursive: true })

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
}

const services = [
  "asesoramiento-general",
  "emprendedores",
  "internet",
  "metaverso-e-ia",
  "propiedad-intelectual",
]

const PAGES = [
  ...["es", "en"].flatMap((l) => [
    { slug: `${l}-home`, path: `/${l}` },
    { slug: `${l}-about`, path: `/${l}/about` },
    { slug: `${l}-contacto`, path: `/${l}/contacto` },
    { slug: `${l}-brand-register`, path: `/${l}/brand-register` },
    ...services.map((s) => ({ slug: `${l}-servicios-${s}`, path: `/${l}/servicios/${s}` })),
  ]),
  { slug: "es-politica-privacidad", path: "/es/politica-privacidad" },
  { slug: "es-descargo", path: "/es/descargo-de-responsabilidad" },
  { slug: "es-condiciones", path: "/es/condiciones-de-uso" },
  { slug: "en-privacy-policy", path: "/en/privacy-policy" },
  { slug: "en-disclaimer", path: "/en/disclaimer" },
  { slug: "en-terms-of-use", path: "/en/terms-of-use" },
  {
    slug: "es-payment",
    path: "/es/payment?name=Prueba&email=prueba%40lmlegales.com.ar&registration=20-12345678-9&enterprisePhone=1140000000&price=150000",
  },
  { slug: "es-payment-success", path: "/es/payment/success" },
  { slug: "es-payment-failure", path: "/es/payment/failure" },
  { slug: "es-payment-pending", path: "/es/payment/pending" },
]

// Estados interactivos que se capturan solo en el viewport (no full page).
const STATES = [
  {
    slug: "es-home-chatbot-open",
    path: "/es",
    viewport: "desktop",
    action: async (page) => {
      await page.locator("div.fixed.bottom-6.right-6 button").first().click()
      await page.waitForTimeout(900)
    },
  },
  {
    slug: "es-home-mobile-menu-open",
    path: "/es",
    viewport: "mobile",
    action: async (page) => {
      await page.locator("div.fixed.top-0 button").first().click()
      await page.waitForTimeout(600)
    },
  },
  {
    slug: "es-home-nav-scrolled",
    path: "/es",
    viewport: "desktop",
    action: async (page) => {
      await page.mouse.wheel(0, 700)
      await page.waitForTimeout(500)
    },
  },
]

// Congela animaciones CSS para que las capturas antes/después sean comparables.
const FREEZE_CSS = `
  *, *::before, *::after {
    animation-play-state: paused !important;
    transition-duration: 0s !important;
    caret-color: transparent !important;
  }
`

const browser = await chromium.launch()
const failures = []

for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 })
  const page = await context.newPage()
  page.setDefaultNavigationTimeout(180_000)

  for (const p of PAGES) {
    const file = join(OUT, `${p.slug}--${vpName}.png`)
    try {
      await page.goto(BASE + p.path, { waitUntil: "load" })
      await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {})
      await page.addStyleTag({ content: FREEZE_CSS })
      await page.waitForTimeout(800)
      await page.screenshot({ path: file, fullPage: true })
      console.log("ok  ", file)
    } catch (e) {
      failures.push({ path: p.path, vpName, error: String(e).split("\n")[0] })
      console.log("FAIL", p.path, vpName, String(e).split("\n")[0])
    }
  }

  for (const s of STATES.filter((s) => s.viewport === vpName)) {
    const file = join(OUT, `${s.slug}--${vpName}.png`)
    try {
      await page.goto(BASE + s.path, { waitUntil: "load" })
      await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {})
      await page.waitForTimeout(500)
      await s.action(page)
      await page.addStyleTag({ content: FREEZE_CSS })
      await page.waitForTimeout(300)
      await page.screenshot({ path: file, fullPage: false })
      console.log("ok  ", file)
    } catch (e) {
      failures.push({ path: s.slug, vpName, error: String(e).split("\n")[0] })
      console.log("FAIL", s.slug, vpName, String(e).split("\n")[0])
    }
  }

  await context.close()
}

await browser.close()
console.log(`\nListo. Fallas: ${failures.length}`)
if (failures.length) console.table(failures)

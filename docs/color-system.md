# Sistema de color — LM Legales (paleta 2026)

Fuente de verdad: [`src/app/[locale]/globals.css`](../src/app/%5Blocale%5D/globals.css). Ningún otro archivo del sitio declara un color, con dos excepciones justificadas al final de este documento.

Reportes de verificación: [`contrast-report.md`](./contrast-report.md) (cada par texto/fondo real) y [`keyboard-report.md`](./keyboard-report.md) (recorrido de teclado con foco visible).

## 1. Arquitectura: dos capas

| Capa | Dónde vive | Quién la usa | Ejemplo |
|---|---|---|---|
| **Primitivos** `--lm-*` | `:root` dentro de `@layer base`, **fuera** de `@theme` | Solo la capa semántica | `--lm-espresso: #5b483a` |
| **Semánticos** `--color-*` | `@theme static` | Los componentes, vía utilidades de Tailwind | `bg-surface-page`, `text-fg-secondary`, `border-border-control` |

Tres guardarraíles hacen que la separación se cumpla sola:

1. **Los primitivos no generan utilidades.** Al estar fuera de `@theme`, no existe `bg-lm-camel` ni nada parecido. Un componente no puede usar un primitivo por accidente.
2. **La paleta default de Tailwind está borrada** (`--color-*: initial`). `text-gray-500`, `bg-orange-400`, `text-black`, `bg-white` ya no generan CSS. Si alguien los escribe, no pasa nada visible y el grep de verificación lo detecta.
3. **`@theme static`** emite todos los tokens semánticos en `:root` aunque no se usen, así están disponibles para CSS de terceros (react-toastify) y para scripts.

Regla de uso: un componente **solo** usa clases `bg-`, `text-`, `border-`, `ring-`, `outline-`, `fill-`, `accent-` con nombres de la capa semántica. Nunca un hex, nunca `rgb()`, nunca `--lm-*`.

## 2. Capa 1: primitivos

| Token | Hex | Nombre | Luminancia | Uso permitido |
|---|---|---|---|---|
| `--lm-ink` | `#000000` | Negro tinta | 0.000 | Texto principal, banda inversa, foco. Negro puro, nunca "casi negro". |
| `--lm-espresso` | `#5b483a` | Café oscuro | 0.072 | Texto secundario, acción primaria, banda de marca, bordes fuertes |
| `--lm-leather` | `#7b5942` | Cuero | 0.117 | Texto atenuado (mínimo permitido), bordes de control, hover de acción |
| `--lm-stone` | `#a6a094` | Gris cálido | 0.354 | Solo sobre negro: texto muted, placeholder y bordes del footer. **Nunca texto sobre claro.** |
| `--lm-camel` | `#b59d7e` | Camel | 0.355 | Solo decorativo: thumb del scrollbar. **Nunca texto. Nunca junto a stone** (1.00:1). |
| `--lm-sand` | `#cabea6` | Arena | 0.521 | Superficie de descanso, hairlines, disabled, selección, hover ghost |
| `--lm-cream` | `#f0e9d9` | Crema | 0.819 | Fondo de página, texto sobre oscuro, botón invertido |
| `--lm-white` | `#ffffff` | Blanco | 1.000 | Superficies elevadas (cards, inputs, dropdowns) |

Colores funcionales, fuera de la paleta pero obligatorios. Elegidos por calidez y validados sobre crema:

| Token | Hex | Sobre crema | Sobre blanco |
|---|---|---|---|
| `--lm-danger` | `#9a2e1f` | 6.24:1 | 7.62:1 |
| `--lm-danger-hover` | `#86190a` | derivado en OKLCH (L −0.06) | |
| `--lm-success` | `#3f5d3a` | 6.12:1 | 7.47:1 |
| `--lm-warning` | `#6b4e12` | 6.37:1 | 7.79:1 |

Marca de terceros preservada por decisión del cliente:

| Token | Hex | Nota |
|---|---|---|
| `--lm-whatsapp` | `#25d366` | Verde oficial de WhatsApp |
| `--lm-whatsapp-hover` | `#00b94d` | OKLCH L −0.08 |
| `--lm-whatsapp-active` | `#00a539` | OKLCH L −0.14 |

## 3. Capa 2: tokens semánticos

Todos se consumen como `--color-<nombre>` y, en Tailwind, como `bg-<nombre>`, `text-<nombre>`, `border-<nombre>`, etc.

| Grupo | Token | Primitivo | Uso |
|---|---|---|---|
| Superficies | `surface-page` | cream | Fondo base del sitio |
| | `surface-raised` | white | Cards de about y pago, dropdowns, inputs, items de FAQ |
| | `surface-sunken` | sand | Burbuja del asistente, hover ghost, tiles de icono |
| | `surface-brand` | espresso | Header del chatbot |
| | `surface-inverse` | ink | Footer |
| Texto claro | `fg-primary` | ink | Body, titulares, números |
| | `fg-secondary` | espresso | Subtítulos, labels, links, FAQ cerrado |
| | `fg-muted` | leather | Numeración de labels, timestamps, texto atenuado. Mínimo permitido. |
| | `fg-placeholder` | leather | `::placeholder` sobre claro |
| Texto oscuro | `fg-on-dark` | cream | Texto sobre negro o espresso |
| | `fg-on-dark-2` | sand | Links del footer, cargos del equipo, idioma inactivo del nav sobre foto |
| | `fg-on-dark-muted` | stone | Links legales |
| | `fg-placeholder-on-dark` | stone | `::placeholder` sobre oscuro |
| Bordes | `border-hairline` | sand | Separadores decorativos, borde de cards en reposo |
| | `border-hairline-on-dark` | espresso | Separadores del footer |
| | `border-control` | leather | Inputs, checkbox, radio, cards en hover (≥ 3:1) |
| | `border-control-on-dark` | stone | Input del newsletter |
| | `border-strong` | espresso | Separators de formularios, separador ES/EN |
| Acción primaria | `action-bg` / `action-bg-hover` / `action-bg-active` | espresso / leather / ink | Botón primario en reposo, hover, pressed |
| | `action-fg` | cream | Texto del botón primario |
| Acción ghost | `action-ghost-fg` / `action-ghost-border` | espresso / leather | Botón secundario |
| | `action-ghost-bg-hover` | sand | Hover del ghost |
| Acción invertida | `action-inverse-bg` / `-hover` / `-active` | cream / sand / white | Botón sobre banda negra |
| | `action-inverse-fg` | espresso | Texto del botón invertido |
| Estado | `danger` / `danger-hover` / `success` / `warning` | funcionales | Toasts, iconos de estado de pago, botón destructivo |
| | `disabled-bg` / `disabled-fg` | sand / leather | Controles inactivos |
| Foco | `focus-ring` / `focus-ring-on-dark` | ink / cream | Outline de 2 px con offset de 2 px |
| Overlays | `overlay-scrim` | `rgb(0 0 0 / .55)` | Backdrop del menú mobile, hover sobre foto |
| | `overlay-modal` | `rgb(0 0 0 / .8)` | Fondo del dialog |
| Selección | `selection-bg` / `selection-fg` | sand / ink | `::selection` |
| Scrollbar | `scrollbar-track` / `-thumb` / `-thumb-hover` | cream / camel / leather | Scrollbar del documento |
| Terceros | `brand-whatsapp` / `-hover` / `-active` / `-fg` | verde WhatsApp / blanco | Los dos botones de WhatsApp |

### Alias para shadcn/ui

Los componentes de `src/components/ui/*` traen nombres propios (`primary`, `muted-foreground`, `border`, `input`, `ring`, …). Antes de esta migración esas variables estaban declaradas fuera de `@theme` y **no generaban CSS**: el botón "volver" de `/payment` era transparente, el checkbox marcado no se rellenaba y no había color de foco. Ahora son alias de la capa semántica:

| shadcn | Semántico |
|---|---|
| `background` / `foreground` | `surface-page` / `fg-primary` |
| `card`, `popover` (+ `-foreground`) | `surface-raised` / `fg-primary` |
| `primary` / `primary-foreground` | `action-bg` / `action-fg` |
| `secondary`, `muted`, `accent` | `surface-sunken` |
| `muted-foreground` | `fg-muted` |
| `destructive` / `destructive-foreground` | `danger` / `fg-on-dark` |
| `border` / `input` / `ring` | `border-hairline` / `border-control` / `focus-ring` |

Los archivos de `ui/*` ya usan los nombres semánticos directamente; los alias quedan como red de seguridad para componentes de shadcn que se agreguen en el futuro.

### Sombras, gradiente y otros valores

- **Sombras** (`--shadow-sm/md/lg`): tintadas con espresso vía `color-mix`, nunca gris neutro. Se borraron `xs`, `xl` y `2xl`. Cuando dudes entre sombra y borde, elegí borde.
- **Gradiente**: hay uno solo, `--gradient-heading-wipe`, el barrido leather → ink del título de contacto. Lo pidió el cliente para conservar la animación existente. Son dos colores planos con una franja de transición, no introduce matices nuevos. Se consume con la utilidad `text-wipe-brand`.
- **Overlays**: los únicos negros translúcidos permitidos son `overlay-scrim` y `overlay-modal`, y solo para legibilidad sobre foto o para modales.

## 4. Matriz de contraste

Sobre crema `#f0e9d9`:

| Color | Ratio | Uso permitido |
|---|---|---|
| ink | 17.36:1 | Texto de cualquier tamaño, AAA |
| espresso | 7.14:1 | Texto de cualquier tamaño, AAA |
| leather | 5.18:1 | Texto ≥ 16 px AA, bordes de control |
| sand | 1.52:1 | Solo hairline decorativo |
| camel / stone | 2.15:1 | Solo decorativo. **Nunca texto** |

Sobre negro: cream 17.36 · sand 11.43 · camel 8.09 · stone 8.08 · leather 3.35 (solo UI) · **espresso 2.43, prohibido**.
Sobre la foto del CTA final (compuesta sobre crema, zona del texto): ink 16.03:1 de media y 13.23:1 en el peor 5 %; el botón espresso 5.42:1 contra la foto en el peor caso.
Sobre espresso: white 8.63 · cream 7.14 · sand 4.70 · camel y stone 3.32 (solo UI).
Sobre blanco: espresso 8.63 · leather 6.27 · camel y stone 2.60 (nunca texto).

Pisos: 4.5:1 texto normal, 3:1 texto ≥ 24 px o ≥ 19 px bold, 3:1 componentes de interfaz. La tabla completa con los 57 pares reales del sitio está en `contrast-report.md`; ninguno queda por debajo del piso salvo los exentos por norma (controles inactivos, logotipos).

## 5. Reglas de uso

1. **60/30/10 por área.** Crema dominante, blanco y arena como superficies, espresso y negro como acento de peso. Camel y stone son condimento decorativo, menos del 5 % combinado.
2. **La jerarquía se construye por valor, no por matiz.** El botón primario es la mancha más oscura de su zona. Si en una sección hay dos manchas oscuras del mismo peso, hay un error de jerarquía. Por eso hay un solo botón lleno por sección y el resto son ghost.
3. **Ritmo de bandas.** Hoy: hero con foto lavada sobre crema → servicios en crema con grilla espresso → marquee de premios sobre crema → equipo crema (leído como bloque oscuro por las fotos) → medios crema → instagram crema → FAQ con items blancos → CTA final con foto lavada sobre crema → footer negro. El negro aparece una sola vez, en el footer.
4. **Negro puro y blanco puro** como colores plenos. No `#0b0b0b`, no `#fafafa`.
5. **Camel y stone nunca llevan texto encima ni son texto.**
6. **Sin gradientes decorativos.** Los 27 gradientes CTA, los 5 SVG con gradiente propios y los 2 PNG-gradiente fueron reemplazados por colores planos. La única excepción es el barrido del título de contacto.
7. **Estados de cada control:** reposo, hover, active, focus-visible, disabled y loading cuando aplica. Hover y active se derivan con colores de la paleta (espresso → leather → ink), nunca con `opacity`.
8. **Foco:** outline de 2 px + offset 2 px en todo elemento focalizable, definido globalmente en `globals.css`. Ink sobre claro, cream dentro de `.bg-surface-inverse` y `.bg-surface-brand`. Los botones flotantes suman un ring cream para ser visibles sobre cualquier fondo. Nunca `outline-hidden` sin reemplazo; la única excepción es el input del chatbot, cuyo contenedor muestra el foco con `focus-within`.
9. **Disabled:** `disabled-bg` + `disabled-fg` + `cursor: not-allowed`. Único caso donde se admite bajar de 4.5:1.
10. **Formularios:** `::selection`, `::placeholder`, autofill de Chrome (sobre claro y sobre oscuro) y scrollbar están cubiertos globalmente. Los toasts de react-toastify toman los colores funcionales vía sus variables `--toastify-*`, redefinidas en `.Toastify`.
11. **Movimiento:** toda transición de color nueva usa `motion-safe:` y respeta `prefers-reduced-motion`.
12. **Estado nunca solo por color:** los toasts y las páginas de pago combinan color, icono y texto.

### Cómo agregar o cambiar un color

1. Si el rol ya existe, usá el token semántico. No agregues nada.
2. Si el rol es nuevo, agregá `--color-<rol>: var(--lm-<primitivo>)` en `@theme static`. Documentalo en este archivo y verificá el par en `contrast-report.md`.
3. Nunca agregues un primitivo nuevo sin decisión de diseño: la paleta son estos 8 colores más los 3 funcionales.

## 6. Decisiones tomadas con el cliente

| Tema | Decisión | Estado |
|---|---|---|
| WhatsApp | Se mantiene el verde oficial `#25d366` en el flotante y en el botón de contacto, tokenizado como `brand-whatsapp`. El glifo blanco sobre verde (1.98:1) es un logotipo, exento por WCAG. Alternativa descartada: monocromo espresso. | Hecho |
| Logos de premios | El cliente entregó los 9 logos regenerados en ink y espresso con fondo transparente. Van a color pleno directamente sobre el crema de la pagina, sin banda ni filtros; el componente los limita a 80 px de alto y 160 px de ancho para aceptar assets a 2x. Se mapearon por identidad para conservar el orden del marquee. | Hecho |
| Fondo del hero | El cliente entregó `heroBg.png` re-teñido al crema nuevo. Hero claro, titular ink. | Hecho |
| CTA final | El cliente entregó la foto de la firma lavada en crema y pidió recuperarla. La sección vuelve a ser clara: fondo `surface-page` con la foto encima (se desvanece hacia abajo), titular `fg-primary` y botón primario espresso. El titular mide 16.03:1 de media y 13.23:1 en el peor 5 % de la zona del texto. | Hecho |
| Sección Medios | Se eliminó `mediaBg.png`, gradiente decorativo. | Hecho |
| Título de contacto | Se conserva la animación `moveBg` con un barrido leather → ink en CSS. Se eliminaron `plainAccent.png` y `plainAccentBig.png`. | Hecho |
| Nombres sobre foto (Equipo) | Nombres cream y cargos sand con respaldo ink al 70 %. Garantiza 4.5:1 aun sobre una foto blanca. | Hecho |
| Logo | Logo nuevo del cliente (monograma LM + wordmark en Sherborne). El wordmark venia como texto vivo; se convirtio a trazados con la fuente activada por Adobe Fonts, respetando posiciones y variacion (wght 250, opsz 12). Dos SVG: `logo.svg` en ink para el header sobre crema y `logo-cream.svg` para el footer y el nav sobre foto. Sin filtros de inversion. `logo.png` (emails) regenerado desde el SVG ink. | Hecho |
| Flechas de servicios y carrusel | Siguen como `<Image>` con SVG negro. El hover del carrusel invierte el glifo con `filter` sobre espresso. | Hecho |
| Iconos de /about y LinkedIn del equipo | Se conservan tal cual: los 5 SVG con gradiente naranja y el azul de LinkedIn. Son los únicos restos de la paleta anterior en el sitio. | Por decisión del cliente |
| Tokens shadcn | Alias a la capa semántica. | Hecho |
| Bloque `.dark` | Se conserva sin cambios, inactivo y comentado, junto con la variante `dark`. Las dos clases `dark:` existentes apuntan a los tokens nuevos. | Por decisión del cliente |
| Templates de email | `billing-email-template`, `new-email-template` y `newsletter-template` siguen con hex literales del naranja viejo. Son HTML de correo, no consumen CSS del sitio. | Diferido |
| Assets huérfanos | Se borraron solo los que quedaron sin uso por la migración. `finalCTA2.png`, `accentHighliter.png`, `next.svg`, `vercel.svg` y las banderas ya estaban huérfanos y no se tocaron. | Hecho |
| Jerarquía del hero | "Reservá una reunión" primario, "Registrá tu marca" ghost. | Hecho |
| Cards de servicios | El cliente pidió que no fueran blancas. Fondo transparente sobre el crema de la página, grilla en `border-strong` (espresso, el equivalente de las líneas negras del diseño original), sin sombra. Hover: subrayado de "Aprende más". | Hecho |
| Nav "Contacto" | Primero fue ghost segun el brief; el 2026-09-08 el cliente pidio que sea siempre lleno. Sobre crema: `action-bg` con texto `action-fg`. Sobre las fotos de servicios: relleno invertido (`action-inverse-*`, crema con texto espresso) para que no se funda con la foto oscura. Convive con el primario del hero en el primer viewport por decision del cliente. | Hecho |
| FAQ abierto | Item en `surface-raised` con borde `border-control` y pregunta en `fg-primary`. | Hecho |
| Burbuja del asistente | Arena con texto ink. | Hecho |

## 7. Excepciones al "cero literales fuera de globals.css"

1. `src/app/[locale]/layout.tsx`: `viewport.themeColor = "#f0e9d9"`. La metadata de Next no puede leer CSS. Es el crema de la paleta y hay que actualizarlo a mano si cambia `--lm-cream`.
2. Los tres templates de email (diferidos, ver arriba).
3. Assets: `icons/about/*.svg`, `icons/about/linkedin.svg` y `socials/whatsapp.svg` conservan sus colores por decisión del cliente. `heroBg.png`, `finalCTA.png`, los 9 PNG de premios y los 5 fondos de los heroes de servicios (`generalBg`, `emprendedoresBg`, `internetBg`, `metaversoBg`, `propInelectualBg`) fueron regenerados por el cliente en la paleta nueva. Los de servicios conservan la misma luminosidad que los originales en la zona del titulo, asi que el texto crema mantiene su contraste: entre 4.2:1 y 13.3:1 de media segun la pagina, con el de asesoramiento general como el mas claro.

## 8. Pendientes y zonas ambiguas para decidir

- **Bandas plenas en Equipo y Medios.** El brief pedía alternar crema → arena. Ambas secciones tienen el fondo acotado por márgenes y padding horizontal, así que una banda plena requiere mover spacing, que quedó fuera del alcance. Hoy el ritmo lo da el bloque de fotos del equipo y las cards blancas.
- **Overlay de hover en la grilla de Instagram.** Requiere un elemento de overlay por tile. No se agregó estructura.
- **Link activo en el nav.** El brief pedía subrayado en la sección activa. Requiere lógica de pathname. No se agregó.
- **LinkedIn del equipo.** El icono está fuera del área visible hasta el hover, así que un usuario de teclado lo focaliza sin verlo. Es un problema preexistente de interacción, no de color. En `keyboard-report.md` estos 7 links figuran con ring 1.00:1: es un falso positivo del medidor, que compara el outline crema contra el fondo crema del body porque la foto no es un color de fondo. El outline real cae sobre el retrato.
- **Iframes de Google Maps.** Reciben foco por Tab pero Chromium no les aplica `:focus`, `:focus-visible` ni `:focus-within` al elemento `iframe` cuando el foco entra al documento embebido (verificado con `focus()` programático). La regla `iframe:focus` queda en `globals.css` para los navegadores que sí la aplican. Los controles internos del mapa tienen su propio indicador de foco.
- **Newsletter del footer.** Dispara toasts pero no hay `ToastContainer` en el layout, así que nunca se muestran. Preexistente.

## 9. Cómo verificar

```bash
# literales de color fuera del archivo de tokens (debe listar solo layout.tsx y los emails)
grep -rnE "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(" src --include=*.tsx --include=*.ts --include=*.css | grep -v globals.css
```

```bash
# primitivos usados desde componentes (debe estar vacio)
grep -rn -e "--lm-" src --include=*.tsx --include=*.ts | grep -v globals.css
```

```bash
# capturas de todas las rutas, desktop y mobile, con el dev server corriendo
node scripts/screenshots.mjs --base http://localhost:3000 --out .screenshots --label after
```

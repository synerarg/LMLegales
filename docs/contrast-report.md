# Reporte de contraste — paleta 2026

Calculado con la formula de luminancia relativa sRGB de WCAG 2.2. Pisos aplicados: **4.5:1** texto normal, **3:1** texto >= 24px / 19px bold y componentes de interfaz (1.4.11). Los pares marcados como *exentos* son controles inactivos o logotipos, exentos por la norma y documentados en `docs/color-system.md`.

**Resultado: 58 pares evaluados · 0 por debajo del piso.**

## Texto

| Uso | Frente | Fondo | Ratio | Piso | Veredicto |
|---|---|---|---|---|---|
| Body, titulares, FAQ abierto, numeros del hero: fg-primary sobre surface-page | `#000000` | `#f0e9d9` | 17.36:1 | 4.5 | ✅ AAA |
| Subtitulos, labels de metricas, FAQ cerrado, links: fg-secondary sobre surface-page | `#5b483a` | `#f0e9d9` | 7.14:1 | 4.5 | ✅ AAA |
| Numeracion 01-04, timestamps, texto atenuado: fg-muted sobre surface-page | `#7b5942` | `#f0e9d9` | 5.18:1 | 4.5 | ✅ AA |
| Titulos en cards, FAQ items, cards de pago: fg-primary sobre surface-raised | `#000000` | `#ffffff` | 21.00:1 | 4.5 | ✅ AAA |
| Aprende mas, FAQ trigger cerrado, respuesta FAQ: fg-secondary sobre surface-raised | `#5b483a` | `#ffffff` | 8.63:1 | 4.5 | ✅ AAA |
| Labels de pago, descripciones: fg-muted sobre surface-raised | `#7b5942` | `#ffffff` | 6.27:1 | 4.5 | ✅ AA |
| Placeholder: fg-placeholder sobre surface-raised | `#7b5942` | `#ffffff` | 6.27:1 | 4.5 | ✅ AA |
| Burbuja del asistente: fg-primary sobre surface-sunken | `#000000` | `#cabea6` | 11.43:1 | 4.5 | ✅ AAA |
| Titulo de contacto (42px) fase clara del barrido: leather sobre surface-page | `#7b5942` | `#f0e9d9` | 5.18:1 | 3.0 | ✅ AA |

## Texto oscuro

| Uso | Frente | Fondo | Ratio | Piso | Veredicto |
|---|---|---|---|---|---|
| Footer, heroes de servicio: fg-on-dark sobre surface-inverse | `#f0e9d9` | `#000000` | 17.36:1 | 4.5 | ✅ AAA |

## Texto

| Uso | Frente | Fondo | Ratio | Piso | Veredicto |
|---|---|---|---|---|---|
| Titular del CTA final (42px) sobre la foto lavada: fg-primary, percentil 5 de luminancia en la zona del texto | `#000000` | `#cccccc` | 13.08:1 | 3.0 | ✅ AAA · medido sobre public/assets/finalCTA.png compuesto sobre crema; media 16.03:1 |

## Texto oscuro

| Uso | Frente | Fondo | Ratio | Piso | Veredicto |
|---|---|---|---|---|---|
| Links del footer: fg-on-dark-2 sobre surface-inverse | `#cabea6` | `#000000` | 11.43:1 | 4.5 | ✅ AAA |
| Links legales: fg-on-dark-muted sobre surface-inverse | `#a6a094` | `#000000` | 8.08:1 | 4.5 | ✅ AAA |
| Placeholder newsletter: fg-placeholder-on-dark sobre surface-inverse | `#a6a094` | `#000000` | 8.08:1 | 4.5 | ✅ AAA |
| Header del chatbot: fg-on-dark sobre surface-brand | `#f0e9d9` | `#5b483a` | 7.14:1 | 4.5 | ✅ AAA |
| En linea del chatbot (14px): fg-on-dark-2 sobre surface-brand | `#cabea6` | `#5b483a` | 4.70:1 | 4.5 | ✅ AA |
| Nombres del equipo: fg-on-dark sobre respaldo ink/70 en el peor caso (foto blanca) | `#f0e9d9` | `#4d4d4d` | 6.99:1 | 4.5 | ✅ AA · el respaldo garantiza el piso aun sobre una foto clara |
| Cargos del equipo: fg-on-dark-2 sobre respaldo ink/70 en el peor caso | `#cabea6` | `#4d4d4d` | 4.60:1 | 4.5 | ✅ AA |

## Acciones

| Uso | Frente | Fondo | Ratio | Piso | Veredicto |
|---|---|---|---|---|---|
| Boton primario: action-fg sobre action-bg | `#f0e9d9` | `#5b483a` | 7.14:1 | 4.5 | ✅ AAA |
| Boton primario hover: action-fg sobre action-bg-hover | `#f0e9d9` | `#7b5942` | 5.18:1 | 4.5 | ✅ AA |
| Boton primario active: action-fg sobre action-bg-active | `#f0e9d9` | `#000000` | 17.36:1 | 4.5 | ✅ AAA |
| Boton primario vs pagina (limite del componente): action-bg sobre surface-page | `#5b483a` | `#f0e9d9` | 7.14:1 | 3.0 | ✅ AAA |
| Ghost: action-ghost-fg sobre surface-page | `#5b483a` | `#f0e9d9` | 7.14:1 | 4.5 | ✅ AAA |
| Ghost hover: action-ghost-fg sobre action-ghost-bg-hover | `#5b483a` | `#cabea6` | 4.70:1 | 4.5 | ✅ AA |
| Ghost borde: action-ghost-border sobre surface-page | `#7b5942` | `#f0e9d9` | 5.18:1 | 3.0 | ✅ AA |
| Ghost sobre foto oscura (nav de servicios): cream sobre surface-inverse (peor caso aproximado) | `#f0e9d9` | `#000000` | 17.36:1 | 4.5 | ✅ AAA |
| Boton invertido (newsletter del footer): action-inverse-fg sobre action-inverse-bg | `#5b483a` | `#f0e9d9` | 7.14:1 | 4.5 | ✅ AAA |
| Boton invertido hover: action-inverse-fg sobre action-inverse-bg-hover | `#5b483a` | `#cabea6` | 4.70:1 | 4.5 | ✅ AA |
| Boton invertido active: action-inverse-fg sobre action-inverse-bg-active | `#5b483a` | `#ffffff` | 8.63:1 | 4.5 | ✅ AAA |
| Boton invertido vs banda: action-inverse-bg sobre surface-inverse | `#f0e9d9` | `#000000` | 17.36:1 | 3.0 | ✅ AAA |
| Disabled: disabled-fg sobre disabled-bg | `#7b5942` | `#cabea6` | 3.41:1 | exento | n/a · controles inactivos: exentos por WCAG 1.4.3 y 1.4.11 |
| Boton destructivo: fg-on-dark sobre danger | `#f0e9d9` | `#9a2e1f` | 6.24:1 | 4.5 | ✅ AA |
| Boton destructivo hover: fg-on-dark sobre danger-hover | `#f0e9d9` | `#86190a` | 8.05:1 | 4.5 | ✅ AAA |

## Controles

| Uso | Frente | Fondo | Ratio | Piso | Veredicto |
|---|---|---|---|---|---|
| Borde de inputs, checkbox, radio: border-control sobre surface-page | `#7b5942` | `#f0e9d9` | 5.18:1 | 3.0 | ✅ AA |
| Borde de inputs dentro de cards: border-control sobre surface-raised | `#7b5942` | `#ffffff` | 6.27:1 | 3.0 | ✅ AA |
| Borde input newsletter: border-control-on-dark sobre surface-inverse | `#a6a094` | `#000000` | 8.08:1 | 3.0 | ✅ AAA |
| Checkbox marcado: action-bg sobre surface-raised | `#5b483a` | `#ffffff` | 8.63:1 | 3.0 | ✅ AAA |
| Tilde del checkbox: action-fg sobre action-bg | `#f0e9d9` | `#5b483a` | 7.14:1 | 3.0 | ✅ AAA |
| Flecha del carrusel activa: glifo ink sobre surface-raised | `#000000` | `#ffffff` | 21.00:1 | 3.0 | ✅ AAA |
| Flecha del carrusel hover: glifo invertido (blanco) sobre action-bg | `#ffffff` | `#5b483a` | 8.63:1 | 3.0 | ✅ AAA |
| Flecha del carrusel inactiva: glifo ink al 40% sobre surface-raised | `#999999` | `#ffffff` | 2.85:1 | exento | n/a · control inactivo |
| Chevron del acordeon: fg-secondary sobre surface-raised | `#5b483a` | `#ffffff` | 8.63:1 | 3.0 | ✅ AAA |
| Separador ES/EN y separators de formulario: border-strong sobre surface-page | `#5b483a` | `#f0e9d9` | 7.14:1 | 3.0 | ✅ AAA |
| Foco: focus-ring sobre surface-page | `#000000` | `#f0e9d9` | 17.36:1 | 3.0 | ✅ AAA |
| Foco: focus-ring sobre surface-raised | `#000000` | `#ffffff` | 21.00:1 | 3.0 | ✅ AAA |
| Foco: focus-ring-on-dark sobre surface-inverse | `#f0e9d9` | `#000000` | 17.36:1 | 3.0 | ✅ AAA |
| Foco: focus-ring-on-dark sobre surface-brand | `#f0e9d9` | `#5b483a` | 7.14:1 | 3.0 | ✅ AAA |
| Hairline decorativo: border-hairline sobre surface-page | `#cabea6` | `#f0e9d9` | 1.52:1 | decorativo | n/a · solo decorativo, no comunica estado |
| Hairline decorativo oscuro: border-hairline-on-dark sobre surface-inverse | `#5b483a` | `#000000` | 2.43:1 | decorativo | n/a · solo decorativo |

## Estado

| Uso | Frente | Fondo | Ratio | Piso | Veredicto |
|---|---|---|---|---|---|
| Icono/progreso de exito en toast: success sobre surface-raised | `#3f5d3a` | `#ffffff` | 7.40:1 | 3.0 | ✅ AAA |
| Icono/progreso de error en toast: danger sobre surface-raised | `#9a2e1f` | `#ffffff` | 7.54:1 | 3.0 | ✅ AAA |
| Icono/progreso de alerta en toast: warning sobre surface-raised | `#6b4e12` | `#ffffff` | 7.71:1 | 3.0 | ✅ AAA |
| Iconos de estado de pago sobre surface-raised (peor caso: warning) | `#6b4e12` | `#ffffff` | 7.71:1 | 3.0 | ✅ AAA |
| Colores funcionales como texto sobre surface-page (peor caso: success) | `#3f5d3a` | `#f0e9d9` | 6.12:1 | 4.5 | ✅ AA |
| Colores funcionales como texto sobre surface-raised (peor caso: success) | `#3f5d3a` | `#ffffff` | 7.40:1 | 4.5 | ✅ AAA |

## WhatsApp

| Uso | Frente | Fondo | Ratio | Piso | Veredicto |
|---|---|---|---|---|---|
| Glifo blanco sobre verde oficial | `#ffffff` | `#25d366` | 1.98:1 | exento | n/a · logotipo de terceros: exento por WCAG 1.4.3 (logotypes). Decision del cliente |
| Boton verde vs pagina: brand-whatsapp sobre surface-page | `#25d366` | `#f0e9d9` | 1.64:1 | exento | n/a · el control se identifica por el glifo y la sombra, no por su borde; color de marca preservado por decision del cliente |
| Glifo blanco sobre verde hover | `#ffffff` | `#00b94d` | 2.61:1 | exento | n/a · logotipo |

## Matriz completa de primitivos

| frente \ fondo | cream | white | sand | espresso | ink |
|---|---|---|---|---|---|
| ink `#000000` | 17.36:1 | 21.00:1 | 11.43:1 | 2.43:1 | — |
| espresso `#5b483a` | 7.14:1 | 8.63:1 | 4.70:1 | — | 2.43:1 |
| leather `#7b5942` | 5.18:1 | 6.27:1 | 3.41:1 | 1.38:1 | 3.35:1 |
| stone `#a6a094` | 2.15:1 | 2.60:1 | 1.41:1 | 3.32:1 | 8.08:1 |
| camel `#b59d7e` | 2.15:1 | 2.60:1 | 1.41:1 | 3.32:1 | 8.09:1 |
| sand `#cabea6` | 1.52:1 | 1.84:1 | — | 4.70:1 | 11.43:1 |
| cream `#f0e9d9` | — | 1.21:1 | 1.52:1 | 7.14:1 | 17.36:1 |
| white `#ffffff` | 1.21:1 | — | 1.84:1 | 8.63:1 | 21.00:1 |
| danger `#9a2e1f` | 6.24:1 | 7.54:1 | 4.10:1 | 1.14:1 | 2.78:1 |
| success `#3f5d3a` | 6.12:1 | 7.40:1 | 4.03:1 | 1.17:1 | 2.84:1 |
| warning `#6b4e12` | 6.37:1 | 7.71:1 | 4.20:1 | 1.12:1 | 2.72:1 |

Par isoluminante: stone `#a6a094` vs camel `#b59d7e` = 1.00:1. Prohibido combinarlos. En el sistema actual camel solo aparece como thumb del scrollbar sobre crema y stone solo sobre negro.

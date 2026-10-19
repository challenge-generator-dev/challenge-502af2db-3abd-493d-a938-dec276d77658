# Optimización de Core Web Vitals en el Portal de Banca Digital

El portal de banca en línea de Banco Digitalis tiene una tasa de abandono del 20% debido a tiempos de carga lentos y una mala experiencia de usuario. Actualmente, el tiempo de carga de la página principal es de 10 segundos y la tasa de abandono durante la carga es del 15%. Necesitas mejorar las métricas de Core Web Vitals para reducir el tiempo de carga y mejorar la experiencia de usuario.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Rendimiento percibido del portal de banca en línea 202610191521 |
| **Nivel** | senior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 4 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Análisis de Métricas Actuales

**Objetivo:** Identificar las causas de las métricas deficientes de Core Web Vitals

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Realiza una auditoría de las métricas actuales del portal utilizando herramientas de análisis de rendimiento.
- Identifica las áreas que más impactan en las métricas de carga, estabilidad visual e interactividad.

**Entregable:** Informe de auditoría con las métricas actuales y las áreas problemáticas identificadas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de herramientas de análisis de rendimiento como Lighthouse o WebPageTest.
- Investiga las métricas de Core Web Vitals: LCP, FID y CLS.

</details>

### Fase 2: Optimización de Rendimiento

**Objetivo:** Implementar mejoras para reducir el tiempo de carga y mejorar las métricas de Core Web Vitals

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Aplica técnicas de optimización de rendimiento como la reducción de tamaño de imágenes, la minimización de CSS y JavaScript, y la carga diferida de recursos.
- Implementa cambios en el código para mejorar las métricas de LCP, FID y CLS.

**Entregable:** Portal de banca en línea con mejoras de rendimiento implementadas y métricas de Core Web Vitals mejoradas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la implementación de técnicas de optimización de rendimiento como la compresión de imágenes y la minimización de archivos.
- Investiga patrones de diseño que puedan mejorar la experiencia de usuario y las métricas de rendimiento.

</details>

### Fase 3: Validación de Mejoras

**Objetivo:** Verificar que las mejoras implementadas han tenido un impacto positivo en las métricas de Core Web Vitals

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Realiza una nueva auditoría de rendimiento para comparar las métricas antes y después de las mejoras.
- Documenta los cambios realizados y los resultados obtenidos.

**Entregable:** Informe de validación con las métricas de Core Web Vitals antes y después de las mejoras implementadas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la realización de pruebas A/B para validar el impacto de las mejoras.
- Investiga métodos para documentar y comunicar los resultados de las mejoras de rendimiento.

</details>

### Fase 4: Presentación de Resultados

**Objetivo:** Comunicar los resultados de las mejoras implementadas y las lecciones aprendidas

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Prepara una presentación para comunicar los resultados de las mejoras implementadas y las lecciones aprendidas.
- Discute las decisiones tomadas y los trade-offs considerados durante el proceso de optimización.

**Entregable:** Presentación de resultados con las mejoras implementadas, los resultados obtenidos y las lecciones aprendidas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la preparación de una presentación visual para comunicar los resultados de manera efectiva.
- Investiga métodos para discutir las decisiones tomadas y los trade-offs considerados durante el proceso de optimización.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las métricas de Core Web Vitals y por qué son importantes?
- **paraQueSirve**: ¿Para qué sirven las métricas de Core Web Vitals en el contexto del portal de banca en línea?
- **comoSeUsa**: ¿Cómo se utilizan las métricas de Core Web Vitals para identificar áreas problemáticas en el rendimiento del portal?
- **erroresComunes**: ¿Cuáles son los errores comunes al intentar mejorar las métricas de Core Web Vitals?
- **queDecisionesImplica**: ¿Qué decisiones implica el proceso de optimización de rendimiento en el portal de banca en línea?

## Criterios de Evaluacion

- Identificación correcta de las métricas de Core Web Vitals y su importancia en el contexto del portal de banca en línea.
- Aplicación efectiva de técnicas de optimización de rendimiento para mejorar las métricas de Core Web Vitals.
- Documentación clara y concisa de los resultados obtenidos y las lecciones aprendidas durante el proceso de optimización.
- Comunicación efectiva de los resultados y las decisiones tomadas durante la presentación.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*

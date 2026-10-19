# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Optimización de Core Web Vitals en el Portal de Banca Digital**.

| | |
|---|---|
| Tema | Rendimiento percibido del portal de banca en línea 202610191521 |
| Nivel | senior-l2 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript / Angular 20 |
| Patron arquitectonico | componentes standalone con lazy loading por rutas y servicios centralizados en core |
| Tiempo estimado | 4 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, angular.json y tsconfig.json en la raiz`
- `src/main.ts con bootstrapApplication`
- `src/app/app.config.ts con los providers`
- `src/app/core con servicios y modelos`
- `src/app/features con componentes contenedores`
- `src/app/shared con componentes presentacionales`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET y el proyecto no instala. Usa rango con caret sobre una version que exista.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.
- Angular necesita `angular.json` y `tsconfig.json` ademas del `package.json`, o `ng build` no corre.

Dependencias:

- @angular/core 20.0.0
- @angular/common 20.0.0
- @angular/platform-browser 20.0.0
- @angular/platform-browser-dynamic 20.0.0
- @angular/router 20.0.0
- @angular/material 20.0.0
- @angular/cdk 20.0.0
- rxjs 7.8.0
- typescript 5.8.0
- web-vitals 3.5.0
- image-minimizer-webpack-plugin 4.0.0
- @angular-devkit/build-angular 20.0.0
- eslint 8.56.0
- jest 29.7.0
- @types/node 20.11.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Análisis de Métricas Actuales**: Informe de auditoría con las métricas actuales y las áreas problemáticas identificadas.
- **Fase 2 — Optimización de Rendimiento**: Portal de banca en línea con mejoras de rendimiento implementadas y métricas de Core Web Vitals mejoradas.
- **Fase 3 — Validación de Mejoras**: Informe de validación con las métricas de Core Web Vitals antes y después de las mejoras implementadas.
- **Fase 4 — Presentación de Resultados**: Presentación de resultados con las mejoras implementadas, los resultados obtenidos y las lecciones aprendidas.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Archivos que la arquitectura declara (1 de 16)

La propuesta arquitectonica del reto los lista y no llegaron al repo. Crealos con implementacion real, respetando la capa en la que viven:

- [ ] `README.md`

### 2. Referencias colgando (4)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/app/core/interceptors/performance.interceptor.ts` — `PerformanceService.trackSlowRequest`
      Se invoca `trackSlowRequest` sobre `PerformanceService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/core/interceptors/performance.interceptor.ts` — `PerformanceService.trackFailedRequest`
      Se invoca `trackFailedRequest` sobre `PerformanceService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/features/dashboard/components/transaction-list.component.ts` — `Transaction.slice`
      Se invoca `slice` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `package.json` — `typescript@5.8.0`
      typescript declara la version 5.8.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

### Presentes (18)

- `package.json`
- `angular.json`
- `tsconfig.json`
- `src/app/core/models/performance-metrics.model.ts`
- `src/app/core/services/performance.service.ts`
- `src/app/core/services/image-optimization.service.ts`
- `src/main.ts`
- `src/index.html`
- `src/app/core/interceptors/performance.interceptor.ts`
- `src/app/app.config.ts`
- `src/app/features/dashboard/dashboard.component.ts`
- `src/app/features/dashboard/dashboard.component.html`
- `src/app/features/dashboard/dashboard.component.scss`
- `src/app/features/dashboard/components/transaction-list.component.ts`
- `src/app/shared/components/loading-spinner.component.ts`
- `src/app/features/dashboard/dashboard.routes.ts`
- `src/styles/configs/variables.scss`
- `src/assets/images/.gitkeep`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/app`
- `src/app/core`
- `src/app/core/services`
- `src/app/core/models`
- `src/app/features`
- `src/app/features/dashboard`
- `src/app/features/dashboard/components`
- `src/app/shared`
- `src/app/shared/components`
- `src/assets`
- `src/assets/images`
- `src/styles`
- `src/styles/configs`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **componentes standalone con lazy loading por rutas y servicios centralizados en core**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Senior L2
- Brecha que el reto ataca: Core Web Vitals. Aplica conceptos de Core Web Vitals y los usa para tomar decisiones de c�digo que potencien soluciones en el contexto de negocio.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*

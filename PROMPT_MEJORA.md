# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `README.md`

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/app/core/interceptors/performance.interceptor.ts` — `PerformanceService.trackSlowRequest`: Se invoca `trackSlowRequest` sobre `PerformanceService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/core/interceptors/performance.interceptor.ts` — `PerformanceService.trackFailedRequest`: Se invoca `trackFailedRequest` sobre `PerformanceService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/features/dashboard/components/transaction-list.component.ts` — `Transaction.slice`: Se invoca `slice` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `typescript@5.8.0`: typescript declara la version 5.8.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Senior L2

### Brecha de conocimiento
Core Web Vitals. Aplica conceptos de Core Web Vitals y los usa para tomar decisiones de c�digo que potencien soluciones en el contexto de negocio.

### Reto
- Tema: Rendimiento percibido del portal de banca en línea 202610191521
- Seniority: senior-l2
- Tipo: practical
- Título: Optimización de Core Web Vitals en el Portal de Banca Digital
- Tiempo estimado: 4 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Análisis de Métricas Actuales — objetivo: Identificar las causas de las métricas deficientes de Core Web Vitals — entregable (NO resolver): Informe de auditoría con las métricas actuales y las áreas problemáticas identificadas.
- Fase 2: Optimización de Rendimiento — objetivo: Implementar mejoras para reducir el tiempo de carga y mejorar las métricas de Core Web Vitals — entregable (NO resolver): Portal de banca en línea con mejoras de rendimiento implementadas y métricas de Core Web Vitals mejoradas.
- Fase 3: Validación de Mejoras — objetivo: Verificar que las mejoras implementadas han tenido un impacto positivo en las métricas de Core Web Vitals — entregable (NO resolver): Informe de validación con las métricas de Core Web Vitals antes y después de las mejoras implementadas.
- Fase 4: Presentación de Resultados — objetivo: Comunicar los resultados de las mejoras implementadas y las lecciones aprendidas — entregable (NO resolver): Presentación de resultados con las mejoras implementadas, los resultados obtenidos y las lecciones aprendidas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "portal-banca-digital",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --host 0.0.0.0 --port 4200",
    "build": "ng build --configuration production",
    "watch": "ng build --configuration development --watch",
    "test": "jest",
    "lint": "eslint . --ext .ts",
    "prebuild": "npm run lint",
    "analyze": "ng build --configuration production --stats-json && npx webpack-bundle-analyzer dist/portal-banca-digital/stats.json"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~20.0.0",
    "@angular/cdk": "~20.0.0",
    "@angular/common": "~20.0.0",
    "@angular/compiler": "~20.0.0",
    "@angular/core": "~20.0.0",
    "@angular/forms": "~20.0.0",
    "@angular/material": "~20.0.0",
    "@angular/platform-browser": "~20.0.0",
    "@angular/platform-browser-dynamic": "~20.0.0",
    "@angular/router": "~20.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "web-vitals": "^3.5.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~20.0.0",
    "@angular/cli": "~20.0.0",
    "@angular/compiler-cli": "~20.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.0",
    "eslint": "^8.56.0",
    "image-minimizer-webpack-plugin": "^4.0.0",
    "jest": "^29.7.0",
    "jest-preset-angular": "^13.1.0",
    "typescript": "~5.8.0"
  },
  "browserslist": {
    "production": [
      "last 2 Chrome versions",
      "last 2 Firefox versions",
      "last 2 Safari versions",
      "last 2 Edge versions"
    ],
    "development": [
      "last 1 Chrome version",
      "last 1 Firefox version",
      "last 1 Safari version",
      "last 1 Edge version"
    ]
  },
  "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": ["<rootDir>/setup-jest.ts"],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "<rootDir>/dist/",
      "<rootDir>/src/test.ts"
    ],
    "globals": {
      "ts-jest": {
        "tsconfig": "<rootDir>/tsconfig.spec.json",
        "stringifyContentPathRegex": "\\.(html|svg)$"
      }
    }
  }
}

// === ARCHIVO: angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "portal-banca-digital": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "standalone": true,
          "style": "scss"
        },
        "@schematics/angular:application": {
          "strict": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/portal-banca-digital",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss",
              "src/styles/configs/variables.scss"
            ],
            "scripts": [],
            "optimization": {
              "scripts": true,
              "styles": true,
              "fonts": true
            },
            "outputHashing": "all",
            "sourceMap": false,
            "namedChunks": false,
            "extractLicenses": true,
            "vendorChunk": false,
            "buildOptimizer": true,
            "fileReplacements": [
              {
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.prod.ts"
              }
            ],
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "500kb",
                "maximumError": "1mb"
              },
              {
                "type": "anyComponentStyle",
                "maximumWarning": "2kb",
                "maximumError": "4kb"
              }
            ],
            "stylePreprocessorOptions": {
              "includePaths": ["src/styles"]
            },
            "webWorkerTsConfig": "tsconfig.worker.json"
          },
          "configurations": {
            "production": {
              "optimization": {
                "scripts": true,
                "styles": {
                  "minify": true,
                  "inlineCritical": true
                },
                "fonts": {
                  "inline": true
                }
              },
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputPath": "dist/portal-banca-digital",
              "styles": {
                "optimizer": {
                  "plugins": [
                    {
                      "name": "image-minimizer-webpack-plugin",
                      "implementation": "image-minimizer-webpack-plugin",
                      "options": {
                        "minimizer": {
                          "implementation": "image-minimizer-webpack-plugin.imageminMinify",
                          "options": {
                            "plugins": [
                              ["gifsicle", { "interlaced": true }],
                              ["jpegtran", { "progressive": true }],
                              ["optipng", { "optimizationLevel": 5 }],
                              ["svgo", {
                                "plugins": [
                                  {
                                    "name": "preset-default",
                                    "params": {
                                      "overrides": {
                                        "removeViewBox": false
                                      }
                                    }
                                  }
                                ]
                              }]
                            ]
                          }
                        }
                      }
                    }
                  ]
                }
              }
            },
            "development": {
              "optimization": {
                "scripts": false,
                "styles": false,
                "fonts": false
              },
              "outputHashing": "none",
              "sourceMap": true,
              "namedChunks": true,
              "extractLicenses": false,
              "vendorChunk": true,
              "buildOptimizer": false
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "portal-banca-digital:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "portal-banca-digital:build:production"
            },
            "development": {
              "browserTarget": "portal-banca-digital:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "portal-banca-digital:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:jest",
          "options": {
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "tsconfig.app.json",
              "tsconfig.spec.json"
            ],
            "exclude": ["**/node_modules/**"]
          }
        }
      }
    }
  },
  "defaultProject": "portal-banca-digital",
  "cli": {
    "analytics": false,
    "schematicCollections": ["@angular/material"]
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom", "dom.iterable"],
    "types": ["node", "jest"],
    "paths": {
      "@app/*": ["src/app/*"],
      "@core/*": ["src/app/core/*"],
      "@features/*": ["src/app/features/*"],
      "@shared/*": ["src/app/shared/*"]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    "strictPropertyInitialization": true
  },
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
    "**/*.stories.ts"
  ]
}

// === ARCHIVO: src/app/core/models/performance-metrics.model.ts ===
import { Metric } from 'web-vitals';

/**
 * Modelo para representar métricas de rendimiento de Core Web Vitals.
 * Proporciona tipado fuerte para las métricas reportadas por la API de Web Vitals.
 */
export interface PerformanceMetrics {
  /**
   * Largest Contentful Paint (LCP): tiempo en milisegundos hasta que el contenido más grande es renderizado.
   * Umbral bueno: < 2500ms, umbral pobre: > 4000ms.
   */
  lcp?: number;

  /**
   * First Input Delay (FID): tiempo en milisegundos desde que el usuario interactúa hasta que el navegador responde.
   * Umbral bueno: < 100ms, umbral pobre: > 300ms.
   */
  fid?: number;

  /**
   * Cumulative Layout Shift (CLS): medida de la inestabilidad visual acumulada.
   * Umbral bueno: < 0.1, umbral pobre: > 0.25.
   */
  cls?: number;

  /**
   * First Contentful Paint (FCP): tiempo en milisegundos hasta que el primer contenido es renderizado.
   * Umbral bueno: < 1800ms, umbral pobre: > 3000ms.
   */
  fcp?: number;

  /**
   * Time to First Byte (TTFB): tiempo en milisegundos hasta que el navegador recibe el primer byte de la respuesta.
   * Umbral bueno: < 800ms, umbral pobre: > 1800ms.
   */
  ttfb?: number;

  /**
   * Tiempo total de carga de la página en milisegundos.
   */
  loadTime?: number;
}

/**
 * Tipo para representar una métrica reportada por la API de Web Vitals.
 * Extiende el tipo base Metric para incluir información adicional relevante para el dominio.
 */
export interface WebVitalsMetric extends Metric {
  /**
   * Identificador único de la métrica para facilitar su manipulación y almacenamiento.
   */
  id: string;

  /**
   * Ruta de la página donde se midió la métrica.
   */
  path?: string;

  /**
   * Timestamp de cuándo se reportó la métrica (en milisegundos desde epoch).
   */
  timestamp: number;
}

/**
 * Modelo para representar un reporte agregado de métricas de rendimiento.
 * Utilizado para consolidar métricas por ruta o sesión de usuario.
 */
export interface PerformanceReport {
  /**
   * Ruta o identificador del contexto donde se recolectaron las métricas.
   */
  context: string;

  /**
   * Métricas promedio calculadas para el contexto.
   */
  averages: PerformanceMetrics;

  /**
   * Métricas individuales recolectadas.
   */
  metrics: WebVitalsMetric[];

  /**
   * Timestamp de la última actualización del reporte.
   */
  lastUpdated: number;
}

// === ARCHIVO: src/app/core/services/performance.service.ts ===
import { Injectable, signal } from '@angular/core';
import { Metric, onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';
import { PerformanceMetrics, WebVitalsMetric, PerformanceReport } from '../models/performance-metrics.model';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Servicio para monitorear y reportar métricas de Core Web Vitals.
 * Utiliza la API de Web Vitals para recolectar métricas en tiempo real y las expone
 * para su uso en la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  /**
   * Señal para almacenar las métricas actuales de Core Web Vitals.
   * Actualizada cada vez que se reporta una nueva métrica.
   */
  private readonly _currentMetrics = signal<PerformanceMetrics>({});

  /**
   * Observable para emitir reportes de rendimiento consolidados.
   * Útil para componentes que necesitan reaccionar a cambios en las métricas.
   */
  private readonly _performanceReports = new BehaviorSubject<PerformanceReport[]>([]);

  /**
   * Observable público para suscribirse a reportes de rendimiento.
   */
  readonly performanceReports$ = this._performanceReports.asObservable();

  /**
   * Métricas recolectadas durante la sesión actual.
   */
  private metrics: WebVitalsMetric[] = [];

  constructor() {
    this.initializeMetricsCollection();
  }

  /**
   * Inicializa la recolección de métricas utilizando la API de Web Vitals.
   */
  private initializeMetricsCollection(): void {
    onLCP((metric) => this.handleMetric(metric, 'lcp'));
    onFID((metric) => this.handleMetric(metric, 'fid'));
    onCLS((metric) => this.handleMetric(metric, 'cls'));
    onFCP((metric) => this.handleMetric(metric, 'fcp'));
    onTTFB((metric) => this.handleMetric(metric, 'ttfb'));
  }

  /**
   * Maneja una métrica reportada por la API de Web Vitals.
   * @param metric Métrica reportada por la API.
   * @param type Tipo de métrica (lcp, fid, cls, etc.).
   */
  private handleMetric(metric: Metric, type: keyof PerformanceMetrics): void {
    const webVitalsMetric: WebVitalsMetric = {
      ...metric,
      id: `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      path: window.location.pathname,
      timestamp: Date.now()
    };

    this.metrics.push(webVitalsMetric);
    this.updateCurrentMetrics(webVitalsMetric, type);
    this.updatePerformanceReports(webVitalsMetric);
  }

  /**
   * Actualiza las métricas actuales con la nueva métrica reportada.
   * @param metric Métrica reportada.
   * @param type Tipo de métrica.
   */
  private updateCurrentMetrics(metric: WebVitalsMetric, type: keyof PerformanceMetrics): void {
    const current = this._currentMetrics();
    this._currentMetrics.set({
      ...current,
      [type]: metric.value,
      loadTime: type === 'lcp' ? metric.value : current.loadTime
    });
  }

  /**
   * Actualiza los reportes de rendimiento con la nueva métrica reportada.
   * @param metric Métrica reportada.
   */
  private updatePerformanceReports(metric: WebVitalsMetric): void {
    const reports = this._performanceReports.value;
    const existingReportIndex = reports.findIndex(report => report.context === metric.path);

    if (existingReportIndex >= 0) {
      const existingReport = reports[existingReportIndex];
      const updatedMetrics = [...existingReport.metrics, metric];
      const averages = this.calculateAverages(updatedMetrics);

      reports[existingReportIndex] = {
        ...existingReport,
        metrics: updatedMetrics,
        averages,
        lastUpdated: Date.now()
      };
    } else {
      const averages = this.calculateAverages([metric]);
      reports.push({
        context: metric.path || 'unknown',
        averages,
        metrics: [metric],
        lastUpdated: Date.now()
      });
    }

    this._performanceReports.next(reports);
  }

  /**
   * Calcula métricas promedio a partir de un conjunto de métricas individuales.
   * @param metrics Métricas individuales.
   * @returns Métricas promedio calculadas.
   */
  private calculateAverages(metrics: WebVitalsMetric[]): PerformanceMetrics {
    if (metrics.length === 0) {
      return {};
    }

    const sum = metrics.reduce((acc, metric) => {
      const type = this.getMetricType(metric.name);
      if (type) {
        acc[type] = (acc[type] || 0) + metric.value;
      }
      return acc;
    }, {} as Record<keyof PerformanceMetrics, number>);

    const averages: PerformanceMetrics = {};
    for (const type in sum) {
      averages[type as keyof PerformanceMetrics] = sum[type as keyof PerformanceMetrics] / metrics.length;
    }

    return averages;
  }

  /**
   * Determina el tipo de métrica basado en el nombre reportado por la API.
   * @param name Nombre de la métrica reportado por la API.
   * @returns Tipo de métrica correspondiente.
   */
  private getMetricType(name: string): keyof PerformanceMetrics | null {
    const mapping: Record<string, keyof PerformanceMetrics> = {
      'LCP': 'lcp',
      'FID': 'fid',
      'CLS': 'cls',
      'FCP': 'fcp',
      'TTFB': 'ttfb'
    };
    return mapping[name] || null;
  }

  /**
   * Obtiene las métricas actuales de Core Web Vitals.
   * @returns Señal con las métricas actuales.
   */
  getCurrentMetrics(): PerformanceMetrics {
    return this._currentMetrics();
  }

  /**
   * Obtiene todas las métricas recolectadas durante la sesión actual.
   * @returns Array de métricas recolectadas.
   */
  getAllMetrics(): WebVitalsMetric[] {
    return [...this.metrics];
  }

  /**
   * Reinicia la recolección de métricas.
   */
  resetMetrics(): void {
    this.metrics = [];
    this._currentMetrics.set({});
    this._performanceReports.next([]);
  }

  /**
   * Genera un reporte de rendimiento para una ruta específica.
   * @param path Ruta para la cual generar el reporte.
   * @returns Observable con el reporte de rendimiento.
   */
  getPerformanceReport(path: string): Observable<PerformanceReport> {
    return new Observable<PerformanceReport>(subscriber => {
      const reports = this._performanceReports.value;
      const report = reports.find(r => r.context === path);

      if (report) {
        subscriber.next(report);
      } else {
        subscriber.next({
          context: path,
          averages: {},
          metrics: [],
          lastUpdated: Date.now()
        });
      }
      subscriber.complete();
    });
  }
}

// === ARCHIVO: src/app/core/services/image-optimization.service.ts ===
import { Injectable, inject } from '@angular/core';
import { PerformanceService } from './performance.service';
import { WebVitalsMetric } from '../models/performance-metrics.model';

/**
 * Servicio para optimizar imágenes y mejorar métricas de rendimiento.
 * Proporciona métodos para cargar imágenes de manera eficiente, aplicar lazy loading,
 * y convertir imágenes a formatos modernos como WebP.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {
  private readonly performanceService = inject(PerformanceService);

  /**
   * Carga una imagen de manera optimizada, aplicando lazy loading y conversión a WebP si es posible.
   * @param url URL de la imagen a cargar.
   * @param alt Texto alternativo para la imagen.
   * @param width Ancho deseado para la imagen.
   * @param height Alto deseado para la imagen.
   * @param loading Estrategia de carga ('lazy' o 'eager').
   * @returns Promesa que resuelve con el elemento HTMLImageElement cargado.
   */
  async loadOptimizedImage(
    url: string,
    alt: string,
    width?: number,
    height?: number,
    loading: 'lazy' | 'eager' = 'lazy'
  ): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const startTime = performance.now();
      const img = new Image();

      // Aplicar atributos de dimensión para evitar CLS
      if (width) img.width = width;
      if (height) img.height = height;

      img.alt = alt;
      img.loading = loading;
      img.decoding = 'async';

      // Usar srcset con WebP si el navegador lo soporta
      const webpUrl = this.convertToWebPUrl(url);
      if (webpUrl) {
        img.srcset = `${webpUrl} 1x`;
      }
      img.src = url;

      img.onload = () => {
        const loadTime = performance.now() - startTime;
        this.reportImageLoadTime(url, loadTime);
        resolve(img);
      };

      img.onerror = () => {
        // Fallback a la URL original si WebP falla
        if (webpUrl && img.src !== url) {
          img.src = url;
        } else {
          reject(new Error(`Failed to load image: ${url}`));
        }
      };
    });
  }

  /**
   * Convierte una URL de imagen a formato WebP si el navegador soporta el formato.
   * @param url URL original de la imagen.
   * @returns URL en formato WebP o null si el navegador no soporta WebP.
   */
  private convertToWebPUrl(url: string): string | null {
    if (!this.supportsWebP()) {
      return null;
    }

    const extension = url.split('.').pop()?.toLowerCase();
    if (!extension || ['webp', 'svg'].includes(extension)) {
      return null;
    }

    return url.replace(`.${extension}`, '.webp');
  }

  /**
   * Verifica si el navegador soporta el formato WebP.
   * @returns true si el navegador soporta WebP, false en caso contrario.
   */
  private supportsWebP(): boolean {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  /**
   * Reporta el tiempo de carga de una imagen al PerformanceService.
   * @param url URL de la imagen cargada.
   * @param loadTime Tiempo de carga en milisegundos.
   */
  private reportImageLoadTime(url: string, loadTime: number): void {
    const metric: WebVitalsMetric = {
      id: `image-load-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: 'ImageLoadTime',
      value: loadTime,
      delta: loadTime,
      entries: [],
      path: window.location.pathname,
      timestamp: Date.now()
    };

    // Simular el envío a PerformanceService para registrar la métrica
    const reports = this.performanceService['_performanceReports'].value;
    const existingReportIndex = reports.findIndex(report => report.context === metric.path);

    if (existingReportIndex >= 0) {
      const existingReport = reports[existingReportIndex];
      const updatedMetrics = [...existingReport.metrics, metric];
      reports[existingReportIndex] = {
        ...existingReport,
        metrics: updatedMetrics,
        lastUpdated: Date.now()
      };
      this.performanceService['_performanceReports'].next(reports);
    }
  }

  /**
   * Pre-carga imágenes críticas para mejorar LCP.
   * @param urls URLs de las imágenes críticas a pre-cargar.
   */
  preloadCriticalImages(urls: string[]): void {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  /**
   * Aplica lazy loading a un contenedor que contiene imágenes.
   * @param container Elemento DOM que contiene imágenes para aplicar lazy loading.
   */
  applyLazyLoadingToContainer(container: HTMLElement): void {
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }

  /**
   * Calcula el tamaño recomendado para una imagen basado en el dispositivo.
   * @param originalWidth Ancho original de la imagen.
   * @param originalHeight Alto original de la imagen.
   * @returns Objeto con el ancho y alto recomendados.
   */
  calculateRecommendedSize(originalWidth: number, originalHeight: number): { width: number; height: number } {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const screenWidth = window.innerWidth * devicePixelRatio;
    const screenHeight = window.innerHeight * devicePixelRatio;

    // Ajustar el tamaño basado en la pantalla
    const width = Math.min(originalWidth, screenWidth);
    const height = Math.min(originalHeight, screenHeight * 0.7); // Limitar a 70% de la altura de la pantalla

    return { width, height };
  }

  /**
   * Genera un conjunto de fuentes para srcset basado en el ancho original de la imagen.
   * @param baseUrl URL base de la imagen (sin extensión).
   * @param originalWidth Ancho original de la imagen.
   * @param extension Extensión de la imagen (ej. 'jpg', 'png').
   * @returns String srcset con las fuentes generadas.
   */
  generateSrcSet(baseUrl: string, originalWidth: number, extension: string): string {
    const sizes = [300, 600, 1200, 2000];
    const filteredSizes = sizes.filter(size => size < originalWidth);

    return filteredSizes
      .map(size => `${baseUrl}-${size}w.${extension} ${size}w`)
      .join(', ');
  }
}

// === ARCHIVO: src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ErrorHandler, Injector, inject } from '@angular/core';
import { Router, NavigationError } from '@angular/router';
import { PerformanceService } from './app/core/services/performance.service';
import { reportWebVitals, Metric } from 'web-vitals';

class GlobalErrorHandler implements ErrorHandler {
  private readonly router = inject(Router);
  private readonly performanceService = inject(PerformanceService);

  handleError(error: Error): void {
    console.error('Error global capturado:', error);

    if (error instanceof NavigationError) {
      console.warn(`Navegación fallida a: ${error.url}`);
    }

    this.reportErrorToMonitoring(error);
  }

  private reportErrorToMonitoring(error: Error): void {
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };

    if (typeof window !== 'undefined' && (window as any).NgPerfLogging) {
      console.log('[Perf] Error reportado:', errorData);
    }
  }
}

function measurePerformance(metric: Metric): void {
  console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}ms`);

  if (typeof window !== 'undefined') {
    const existingMetrics = JSON.parse(sessionStorage.getItem('webvitals') || '[]');
    existingMetrics.push({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      navigationType: metric.navigationType
    });
    sessionStorage.setItem('webvitals', JSON.stringify(existingMetrics));
  }
}

function reportWebVitalsForAngular(metric: Metric): void {
  measurePerformance(metric);
}

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    console.log('Portal Banca Digital iniciado correctamente');

    const injector = appRef.injector;
    const router = injector.get(Router);

    router.events.subscribe((event) => {
      if (event instanceof NavigationError) {
        console.error('Error de navegación:', event.url);
      }
    });

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        reportWebVitals(reportWebVitalsForAngular);
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        reportWebVitals(reportWebVitalsForAngular);
      }, 3000);
    }
  })
  .catch((err) => {
    console.error('Error al iniciar la aplicación:', err);
    const rootElement = document.querySelector('app-root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          padding: 20px;
        ">
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">Error de Inicialización</h1>
          <p style="font-size: 1.1rem; opacity: 0.9;">No se pudo cargar la aplicación. Por favor, recarga la página.</p>
          <button 
            onclick="window.location.reload()"
            style="
              margin-top: 20px;
              padding: 12px 32px;
              font-size: 1rem;
              background: white;
              color: #667eea;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
              transition: transform 0.2s ease;
            "
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'"
          >
            Recargar Página
          </button>
        </div>
      `;
    }
  });

// === ARCHIVO: src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Portal Banca Digital - Banco Digitalis</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Portal de banca en línea de Banco Digitalis. Accede a tus cuentas, transferencias, préstamos y más servicios bancarios de forma segura.">
  <meta name="keywords" content="banca digital, banco online, transferencias, préstamos, cuentas bancarias, Banco Digitalis">
  <meta name="author" content="Banco Digitalis">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#1976d2">

  <meta property="og:title" content="Portal Banca Digital - Banco Digitalis">
  <meta property="og:description" content="Accede a tus cuentas y servicios bancarios de forma segura">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_ES">

  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"></noscript>

  <link rel="preload" href="main.js" as="script">
  <link rel="preload" href="styles.css" as="style">

  <link rel="preload" href="https://fonts.googleapis.com" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="https://fonts.gstatic.com" as="font" type="font/woff2" crossorigin>

  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }

    html {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background-color: #f5f5f5;
      color: #212121;
      line-height: 1.5;
    }

    .app-loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #1e88e5 100%);
      z-index: 9999;
    }

    .app-loading .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .app-loading .loading-text {
      margin-top: 16px;
      color: white;
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #1976d2;
      color: white;
      padding: 8px 16px;
      z-index: 100;
      text-decoration: none;
      font-weight: 500;
    }

    .skip-link:focus {
      top: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>

  <script>
    (function() {
      var themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) {
        document.documentElement.style.setProperty('--theme-color', themeColor.getAttribute('content'));
      }
    })();
  </script>

  <noscript>
    <style>
      .app-loading { display: none; }
    </style>
  </noscript>
</head>
<body>
  <a class="skip-link" href="#main-content">Saltar al contenido principal</a>

  <app-root>
    <div class="app-loading" role="status" aria-live="polite">
      <div class="spinner"></div>
      <span class="loading-text">Cargando Portal Banca Digital...</span>
    </div>
  </app-root>

  <script>
    window.addEventListener('DOMContentLoaded', function() {
      var loadingElement = document.querySelector('.app-loading');
      if (loadingElement) {
        setTimeout(function() {
          loadingElement.style.opacity = '0';
          loadingElement.style.transition = 'opacity 0.3s ease';
          setTimeout(function() {
            loadingElement.remove();
          }, 300);
        }, 100);
      }
    });
  </script>

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Portal Banca Digital",
      "description": "Portal de banca en línea de Banco Digitalis",
      "url": "https://bancodigitalis.com",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      }
    }
  </script>
</body>
</html>

// === ARCHIVO: src/app/core/interceptors/performance.interceptor.ts ===
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap, catchError, throwError, finalize, timer } from 'rxjs';
import { PerformanceService } from '../services/performance.service';
import { environment } from '../../../environments/environment';

const SLOW_REQUEST_THRESHOLD = 3000;
const CRITICAL_REQUEST_THRESHOLD = 5000;

export const performanceInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const performanceService = inject(PerformanceService);
  const startTime = performance.now();
  const requestId = generateRequestId();
  const isApiRequest = req.url.includes('/api/');
  const isOptimizationCandidate = isOptimizationEndpoint(req.url);

  if (!isApiRequest && !isOptimizationCandidate) {
    return next(req);
  }

  logRequestStart(req, requestId, startTime);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = performance.now() - startTime;
          handleResponse(req, event, duration, requestId, performanceService);
        }
      },
      error: (error: HttpErrorResponse) => {
        const duration = performance.now() - startTime;
        handleError(req, error, duration, requestId, performanceService);
        return throwError(() => error);
      }
    }),
    finalize(() => {
      const duration = performance.now() - startTime;
      if (duration > CRITICAL_REQUEST_THRESHOLD) {
        console.warn(`[Performance] Request ${requestId} to ${req.url} took critical time: ${duration.toFixed(2)}ms`);
      }
    })
  );
};

function handleResponse(
  req: HttpRequest<unknown>,
  event: HttpResponse<unknown>,
  duration: number,
  requestId: string,
  performanceService: PerformanceService
): void {
  const isSlow = duration > SLOW_REQUEST_THRESHOLD;
  const isSuccess = event.status >= 200 && event.status < 300;

  if (isSlow) {
    console.warn(`[Performance] Slow request detected: ${req.method} ${req.url} took ${duration.toFixed(2)}ms`);
  }

  if (isSuccess && isSlow) {
    performanceService.trackSlowRequest({
      url: req.url,
      method: req.method,
      duration,
      status: event.status,
      timestamp: Date.now(),
      requestId
    });
  }

  if (environment.production && isSuccess) {
    logSuccessMetrics(req.url, duration, event.status);
  }
}

function handleError(
  req: HttpRequest<unknown>,
  error: HttpErrorResponse,
  duration: number,
  requestId: string,
  performanceService: PerformanceService
): void {
  const errorType = categorizeHttpError(error);
  console.error(`[Performance] Request failed: ${req.method} ${req.url} - ${errorType} - ${duration.toFixed(2)}ms`);

  performanceService.trackFailedRequest({
    url: req.url,
    method: req.method,
    duration,
    status: error.status,
    errorType,
    timestamp: Date.now(),
    requestId
  });

  if (error.status === 0) {
    console.error('[Performance] Network error or CORS issue detected');
  } else if (error.status >= 500) {
    console.error('[Performance] Server error detected');
  }
}

function categorizeHttpError(error: HttpErrorResponse): string {
  if (error.status === 0) return 'NETWORK_ERROR';
  if (error.status === 401) return 'UNAUTHORIZED';
  if (error.status === 403) return 'FORBIDDEN';
  if (error.status === 404) return 'NOT_FOUND';
  if (error.status >= 500) return 'SERVER_ERROR';
  if (error.status >= 400) return 'CLIENT_ERROR';
  return 'UNKNOWN';
}

function isOptimizationEndpoint(url: string): boolean {
  const optimizationPatterns = [
    /\/assets\//i,
    /\/images\//i,
    /\.(js|css)$/i,
    /\/api\/public\//i
  ];
  return optimizationPatterns.some(pattern => pattern.test(url));
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function logRequestStart(req: HttpRequest<unknown>, requestId: string, startTime: number): void {
  if (!environment.production) {
    console.log(`[Performance] ${requestId}: ${req.method} ${req.url} started`);
  }
}

function logSuccessMetrics(url: string, duration: number, status: number): void {
  const metrics = {
    url,
    duration: Math.round(duration),
    status,
    timestamp: Date.now()
  };
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'http_request_duration', metrics);
  }
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// === ARCHIVO: src/app/app.config.ts ===
import { ApplicationConfig, provideZoneChangeDetection, isDevMode, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouterTransition } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { providePerformanceMonitoring } from '@angular/platform-browser';
import { routes } from './app.routes';
import { performanceInterceptor } from './core/interceptors/performance.interceptor';
import { PerformanceService } from './core/services/performance.service';
import { ImageOptimizationService } from './core/services/image-optimization.service';
import { environment } from '../environments/environment';

function initializePerformanceMonitoring(performanceService: PerformanceService): () => void {
  return () => {
    if (!isDevMode()) {
      performanceService.initializeMetricsCollection();
      console.log('[App] Performance monitoring initialized');
    }
  };
}

function initializeImageOptimization(imageService: ImageOptimizationService): () => void {
  return () => {
    const criticalImages = [
      '/assets/images/logo.png',
      '/assets/images/hero-background.jpg',
      '/assets/images/hero-background.webp'
    ];
    imageService.preloadCriticalImages(criticalImages);
    console.log('[App] Image optimization initialized');
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([performanceInterceptor])
    ),
    provideAnimationsAsync(),
    providePerformanceMonitoring(),
    {
      provide: HTTP_INTERCEPTORS,
      useValue: performanceInterceptor,
      multi: true
    },
    {
      provide: PerformanceService,
      useClass: PerformanceService
    },
    {
      provide: ImageOptimizationService,
      useClass: ImageOptimizationService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializePerformanceMonitoring,
      deps: [PerformanceService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeImageOptimization,
      deps: [ImageOptimizationService],
      multi: true
    },
    provideStore(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }
    ),
    provideEffects([]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    {
      provide: 'COOLING_PERIOD_MS',
      useValue: environment.production ? 1000 : 100
    },
    {
      provide: 'MAX_RETRY_ATTEMPTS',
      useValue: environment.production ? 3 : 1
    },
    {
      provide: 'REQUEST_TIMEOUT_MS',
      useValue: 30000
    },
    {
      provide: 'CACHE_DURATION_MS',
      useValue: 300000
    }
  ]
};

// === ARCHIVO: src/app/features/dashboard/dashboard.component.ts ===
import { Component, OnInit, OnDestroy, signal, computed, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil, forkJoin, of, catchError, finalize, interval, switchMap } from 'rxjs';
import { PerformanceService } from '@core/services/performance.service';
import { ImageOptimizationService } from '@core/services/image-optimization.service';
import { TransactionListComponent } from './components/transaction-list.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner.component';
import { AccountSummary, Transaction, DashboardData, PerformanceMetrics } from '@core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule,
    MatSnackBarModule,
    TransactionListComponent,
    LoadingSpinnerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly performanceService = inject(PerformanceService);
  private readonly imageOptimizationService = inject(ImageOptimizationService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroy$ = new Subject<void>();
  private readonly refreshInterval$ = new Subject<void>();

  readonly isLoading = signal(true);
  readonly dashboardData = signal<DashboardData | null>(null);
  readonly error = signal<string | null>(null);
  readonly lastUpdate = signal<Date | null>(null);
  readonly currentMetrics = signal<PerformanceMetrics | null>(null);

  readonly accountSummary = computed(() => this.dashboardData()?.accountSummary);
  readonly recentTransactions = computed(() => this.dashboardData()?.recentTransactions ?? []);
  readonly totalBalance = computed(() => this.calculateTotalBalance());
  readonly hasNegativeBalance = computed(() => this.totalBalance() < 0);
  readonly accountCount = computed(() => this.accountSummary()?.accounts?.length ?? 0);

  readonly displayedColumns = ['date', 'description', 'amount', 'status'];

  constructor() {
    effect(() => {
      const metrics = this.currentMetrics();
      if (metrics) {
        this.logPerformanceMetrics(metrics);
      }
    });
  }

  ngOnInit(): void {
    this.initializeDashboard();
    this.startAutoRefresh();
    this.loadPerformanceMetrics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.refreshInterval$.complete();
  }

  private initializeDashboard(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.loadDashboardData().pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (data) => {
        this.dashboardData.set(data);
        this.lastUpdate.set(new Date());
        this.optimizeDashboardImages();
        this.showSuccessNotification('Dashboard loaded successfully');
      },
      error: (err) => {
        const errorMessage = err.message || 'Failed to load dashboard data';
        this.error.set(errorMessage);
        this.showErrorNotification(errorMessage);
        this.loadFallbackData();
      }
    });
  }

  private loadDashboardData() {
    const accountSummary$ = this.fetchAccountSummary();
    const transactions$ = this.fetchRecentTransactions();

    return forkJoin({
      accountSummary: accountSummary$,
      recentTransactions: transactions$
    }).pipe(
      switchMap((data) => {
        const dashboardData: DashboardData = {
          accountSummary: data.accountSummary,
          recentTransactions: data.recentTransactions,
          lastUpdated: new Date()
        };
        return of(dashboardData);
      }),
      catchError((error) => {
        console.error('[Dashboard] Error loading data:', error);
        return this.getFallbackDashboardData();
      })
    );
  }

  private fetchAccountSummary() {
    return of(this.getMockAccountSummary()).pipe(
      takeUntil(this.destroy$)
    );
  }

  private fetchRecentTransactions() {
    return of(this.getMockTransactions()).pipe(
      takeUntil(this.destroy$)
    );
  }

  private getMockAccountSummary(): AccountSummary {
    return {
      totalBalance: 45750.85,
      accounts: [
        { id: 'ACC001', name: 'Cuenta Corriente', type: 'checking', balance: 12500.50, currency: 'USD' },
        { id: 'ACC002', name: 'Cuenta de Ahorros', type: 'savings', balance: 33250.35, currency: 'USD' }
      ],
      lastUpdated: new Date()
    };
  }

  private getMockTransactions(): Transaction[] {
    const now = new Date();
    return [
      {
        id: 'TXN001',
        date: new Date(now.getTime() - 3600000),
        description: 'Pago de servicios',
        amount: -150.00,
        currency: 'USD',
        status: 'completed',
        category: 'utilities'
      },
      {
        id: 'TXN002',
        date: new Date(now.getTime() - 86400000),
        description: 'Depósito de nómina',
        amount: 3500.00,
        currency: 'USD',
        status: 'completed',
        category: 'income'
      },
      {
        id: 'TXN003',
        date: new Date(now.getTime() - 172800000),
        description: 'Transferencia a terceros',
        amount: -500.00,
        currency: 'USD',
        status: 'completed',
        category: 'transfer'
      },
      {
        id: 'TXN004',
        date: new Date(now.getTime() - 259200000),
        description: 'Compra en línea',
        amount: -89.99,
        currency: 'USD',
        status: 'completed',
        category: 'shopping'
      },
      {
        id: 'TXN005',
        date: new Date(now.getTime() - 345600000),
        description: 'Pago de tarjeta',
        amount: -1200.00,
        currency: 'USD',
        status: 'pending',
        category: 'credit_card'
      }
    ];
  }

  private getFallbackDashboardData() {
    const fallbackData: DashboardData = {
      accountSummary: this.getMockAccountSummary(),
      recentTransactions: this.getMockTransactions(),
      lastUpdated: new Date()
    };
    return of(fallbackData);
  }

  private loadFallbackData(): void {
    const fallbackData: DashboardData = {
      accountSummary: this.getMockAccountSummary(),
      recentTransactions: this.getMockTransactions(),
      lastUpdated: new Date()
    };
    this.dashboardData.set(fallbackData);
    this.lastUpdate.set(new Date());
  }

  private startAutoRefresh(): void {
    interval(60000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (!this.isLoading()) {
        this.refreshData();
      }
    });
  }

  refreshData(): void {
    this.initializeDashboard();
  }

  private loadPerformanceMetrics(): void {
    this.performanceService.getCurrentMetrics().pipe(
      takeUntil(this.destroy$)
    ).subscribe(metrics => {
      this.currentMetrics.set(metrics);
    });
  }

  private optimizeDashboardImages(): void {
    if (typeof document !== 'undefined') {
      const container = document.querySelector('.dashboard-container');
      if (container) {
        this.imageOptimizationService.applyLazyLoadingToContainer(container as HTMLElement);
      }
    }
  }

  private calculateTotalBalance(): number {
    const summary = this.accountSummary();
    if (!summary?.accounts) return 0;
    return summary.accounts.reduce((total, acc) => total + acc.balance, 0);
  }

  private logPerformanceMetrics(metrics: PerformanceMetrics): void {
    console.log('[Dashboard] Current performance metrics:', metrics);
  }

  private showSuccessNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showErrorNotification(message: string): void {
    this.snackBar.open(message, 'Retry', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    }).onAction().subscribe(() => {
      this.refreshData();
    });
  }

  getStatusClass(status: string): string {
    const statusClasses: Record<string, string> = {
      completed: 'status-completed',
      pending: 'status-pending',
      failed: 'status-failed',
      cancelled: 'status-cancelled'
    };
    return statusClasses[status] || 'status-default';
  }

  getAmountClass(amount: number): string {
    return amount >= 0 ? 'amount-positive' : 'amount-negative';
  }

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }

  trackByTransactionId(index: number, transaction: Transaction): string {
    return transaction.id;
  }

  trackByAccountId(index: number, account: any): string {
    return account.id;
  }

  onAccountClick(accountId: string): void {
    console.log(`[Dashboard] Account clicked: ${accountId}`);
  }

  onTransactionClick(transactionId: string): void {
    console.log(`[Dashboard] Transaction clicked: ${transactionId}`);
  }

  onTransferClick(): void {
    console.log('[Dashboard] Navigate to transfer');
  }

  onPayBillClick(): void {
    console.log('[Dashboard] Navigate to pay bill');
  }

  onViewStatementsClick(): void {
    console.log('[Dashboard] Navigate to statements');
  }

  onRefreshClick(): void {
    this.refreshData();
  }

// === ARCHIVO: src/app/features/dashboard/dashboard.component.html ===
<section class="dashboard-container" role="main" aria-label="Panel principal de banca digital">
  <header class="dashboard-header">
    <h1>Bienvenido a tu Portal de Banca Digital</h1>
    <p class="subtitle">Gestiona tus finanzas con total seguridad y facilidad</p>
  </header>

  <section class="metrics-summary" aria-labelledby="metrics-title">
    <h2 id="metrics-title" class="sr-only">Resumen de métricas de rendimiento</h2>
    <article class="metric-card" *ngIf="currentMetrics$ | async as metrics" aria-label="Métrica de Largest Contentful Paint">
      <div class="metric-icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <div class="metric-content">
        <span class="metric-label">LCP</span>
        <span class="metric-value" [attr.aria-label]="'Largest Contentful Paint: ' + metrics.lcp.value + ' milisegundos'">{{ metrics.lcp.value }}ms</span>
        <span class="metric-rating" [class]="'rating-' + metrics.lcp.rating" aria-label="Calificación: " [attr.aria-label]="'Calificación LCP: ' + metrics.lcp.rating">
          {{ metrics.lcp.rating | titlecase }}
        </span>
      </div>
    </article>

    <article class="metric-card" *ngIf="currentMetrics$ | async as metrics" aria-label="Métrica de First Input Delay">
      <div class="metric-icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      </div>
      <div class="metric-content">
        <span class="metric-label">FID</span>
        <span class="metric-value" [attr.aria-label]="'First Input Delay: ' + metrics.fid.value + ' milisegundos'">{{ metrics.fid.value }}ms</span>
        <span class="metric-rating" [class]="'rating-' + metrics.fid.rating" [attr.aria-label]="'Calificación FID: ' + metrics.fid.rating">
          {{ metrics.fid.rating | titlecase }}
        </span>
      </div>
    </article>

    <article class="metric-card" *ngIf="currentMetrics$ | async as metrics" aria-label="Métrica de Cumulative Layout Shift">
      <div class="metric-icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      </div>
      <div class="metric-content">
        <span class="metric-label">CLS</span>
        <span class="metric-value" [attr.aria-label]="'Cumulative Layout Shift: ' + metrics.cls.value"
              [attr.aria-label]="'CLS: ' + metrics.cls.value.toFixed(3)">{{ metrics.cls.value.toFixed(3) }}</span>
        <span class="metric-rating" [class]="'rating-' + metrics.cls.rating" [attr.aria-label]="'Calificación CLS: ' + metrics.cls.rating">
          {{ metrics.cls.rating | titlecase }}
        </span>
      </div>
    </article>
  </section>

  <section class="dashboard-content" aria-labelledby="content-title">
    <h2 id="content-title" class="section-title">Resumen de tu actividad</h2>
    
    <div class="content-grid">
      <article class="account-summary" aria-labelledby="accounts-title">
        <h3 id="accounts-title">Tus Cuentas</h3>
        <ul class="account-list" role="list" aria-label="Lista de cuentas bancarias">
          <li *ngFor="let account of accounts; trackBy: trackByAccountId" class="account-item">
            <div class="account-info">
              <span class="account-name">{{ account.name }}</span>
              <span class="account-number">••••{{ account.lastFourDigits }}</span>
            </div>
            <div class="account-balance" [attr.aria-label]="'Saldo disponible: ' + (account.balance | currency)">
              {{ account.balance | currency:account.currency }}
            </div>
          </li>
        </ul>
      </article>

      <article class="recent-transactions" aria-labelledby="transactions-title">
        <h3 id="transactions-title">Transacciones Recientes</h3>
        <app-transaction-list
          [transactions]="recentTransactions"
          [loading]="transactionsLoading"
          (transactionSelected)="onTransactionSelect($event)"
          aria-label="Lista de transacciones recientes">
        </app-transaction-list>
      </article>
    </div>
  </section>

  <section class="performance-insights" aria-labelledby="insights-title" *ngIf="performanceInsights$ | async as insights">
    <h2 id="insights-title">Insights de Rendimiento</h2>
    <div class="insights-grid">
      <article class="insight-card" *ngFor="let insight of insights">
        <div class="insight-header">
          <span class="insight-category" [class]="'category-' + insight.category">{{ insight.category }}</span>
          <span class="insight-priority" [attr.aria-label]="'Prioridad: ' + insight.priority">{{ insight.priority }}</span>
        </div>
        <p class="insight-description">{{ insight.description }}</p>
        <div class="insight-metrics" *ngIf="insight.affectedMetrics?.length">
          <span class="metric-tag" *ngFor="let metric of insight.affectedMetrics">
            {{ metric }}
          </span>
        </div>
        <button class="insight-action" (click)="applyInsight(insight)" [attr.aria-label]="'Aplicar sugerencia: ' + insight.description">
          Aplicar sugerencia
        </button>
      </article>
    </div>
  </section>

  <aside class="quick-actions" aria-labelledby="actions-title">
    <h2 id="actions-title" class="sr-only">Acciones rápidas</h2>
    <nav aria-label="Acciones del portal">
      <ul class="actions-list" role="list">
        <li>
          <a href="/transfer" class="action-button" aria-label="Realizar una transferencia">
            <svg width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
            <span>Transferir</span>
          </a>
        </li>
        <li>
          <a href="/payments" class="action-button" aria-label="Ver pagos pendientes">
            <svg width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <span>Pagos</span>
          </a>
        </li>
        <li>
          <a href="/cards" class="action-button" aria-label="Gestionar tarjetas">
            <svg width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              <line x1="16" y1="5" x2="16" y2="19"></line>
            </svg>
            <span>Tarjetas</span>
          </a>
        </li>
        <li>
          <a href="/support" class="action-button" aria-label="Contactar soporte">
            <svg width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Soporte</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>

  <footer class="dashboard-footer" role="contentinfo">
    <p>&copy; 2024 Banco Digitalis. Todos los derechos reservados.</p>
    <nav aria-label="Enlaces del pie de página">
      <ul role="list">
        <li><a href="/privacy">Política de Privacidad</a></li>
        <li><a href="/terms">Términos y Condiciones</a></li>
        <li><a href="/security">Seguridad</a></li>
      </ul>
    </nav>
  </footer>
</section>

// === ARCHIVO: src/app/features/dashboard/dashboard.component.scss ===
@use 'variables' as v;

:host {
  display: block;
  min-height: 100vh;
  background-color: v.$background-primary;
}

.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: v.$spacing-lg v.$spacing-md;
  display: grid;
  grid-template-areas:
    "header header"
    "metrics metrics"
    "content content"
    "insights insights"
    "actions actions"
    "footer footer";
  grid-template-columns: 1fr;
  gap: v.$spacing-xl;

  @media (min-width: 768px) {
    grid-template-areas:
      "header header"
      "metrics metrics"
      "content content"
      "insights insights"
      "actions footer";
    grid-template-columns: 2fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 3fr 1fr;
    padding: v.$spacing-xl v.$spacing-2xl;
  }
}

.dashboard-header {
  grid-area: header;
  text-align: center;
  padding: v.$spacing-lg 0;
  border-bottom: 1px solid v.$border-light;

  h1 {
    font-family: v.$font-family-heading;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: v.$font-weight-bold;
    color: v.$text-primary;
    margin-bottom: v.$spacing-sm;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: v.$font-size-lg;
    color: v.$text-secondary;
    margin: 0;
  }
}

.metrics-summary {
  grid-area: metrics;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: v.$spacing-md;
  padding: v.$spacing-md;
  background: v.$surface-elevated;
  border-radius: v.$border-radius-lg;
  box-shadow: v.$shadow-sm;
}

.metric-card {
  display: flex;
  align-items: center;
  gap: v.$spacing-md;
  padding: v.$spacing-md;
  background: v.$background-primary;
  border-radius: v.$border-radius-md;
  border: 1px solid v.$border-light;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: v.$shadow-md;
  }

  .metric-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: v.$border-radius-full;
    background: v.$primary-light;
    color: v.$primary-color;
    flex-shrink: 0;
  }

  .metric-content {
    display: flex;
    flex-direction: column;
    gap: v.$spacing-xs;
    min-width: 0;
  }

  .metric-label {
    font-size: v.$font-size-sm;
    font-weight: v.$font-weight-medium;
    color: v.$text-tertiary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .metric-value {
    font-family: v.$font-family-mono;
    font-size: v.$font-size-xl;
    font-weight: v.$font-weight-bold;
    color: v.$text-primary;
    line-height: 1.2;
  }

  .metric-rating {
    display: inline-flex;
    align-items: center;
    padding: v.$spacing-xs v.$spacing-sm;
    border-radius: v.$border-radius-sm;
    font-size: v.$font-size-xs;
    font-weight: v.$font-weight-semibold;
    text-transform: uppercase;
    width: fit-content;

    &.rating-good {
      background: v.$success-light;
      color: v.$success-color;
    }

    &.rating-needs-improvement {
      background: v.$warning-light;
      color: v.$warning-color;
    }

    &.rating-poor {
      background: v.$error-light;
      color: v.$error-color;
    }
  }
}

.dashboard-content {
  grid-area: content;

  .section-title {
    font-family: v.$font-family-heading;
    font-size: v.$font-size-2xl;
    font-weight: v.$font-weight-semibold;
    color: v.$text-primary;
    margin-bottom: v.$spacing-lg;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: v.$spacing-lg;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.account-summary,
.recent-transactions {
  background: v.$surface-elevated;
  border-radius: v.$border-radius-lg;
  padding: v.$spacing-lg;
  box-shadow: v.$shadow-sm;

  h3 {
    font-family: v.$font-family-heading;
    font-size: v.$font-size-lg;
    font-weight: v.$font-weight-semibold;
    color: v.$text-primary;
    margin-bottom: v.$spacing-md;
    padding-bottom: v.$spacing-sm;
    border-bottom: 1px solid v.$border-light;
  }
}

.account-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: v.$spacing-sm;
}

.account-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: v.$spacing-md;
  background: v.$background-primary;
  border-radius: v.$border-radius-md;
  border: 1px solid v.$border-light;
  transition: background-color 0.15s ease;

  &:hover {
    background: v.$background-hover;
  }

  .account-info {
    display: flex;
    flex-direction: column;
    gap: v.$spacing-xs;
  }

  .account-name {
    font-weight: v.$font-weight-medium;
    color: v.$text-primary;
  }

  .account-number {
    font-family: v.$font-family-mono;
    font-size: v.$font-size-sm;
    color: v.$text-tertiary;
  }

  .account-balance {
    font-family: v.$font-family-mono;
    font-size: v.$font-size-lg;
    font-weight: v.$font-weight-bold;
    color: v.$success-color;
  }
}

.performance-insights {
  grid-area: insights;

  h2 {
    font-family: v.$font-family-heading;
    font-size: v.$font-size-2xl;
    font-weight: v.$font-weight-semibold;
    color: v.$text-primary;
    margin-bottom: v.$spacing-lg;
  }
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: v.$spacing-md;
}

.insight-card {
  background: v.$surface-elevated;
  border-radius: v.$border-radius-lg;
  padding: v.$spacing-lg;
  box-shadow: v.$shadow-sm;
  border-left: 4px solid v.$primary-color;
  display: flex;
  flex-direction: column;
  gap: v.$spacing-md;

  .insight-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .insight-category {
    font-size: v.$font-size-xs;
    font-weight: v.$font-weight-semibold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: v.$spacing-xs v.$spacing-sm;
    border-radius: v.$border-radius-sm;
    background: v.$primary-light;
    color: v.$primary-color;
  }

  .insight-priority {
    font-size: v.$font-size-xs;
    font-weight: v.$font-weight-medium;
    color: v.$text-tertiary;
  }

  .insight-description {
    font-size: v.$font-size-base;
    color: v.$text-secondary;
    line-height: 1.6;
    margin: 0;
  }

  .insight-metrics {
    display: flex;
    flex-wrap: wrap;
    gap: v.$spacing-xs;

    .metric-tag {
      font-size: v.$font-size-xs;
      padding: v.$spacing-xs v.$spacing-sm;
      background: v.$background-tertiary;
      border-radius: v.$border-radius-sm;
      color: v.$text-tertiary;
    }
  }

  .insight-action {
    align-self: flex-start;
    padding: v.$spacing-sm v.$spacing-md;
    background: v.$primary-color;
    color: v.$white;
    border: none;
    border-radius: v.$border-radius-md;
    font-size: v.$font-size-sm;
    font-weight: v.$font-weight-medium;
    cursor: pointer;
    transition: background-color 0.15s ease, transform 0.1s ease;

    &:hover {
      background: v.$primary-dark;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

.quick-actions {
  grid-area: actions;

  .actions-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: v.$spacing-sm;

    @media (min-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  .action-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: v.$spacing-sm;
    padding: v.$spacing-lg v.$spacing-md;
    background: v.$surface-elevated;
    border: 1px solid v.$border-light;
    border-radius: v.$border-radius-lg;
    color: v.$text-primary;
    text-decoration: none;
    font-size: v.$font-size-sm;
    font-weight: v.$font-weight-medium;
    transition: all 0.2s ease;

    &:hover {
      background: v.$primary-light;
      border-color: v.$primary-color;
      color: v.$primary-color;
      transform: translateY(-2px);
      box-shadow: v.$shadow-md;
    }

    &:active {
      transform: translateY(0);
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
}

.dashboard-footer {
  grid-area: footer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: v.$spacing-md;
  padding-top: v.$spacing-lg;
  border-top: 1px solid v.$border-light;
  text-align: center;

  p {
    font-size: v.$font-size-sm;
    color: v.$text-tertiary;
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: v.$spacing-md;
    flex-wrap: wrap;
    justify-content: center;
  }

  a {
    font-size: v.$font-size-sm;
    color: v.$text-secondary;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: v.$primary-color;
      text-decoration: underline;
    }
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// === ARCHIVO: src/app/features/dashboard/components/transaction-list.component.ts ===
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  currency: string;
  type: 'credit' | 'debit';
  category: string;
  status: 'completed' | 'pending' | 'failed';
  merchantName?: string;
  merchantLogo?: string;
}

interface TransactionDisplayItem extends Transaction {
  formattedAmount: string;
  formattedDate: string;
  isLargeTransaction: boolean;
}

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="transaction-list-container" role="region" aria-label="Lista de transacciones" [attr.aria-busy]="loading">
      <div class="transaction-list-header">
        <span class="header-cell date">Fecha</span>
        <span class="header-cell description">Descripción</span>
        <span class="header-cell amount">Monto</span>
        <span class="header-cell status">Estado</span>
      </div>

      <ng-container *ngIf="!(loading$ | async); else loadingTemplate">
        <cdk-virtual-scroll-viewport
          [itemSize]="itemHeight"
          [minBufferPx]="400"
          [maxBufferPx]="800"
          class="transaction-viewport"
          [class.with-scroll]="displayedTransactions.length > virtualScrollThreshold"
          role="list"
          aria-label="Transacciones">
          <div
            *cdkVirtualFor="let transaction of displayedTransactions; trackBy: trackByTransactionId"
            class="transaction-row"
            [class.credit]="transaction.type === 'credit'"
            [class.debit]="transaction.type === 'debit'"
            [class.large-transaction]="transaction.isLargeTransaction"
            [class.pending]="transaction.status === 'pending'"
            [class.failed]="transaction.status === 'failed'"
            role="listitem"
            (click)="selectTransaction(transaction)"
            (keydown.enter)="selectTransaction(transaction)"
            tabindex="0"
            [attr.aria-label]="'Transacción ' + transaction.description + ' por ' + transaction.formattedAmount">
            <span class="cell date" [attr.aria-label]="'Fecha: ' + transaction.formattedDate">
              {{ transaction.formattedDate }}
            </span>
            <span class="cell description">
              <span class="merchant-name">{{ transaction.merchantName || transaction.description }}</span>
              <span class="category">{{ transaction.category }}</span>
            </span>
            <span class="cell amount" 
                  [attr.aria-label]="'Monto: ' + transaction.formattedAmount"
                  [class.positive]="transaction.type === 'credit'"
                  [class.negative]="transaction.type === 'debit'">
              <span class="amount-prefix">{{ transaction.type === 'credit' ? '+' : '-' }}</span>
              {{ transaction.formattedAmount }}
            </span>
            <span class="cell status" [attr.aria-label]="'Estado: ' + transaction.status">
              <span class="status-badge" [class]="'status-' + transaction.status">
                {{ transaction.status | titlecase }}
              </span>
            </span>
          </div>
        </cdk-virtual-scroll-viewport>

        <div class="pagination-info" *ngIf="totalTransactions > displayedTransactions.length">
          <span>Mostrando {{ displayedTransactions.length }} de {{ totalTransactions }} transacciones</span>
          <button 
            class="load-more-btn" 
            (click)="loadMore()"
            [disabled]="loadingMore$"
            aria-label="Cargar más transacciones">
            {{ loadingMore$ ? 'Cargando...' : 'Cargar más' }}
          </button>
        </div>
      </ng-container>

      <ng-template #loadingTemplate>
        <div class="loading-state" role="status" aria-live="polite">
          <div class="skeleton-row" *ngFor="let i of [1,2,3,4,5]">
            <div class="skeleton skeleton-date"></div>
            <div class="skeleton skeleton-description"></div>
            <div class="skeleton skeleton-amount"></div>
            <div class="skeleton skeleton-status"></div>
          </div>
          <span class="sr-only">Cargando transacciones...</span>
        </div>
      </ng-template>

      <div class="empty-state" *ngIf="!(loading$ | async) && displayedTransactions.length === 0" role="status">
        <svg width="48" height="48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>No se encontraron transacciones</p>
      </div>
    </div>
  `,
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnChanges {
  @Input() set transactions(value: Transaction[]) {
    this.transactionsSubject.next(value || []);
  }

  @Input() loading = false;

  @Output() transactionSelected = new EventEmitter<Transaction>();

  private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  private readonly loadingMoreSubject = new BehaviorSubject<boolean>(false);
  
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly loadingMore$ = this.loadingMoreSubject.asObservable();
  
  readonly displayedTransactions$: Observable<TransactionDisplayItem[]>;
  readonly totalTransactions$: Observable<number>;

  displayedTransactions: TransactionDisplayItem[] = [];
  totalTransactions = 0;

  readonly itemHeight = 72;
  readonly virtualScrollThreshold = 10;
  readonly pageSize = 20;
  private currentPage = 1;

  readonly trackByTransactionId: TrackByFunction<TransactionDisplayItem> = (index, item) => item.id;

  constructor() {
    this.loading$.next(this.loading);

    this.totalTransactions$ = this.transactionsSubject.pipe(
      map(transactions => transactions.length),
      distinctUntilChanged()
    );

    this.displayedTransactions$ = combineLatest([
      this.transactionsSubject,
      this.totalTransactions$
    ]).pipe(
      map(([transactions]) => this.transformTransactions(transactions))
    );
  }

  ngOnInit(): void {
    this.displayedTransactions$.subscribe(transformed => {
      this.displayedTransactions = transformed;
    });

    this.totalTransactions$.subscribe(total => {
      this.totalTransactions = total;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) {
      this.loading$.next(this.loading);
    }
  }

  private transformTransactions(transactions: Transaction[]): TransactionDisplayItem[] {
    return transactions.slice(0, this.currentPage * this.pageSize).map(transaction => ({
      ...transaction,
      formattedAmount: this.formatAmount(transaction.amount, transaction.currency),
      formattedDate: this.formatDate(transaction.date),
      isLargeTransaction: this.isLargeTransaction(transaction.amount)
    }));
  }

  private formatAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency || 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (this.isSameDay(d, today)) {
      return `Hoy, ${this.formatTime(d)}`;
    } else if (this.isSameDay(d, yesterday)) {
      return `Ayer, ${this.formatTime(d)}`;
    } else {
      return d.toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  private isLargeTransaction(amount: number): boolean {
    return amount >= 1000000;
  }

  selectTransaction(transaction: TransactionDisplayItem): void {
    this.transactionSelected.emit(transaction);
  }

  loadMore(): void {
    if (this.loadingMoreSubject.value) {
      return;
    }

    this.loadingMoreSubject.next(true);
    this.currentPage++;

    setTimeout(() => {
      const allTransactions = this.transactionsSubject.value;
      const newTransactions = this.transformTransactions(allTransactions);
      this.displayedTransactions = newTransactions;
      this.loadingMoreSubject.next(false);
    }, 300);
  }
}

// === ARCHIVO: src/app/shared/components/loading-spinner.component.ts ===
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface LoadingSpinnerConfig {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'accent' | 'warn' | 'custom';
  customColor?: string;
  message?: string;
  overlay?: boolean;
  fullscreen?: boolean;
  animationType?: 'spin' | 'pulse' | 'bounce';
  showProgress?: boolean;
  progress?: number;
}

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="loading-container"
      [class.overlay]="config().overlay"
      [class.fullscreen]="config().fullscreen"
      [class.with-message]="config().message">
      <div class="spinner-wrapper">
        <div 
          class="spinner"
          [class.spin]="config().animationType === 'spin'"
          [class.pulse]="config().animationType === 'pulse'"
          [class.bounce]="config().animationType === 'bounce'"
          [class.small]="config().size === 'small'"
          [class.large]="config().size === 'large'"
          [style.--spinner-color]="getCustomColor()">
          <svg viewBox="0 0 50 50" class="spinner-svg">
            <circle 
              cx="25" 
              cy="25" 
              r="20" 
              fill="none" 
              stroke-width="4"
              class="spinner-track">
            </circle>
            <circle 
              cx="25" 
              cy="25" 
              r="20" 
              fill="none" 
              stroke-width="4"
              class="spinner-progress">
            </circle>
          </svg>
        </div>
        @if (config().message) {
          <p class="loading-message" role="status" aria-live="polite">
            {{ config().message }}
          </p>
        }
        @if (config().showProgress && config().progress !== undefined) {
          <div class="progress-container" role="progressbar" [attr.aria-valuenow]="config().progress" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" [style.width.%]="config().progress"></div>
            <span class="progress-text">{{ config().progress }}%</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      box-sizing: border-box;
    }

    .loading-container.overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      z-index: 1000;
    }

    .loading-container.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.95);
      z-index: 9999;
    }

    .spinner-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .spinner {
      width: 48px;
      height: 48px;
      position: relative;
    }

    .spinner.small {
      width: 24px;
      height: 24px;
    }

    .spinner.large {
      width: 72px;
      height: 72px;
    }

    .spinner-svg {
      width: 100%;
      height: 100%;
      animation: rotate 2s linear infinite;
    }

    .spinner-track {
      stroke: #e0e0e0;
    }

    .spinner-progress {
      stroke: var(--spinner-color, #1976d2);
      stroke-linecap: round;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
      100% { transform: rotate(360deg); }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }

    .spinner.spin .spinner-progress {
      animation: dash 1.5s ease-in-out infinite;
    }

    .spinner.pulse .spinner-svg {
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(0.9); opacity: 0.7; }
    }

    .spinner.bounce .spinner-progress {
      animation: bounce 0.8s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .loading-message {
      font-size: 0.875rem;
      color: #666;
      margin: 0;
      text-align: center;
    }

    .progress-container {
      width: 100%;
      max-width: 200px;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #1976d2, #42a5f5);
      transition: width 0.3s ease;
    }

    .progress-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.75rem;
      color: #333;
      font-weight: 500;
    }
  `]
})
export class LoadingSpinnerComponent implements AfterViewInit, OnDestroy {
  @Input()
  set config(value: LoadingSpinnerConfig) {
    this._config.set(value ?? this.getDefaultConfig());
  }

  @Output() readonly loaded = new EventEmitter<void>();

  private readonly _config = signal<LoadingSpinnerConfig>(this.getDefaultConfig());
  private resizeObserver?: ResizeObserver;
  private animationFrameId?: number;

  readonly config = this._config.asReadonly();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeOptimizedRendering();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initializeOptimizedRendering(): void {
    if (typeof requestAnimationFrame === 'undefined') return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.loaded.emit();
    });
  }

  private getDefaultConfig(): LoadingSpinnerConfig {
    return {
      size: 'medium',
      color: 'primary',
      animationType: 'spin',
      overlay: false,
      fullscreen: false,
      showProgress: false,
      progress: 0
    };
  }

  getCustomColor(): string {
    const cfg = this._config();
    if (cfg.color === 'custom' && cfg.customColor) {
      return cfg.customColor;
    }
    const colorMap: Record<string, string> = {
      primary: '#1976d2',
      accent: '#ff4081',
      warn: '#f44336'
    };
    return colorMap[cfg.color || 'primary'] || colorMap.primary;
  }

  updateProgress(value: number): void {
    this._config.update(cfg => ({ ...cfg, progress: Math.min(100, Math.max(0, value)) }));
  }
}

// === ARCHIVO: src/app/features/dashboard/dashboard.routes.ts ===
import { Route } from '@angular/router';
import { inject } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { PerformanceService } from '@app/core/services/performance.service';
import { ImageOptimizationService } from '@app/core/services/image-optimization.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    providers: [
      {
        provide: DashboardService,
        useFactory: () => {
          const performanceService = inject(PerformanceService);
          const imageOptimizationService = inject(ImageOptimizationService);
          return new DashboardService(performanceService, imageOptimizationService);
        }
      }
    ],
    resolve: {
      dashboardData: () => {
        const dashboardService = inject(DashboardService);
        const performanceService = inject(PerformanceService);

        const routeStartTime = performanceService.getAllMetrics().length > 0
          ? performanceService.getCurrentMetrics().lcp
          : 0;

        return dashboardService.loadDashboardData().pipe(
          tap(data => {
            const metrics = performanceService.getAllMetrics();
            if (metrics.length > 0) {
              const currentMetrics = performanceService.getCurrentMetrics();
              console.log(`[Dashboard] Route resolved in ${Date.now() - routeStartTime}ms`);
              console.log(`[Dashboard] LCP at navigation: ${currentMetrics.lcp}ms`);
            }
          }),
          catchError(error => {
            console.error('[Dashboard] Error loading dashboard data:', error);
            return of(null);
          }),
          finalize(() => {
            const allMetrics = performanceService.getAllMetrics();
            if (allMetrics.length > 0) {
              console.log(`[Dashboard] Total metrics collected: ${allMetrics.length}`);
            }
          })
        );
      }
    },
    children: [
      {
        path: 'transactions',
        loadComponent: () => import('./components/transaction-list.component')
          .then(m => m.TransactionListComponent),
        title: 'Transacciones - Portal Banca Digital'
      },
      {
        path: 'accounts',
        loadComponent: () => import('./components/account-summary.component')
          .then(m => m.AccountSummaryComponent),
        title: 'Cuentas - Portal Banca Digital'
      },
      {
        path: 'analytics',
        loadComponent: () => import('./components/analytics-panel.component')
          .then(m => m.AnalyticsPanelComponent),
        title: 'Análisis - Portal Banca Digital'
      }
    ]
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./components/transaction-detail.component')
      .then(m => m.TransactionDetailComponent),
    title: 'Detalle de Transacción - Portal Banca Digital'
  }
];

export interface DashboardResolveData {
  accounts: AccountSummary[];
  recentTransactions: Transaction[];
  notifications: Notification[];
  userPreferences: UserPreferences;
}

export interface AccountSummary {
  id: string;
  type: 'checking' | 'savings' | 'investment' | 'credit';
  name: string;
  balance: number;
  currency: string;
  lastUpdated: Date;
  accountNumber: string;
  availableBalance: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'credit' | 'debit' | 'transfer' | 'payment';
  amount: number;
  currency: string;
  description: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  category: string;
  merchant?: string;
  reference?: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  currency: string;
  notificationsEnabled: boolean;
  biometricAuthEnabled: boolean;
}

// === ARCHIVO: src/styles/configs/variables.scss ===
// Tokens de diseño centralizados para el Portal de Banca Digital
// Uso: @import 'configs/variables';

// ============================================
// COLORES - Paleta principal
// ============================================

// Colores primarios
$color-primary-50: #e3f2fd;
$color-primary-100: #bbdefb;
$color-primary-200: #90caf9;
$color-primary-300: #64b5f6;
$color-primary-400: #42a5f5;
$color-primary-500: #1976d2;
$color-primary-600: #1565c0;
$color-primary-700: #0d47a1;
$color-primary-800: #0a3d91;
$color-primary-900: #072f70;
$color-primary: $color-primary-500;
$color-primary-dark: $color-primary-700;
$color-primary-light: $color-primary-300;

// Colores de acento
$color-accent-50: #fce4ec;
$color-accent-100: #f8bbd0;
$color-accent-200: #f48fb1;
$color-accent-300: #f06292;
$color-accent-400: #ec407a;
$color-accent-500: #e91e63;
$color-accent-600: #d81b60;
$color-accent-700: #c2185b;
$color-accent-800: #ad1457;
$color-accent-900: #880e4f;
$color-accent: $color-accent-500;
$color-accent-dark: $color-accent-700;
$color-accent-light: $color-accent-300;

// Colores de advertencia
$color-warn-50: #ffebee;
$color-warn-100: #ffcdd2;
$color-warn-200: #ef9a9a;
$color-warn-300: #e57373;
$color-warn-400: #ef5350;
$color-warn-500: #f44336;
$color-warn-600: #e53935;
$color-warn-700: #d32f2f;
$color-warn-800: #c62828;
$color-warn-900: #b71c1c;
$color-warn: $color-warn-500;
$color-warn-dark: $color-warn-700;
$color-warn-light: $color-warn-300;

// Colores neutros
$color-gray-50: #fafafa;
$color-gray-100: #f5f5f5;
$color-gray-200: #eeeeee;
$color-gray-300: #e0e0e0;
$color-gray-400: #bdbdbd;
$color-gray-500: #9e9e9e;
$color-gray-600: #757575;
$color-gray-700: #616161;
$color-gray-800: #424242;
$color-gray-900: #212121;

// Colores semánticos
$color-success: #4caf50;
$color-success-light: #81c784;
$color-success-dark: #388e3c;
$color-info: #2196f3;
$color-info-light: #64b5f6;
$color-info-dark: #1976d2;
$color-warning: #ff9800;
$color-warning-light: #ffb74d;
$color-warning-dark: #f57c00;
$color-error: #f44336;
$color-error-light: #e57373;
$color-error-dark: #d32f2f;

// ============================================
// ESPACIADO - Sistema de spacing
// ============================================

$spacing-unit: 8px;
$spacing-xs: $spacing-unit * 0.25;   // 2px
$spacing-sm: $spacing-unit * 0.5;    // 4px
$spacing-md: $spacing-unit;           // 8px
$spacing-lg: $spacing-unit * 2;      // 16px
$spacing-xl: $spacing-unit * 3;      // 24px
$spacing-2xl: $spacing-unit * 4;     // 32px
$spacing-3xl: $spacing-unit * 6;     // 48px
$spacing-4xl: $spacing-unit * 8;     // 64px
$spacing-5xl: $spacing-unit * 12;    // 96px

// ============================================
// TIPOGRAFÍA - Escalera de tamaños
// ============================================

$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-family-monospace: 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;

$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px
$font-size-5xl: 3rem;      // 48px

$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

$line-height-tight: 1.25;
$line-height-base: 1.5;
$line-height-relaxed: 1.75;

$letter-spacing-tight: -0.02em;
$letter-spacing-normal: 0;
$letter-spacing-wide: 0.025em;
$letter-spacing-wider: 0.05em;

// ============================================
// BREAKPOINTS - Puntos de ruptura responsive
// ============================================

$breakpoint-xs: 0;
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$breakpoint-2xl: 1400px;
$breakpoint-3xl: 1600px;

$breakpoints: (
  'xs': $breakpoint-xs,
  'sm': $breakpoint-sm,
  'md': $breakpoint-md,
  'lg': $breakpoint-lg,
  'xl': $breakpoint-xl,
  '2xl': $breakpoint-2xl,
  '3xl': $breakpoint-3xl
);

$container-max-widths: (
  'sm': 540px,
  'md': 720px,
  'lg': 960px,
  'xl': 1140px,
  '2xl': 1320px
);

// ============================================
// SOMBRAS - Sistema de elevaciones
// ============================================

$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
$shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
$shadow-none: 0 0 #0000;

// ============================================
// BORDES - Radios y anchos
// ============================================

$border-radius-sm: 0.25rem;   // 4px
$border-radius-base: 0.375rem; // 6px
$border-radius-md: 0.5rem;    // 8px
$border-radius-lg: 0.75rem;   // 12px
$border-radius-xl: 1rem;      // 16px
$border-radius-2xl: 1.5rem;   // 24px
$border-radius-full: 9999px;

$border-width-1: 1px;
$border-width-2: 2px;
$border-width-3: 3px;
$border-width-4: 4px;
$border-width-5: 5px;

// ============================================
// TRANSICIONES - Duraciones y funciones
// ============================================

$transition-duration-fast: 150ms;
$transition-duration-base: 250ms;
$transition-duration-slow: 350ms;
$transition-duration-slower: 500ms;

$transition-timing-function-ease-in: cubic-bezier(0.4, 0, 1, 1);
$transition-timing-function-ease-out: cubic-bezier(0, 0, 0.2, 1);
$transition-timing-function-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
$transition-timing-function-linear: cubic-bezier(0, 0, 1, 1);

// ============================================
// Z-INDEX - Capas de apilamiento
// ============================================

$z-index-dropdown: 1000;
$z-index-sticky: 1020;
$z-index-fixed: 1030;
$z-index-modal-backdrop: 1040;
$z-index-modal: 1050;
$z-index-popover: 1060;
$z-index-tooltip: 1070;
$z-index-toast: 1080;

// ============================================
// LAYOUT - Anchos y alturas base
// ============================================

$sidebar-width: 280px;
$sidebar-width-collapsed: 72px;
$header-height: 64px;
$footer-height: 60px;
$content-max-width: 1200px;

// ============================================
// ANIMACIONES - Keyframes predefinidos
// ============================================

$animation-fade-in: fadeIn 0.3s ease-out;
$animation-slide-up: slideUp 0.3s ease-out;
$animation-slide-down: slideDown 0.3s ease-out;
$animation-slide-left: slideLeft 0.3s ease-out;
$animation-slide-right: slideRight 0.3s ease-out;
$animation-scale-in: scaleIn 0.2s ease-out;
$animation-spin: spin 1s linear infinite;
$animation-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

// ============================================
// UTILIDADES - Mixins comunes
// ============================================

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@mixin flex-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    $value: map-get($breakpoints, $breakpoint);
    @media (min-width: $value) {
      @content;
    }
  } @else {
    @warn 'Breakpoint "#{$breakpoint}" no encontrado en $breakpoints';
  }
}

@mixin respond-below($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    $value: map-get($breakpoints, $breakpoint);
    @media (max-width: #{$value - 1px}) {
      @content;
    }
  } @else {
    @warn 'Breakpoint "#{$breakpoint}" no encontrado en $breakpoints';
  }
}

@mixin card-base {
  background: white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-base;
  padding: $spacing-lg;
}

@mixin button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-sm $spacing-lg;
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  line-height: $line-height-base;
  border-radius: $border-radius-md;
  cursor: pointer;
  transition: all $transition-duration-base $transition-timing-function-ease-in-out;
  border: none;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba($color-primary, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

// === ARCHIVO: src/assets/images/.gitkeep ===
// Este archivo mantiene la estructura del directorio en control de versiones
// Los archivos de imagen se almacenan en este directorio
// Formatos recomendados: WebP para imágenes con transparencia, JPEG para fotos
// El pipeline de build optimiza automáticamente las imágenes en producción
```

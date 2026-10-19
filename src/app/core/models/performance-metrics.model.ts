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
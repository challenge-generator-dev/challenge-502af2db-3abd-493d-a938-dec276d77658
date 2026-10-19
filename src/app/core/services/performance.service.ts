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
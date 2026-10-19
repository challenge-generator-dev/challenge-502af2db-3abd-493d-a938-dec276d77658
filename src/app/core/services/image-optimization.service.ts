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
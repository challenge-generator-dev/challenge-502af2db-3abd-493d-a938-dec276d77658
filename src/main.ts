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
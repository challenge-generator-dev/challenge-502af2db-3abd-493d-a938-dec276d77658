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
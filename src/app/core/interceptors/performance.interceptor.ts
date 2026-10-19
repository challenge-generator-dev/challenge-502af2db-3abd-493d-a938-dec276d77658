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
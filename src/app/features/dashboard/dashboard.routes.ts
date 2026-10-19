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
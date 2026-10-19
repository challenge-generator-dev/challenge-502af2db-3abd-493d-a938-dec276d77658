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
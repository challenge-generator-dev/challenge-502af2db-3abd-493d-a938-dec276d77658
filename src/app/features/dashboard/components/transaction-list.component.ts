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
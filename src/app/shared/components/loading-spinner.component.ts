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
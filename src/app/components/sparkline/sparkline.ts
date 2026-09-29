import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-sparkline',
  standalone: true,
  template: `
    <svg
      [attr.viewBox]="'0 0 ' + width() + ' ' + height()"
      class="w-full h-full overflow-hidden"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient [id]="gradientId()" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" [attr.stop-color]="color()" stop-opacity="0.3" />
          <stop offset="100%" [attr.stop-color]="color()" stop-opacity="0.0" />
        </linearGradient>
      </defs>

      <!-- Area Path (Gradient Fill) -->
      @if (areaPath()) {
        <path [attr.d]="areaPath()" [attr.fill]="'url(#' + gradientId() + ')'" />
      }

      <!-- Stroke Line -->
      @if (linePath()) {
        <path
          [attr.d]="linePath()"
          fill="none"
          [attr.stroke]="color()"
          stroke-width="2"
          stroke-linecap="butt"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      }
    </svg>
  `
})
export class SparklineComponent {
  data = input<number[]>();
  color = input<string>('#3b82f6');
  width = input<number>(120);
  height = input<number>(40);

  readonly gradientId = computed(() => `sparkline-grad-${Math.random().toString(36).substring(2, 9)}`);

  private points = computed(() => {
    const vals = this.data();
    if (!vals || vals.length < 2) return [];

    const w = this.width();
    const h = this.height();
    const yPadding = 3; // Prevents top/bottom stroke clipping

    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min === 0 ? 1 : max - min;
    const usableHeight = h - yPadding * 2;

    return vals.map((val, index) => {
      // Map x across full width [0, w]
      const x = (index / (vals.length - 1)) * w;
      const normalizedY = (val - min) / range;
      const y = h - yPadding - (normalizedY * usableHeight);
      return { x, y };
    });
  });

  // Stroke path: M x0 y0 L x1 y1 ... L xN yN
  readonly linePath = computed(() => {
    const pts = this.points();
    if (pts.length < 2) return '';
    return pts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`).join(' ');
  });

  // Area path: M x0 h L x0 y0 ... L xN yN L xN h Z
  readonly areaPath = computed(() => {
    const pts = this.points();
    if (pts.length < 2) return '';
    const first = pts[0];
    const last = pts[pts.length - 1];
    const h = this.height();

    const linePoints = pts.map(p => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');

    // Bottom-left -> Top-left -> Line points -> Bottom-right -> Close
    return `M ${first.x.toFixed(2)} ${h} ${linePoints} L ${last.x.toFixed(2)} ${h} Z`;
  });
}

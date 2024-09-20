import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li *ngFor="let breadcrumb of breadcrumbs; let last = last; let i = index">
          <ng-container *ngIf="!last; else lastBreadcrumb">
            <a [routerLink]="breadcrumb.url" [class.active]="i < activeIndex">{{ breadcrumb.label }}</a>
            <mat-icon>chevron_right</mat-icon>
          </ng-container>
          <ng-template #lastBreadcrumb>
            <span>{{ breadcrumb.label }}</span>
          </ng-template>
        </li>
      </ol>
    </nav>
  `,
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Electronics', url: '/products/electronics' },
    { label: 'Mobile Phones', url: '/products/electronics/phones' }
  ];

  activeIndex: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveIndex(event.url);
      }
    });
    this.updateActiveIndex(this.router.url);
  }

  updateActiveIndex(currentUrl: string) {
    const index = this.breadcrumbs.findIndex(b => currentUrl.startsWith(b.url));
    this.activeIndex = index !== -1 ? index : 0;
  }
}

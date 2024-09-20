// app.component.ts
import { Component } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Breadcrumb Standalone Example';
}
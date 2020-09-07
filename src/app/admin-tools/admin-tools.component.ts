import {Component} from '@angular/core';

@Component({
  selector: 'app-client-management-root',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>`,
  styles: [`
    .container {
      margin: 1rem;
    }
  `]
})
export class AdminToolsComponent {
}

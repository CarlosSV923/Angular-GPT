import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarMenuItemComponent } from '../../components/side-bar-menu-item/side-bar-menu-item.component';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-dashboard.layout',
  imports: [
    CommonModule,
    RouterModule,
    SideBarMenuItemComponent,
  ],
  templateUrl: './dashboard.layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  public routes = routes[0].children?.filter(route => route.data) || [];

 }

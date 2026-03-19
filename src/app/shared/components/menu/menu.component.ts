import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

export interface MenuInterface {
    name: string;
    menuItems: MenuItemInterface[];
}
export interface MenuItemInterface {
    label: string;
    icon: string;
    route: string;
}
@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
    menuConfig = input.required<MenuInterface>();
}

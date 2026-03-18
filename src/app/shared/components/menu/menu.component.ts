import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuItems = [
    { label: 'Accueil', icon: 'home', route: '/party' },
    { label: 'Joueurs', icon: 'person', route: '/players' },
    { label: 'Jeux', icon: 'sports_esports', route: '/games' },
    { label: 'Gages', icon: 'local_bar', route: '/gages' }
  ];
}

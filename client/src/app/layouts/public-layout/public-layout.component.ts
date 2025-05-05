import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LucideAngularModule, Menu, X, Globe, Send, Shield, Smile } from 'lucide-angular';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, RouterLink, FormsModule, LucideAngularModule],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {
  readonly MenuIcon = Menu;
  readonly CloseIcon = X;
  readonly GlobeIcon = Globe;
  readonly SendIcon = Send;
  readonly ShieldIcon = Shield;
  readonly SmileIcon = Smile;

  menuOpen = false;
  searchQuery = '';

  constructor(private router: Router) {}

  dropdowns = {
    customerService: false,
    myAccount: false,
    aboutUs: false,
  };

  toggleDropdown(section: 'customerService' | 'myAccount' | 'aboutUs') {
    this.dropdowns[section] = !this.dropdowns[section];
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onSearch(event: Event) {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }
}


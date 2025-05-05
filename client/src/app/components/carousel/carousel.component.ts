import { Component, Input } from '@angular/core';
import { Product } from '../../types/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  @Input() products: Product[] = [];

  currentIndex: number = 0;

  get currentSlide(): Product[] {
    const start = this.currentIndex * 3;
    return this.products.slice(start, start + 3);
  }

  goToNext() {
    if ((this.currentIndex + 1) * 3 < this.products.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.floor(this.products.length / 3);
    }
  }
}

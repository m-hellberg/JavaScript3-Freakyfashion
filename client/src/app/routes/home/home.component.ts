import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { Product } from '../../types/Product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductGridComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  products: Product[] = [];
  popularProducts: Product[] = [];

  isPlaying = true;
  isMuted = true;

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;

      this.popularProducts = this.products.filter(p => p.isPopular).slice(0, 8);
    });
  }

  myFunction(message: string) {
    console.log(message);
  }

  ngAfterViewInit(): void {
    if (this.heroVideo) {
      this.heroVideo.nativeElement.muted = true;
    }
  }

  togglePlayPause(video: HTMLVideoElement): void {
    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  toggleMute(video: HTMLVideoElement): void {
    video.muted = !video.muted;
    this.isMuted = video.muted;
  }

}

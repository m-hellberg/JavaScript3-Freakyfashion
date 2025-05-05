import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './routes/home/home.component';
import { ProductDetailsComponent } from './routes/product-details/product-details.component';
import { BasketComponent } from './routes/basket/basket.component';
import { CheckoutComponent } from './routes/checkout/checkout.component';
import { SearchComponent } from './routes/search/search.component';
import { AllProductsComponent } from './routes/all-products/all-products.component';
import { AboutUsComponent } from './routes/about-us/about-us.component';
import { DashboardComponent } from './routes/admin/dashboard/dashboard.component';
import { AdminProductsComponent } from './routes/admin/admin-products/admin-products.component';
import { NewProductComponent } from './routes/admin/new-product/new-product.component';
import { OrderManagementComponent } from './routes/admin/order-management/order-management.component';


export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products/:slug', component: ProductDetailsComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'search', component: SearchComponent },
      { path: 'all-products', component: AllProductsComponent },
      { path: 'about-us', component: AboutUsComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'products/new', component: NewProductComponent },
      { path: 'order-management', component: OrderManagementComponent },
      // { path: 'admin/analytics', component: AnalyticsComponent },
      // { path: 'admin/settings', component: SettingsComponent },
      // { path: 'admin/support', component: SupportComponent },
    ],
  },
];

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-badge.component.html',
  styleUrl: './new-badge.component.css',
})
export class NewBadgeComponent {
  @Input() isNew: number = 0;
}

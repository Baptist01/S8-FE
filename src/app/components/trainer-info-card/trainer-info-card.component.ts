import { Component, Input } from '@angular/core';
import { TrainerInfo } from '../../interfaces/trainer-info.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-trainer-info-card',
  imports: [NgIf],
  templateUrl: './trainer-info-card.component.html',
  styleUrl: './trainer-info-card.component.css',
  standalone: true,
})
export class TrainerInfoCardComponent {
  @Input() trainer!: TrainerInfo;
}

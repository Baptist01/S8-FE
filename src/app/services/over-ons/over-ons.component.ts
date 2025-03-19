import { Component } from '@angular/core';
import { TrainerInfo } from '../../interfaces/trainer-info.interface';

@Component({
  selector: 'app-over-ons',
  templateUrl: './over-ons.component.html',
  styleUrls: ['./over-ons.component.css'],
  standalone: false,
})
export class OverOnsComponent {
  trainers: TrainerInfo[] = [
    {
      image: 'assets/Kevin.jpg',
      name: 'Kevin Zwennicker',
      role: 'Eigenaar, Allround trainer',
    },
    {
      image: 'assets/placeholder_person.svg',
      name: 'Bobbi Demes',
      role: 'Personal Trainer ladies + Small Group, Bootcamp Instructrice, Administratie.',
    },
    {
      image: 'assets/placeholder_person.svg',
      name: 'Diego Zwennicker',
      role: 'Bokstrainer, Guys Only + Mix Group, Administratie.',
    },
    {
      image: 'assets/placeholder_person.svg',
      name: 'Bogdan Cinezan',
      role: 'Bokstrainer, Guys Only + Mix Group.',
    },
    {
      image: 'assets/placeholder_person.svg',
      name: 'Tineke van den Boom',
      role: 'Bokstrainer, Ladies Only + Mix Group, Running.',
    },
  ];
}

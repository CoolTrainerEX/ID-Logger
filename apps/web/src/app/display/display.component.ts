import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-display',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
})
export class DisplayComponent {
  faAngleDoubleDown = faAngleDoubleDown;
}

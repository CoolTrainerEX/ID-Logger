import { Component, ElementRef, ViewChild } from '@angular/core';
import { LogService } from '../log.service';
import { CardMessage } from '../card-message';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  id = '';
  message = CardMessage.IN;
  @ViewChild('dialog') dialog!: ElementRef;

  constructor(private readonly logService: LogService) {
    logService.getLastId.subscribe((value) => {
      this.id = value;
      this.message = logService.getMessage;
      this.dialog.nativeElement.show();

      setTimeout(() => {
        this.dialog.nativeElement.close();
      }, 1000);
    });
  }
}

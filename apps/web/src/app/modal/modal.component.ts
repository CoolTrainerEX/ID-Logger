import { Component, ElementRef, ViewChild } from '@angular/core';
import { LogService } from '../log.service';
import { CardMessage } from '../card-message';

/**
 * The component which shows the popup modal using data from LogService
 *
 * @author CoolTrainerEX
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
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

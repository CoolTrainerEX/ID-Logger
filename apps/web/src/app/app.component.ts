import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LogComponent } from './log/log.component';
import { LogService } from './log.service';
import { DisplayComponent } from './display/display.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ModalComponent, LogComponent, DisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'ID Logger';

  @ViewChild('input') private readonly input!: ElementRef;

  constructor(private readonly logService: LogService) {}

  ngAfterViewInit(): void {
    this.focus();
  }

  /**
   * This function adds the input to the log at the press of the return key.
   * @param event the keyboard input event
   */
  log(event: KeyboardEvent): void {
    if (event.key == 'Enter') {
      this.logService.setLastId = this.input.nativeElement.value;
      this.input.nativeElement.value = '';
    }
  }

  /**
   * This function focuses the input field.
   */
  focus(): void {
    this.input.nativeElement.focus();
  }
}

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './card/card.component';
import { LogComponent } from './log/log.component';
import { LogService } from './log.service';
import { DisplayComponent } from './display/display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, LogComponent, DisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'ID Logger';

  @ViewChild('input') input!: ElementRef;

  constructor(private readonly logService: LogService) {}

  ngAfterViewInit(): void {
    this.focus();
  }

  log(event: KeyboardEvent): void {
    if (event.key == 'Enter') {
      this.logService.setLastId = this.input.nativeElement.value;
      this.input.nativeElement.value = '';
    }
  }

  focus(): void {
    this.input.nativeElement.focus();
  }
}

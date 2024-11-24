import { Component } from '@angular/core';
import { LogService } from '../log.service';
import { Log } from '../log';
import { DecimalPipe } from '@angular/common';

/**
 * The component which shows the logs on-screen.
 *
 * @author CoolTrainerEX
 */
@Component({
  selector: 'app-log',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent {
  private logs: Log[];

  constructor(private readonly logService: LogService) {
    this.logs = logService.getLogs;
  }

  /**
   * @returns the array of logs in reveres order
   */
  public get getLogs(): Log[] {
    return [...this.logs]
      .sort(
        (a, b) =>
          (a.timeOut?.getTime() ?? a.timeIn.getTime()) -
          (b.timeOut?.getTime() ?? b.timeIn.getTime()),
      )
      .reverse();
  }
}

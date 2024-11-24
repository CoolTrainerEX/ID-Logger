import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Log } from './log';
import { CardMessage } from './card-message';

/**
 * A service that handles logic for adding and updating logs, as well as emitting observable events for modal display.
 *
 * @author CoolTrainerEX
 */
@Injectable({
  providedIn: 'root',
})
export class LogService {
  private lastIdObservable: BehaviorSubject<string>;
  private logs: Log[] = [];
  private message = CardMessage.IN;

  constructor() {
    this.lastIdObservable = new BehaviorSubject<string>('');
  }

  /**
   * @returns the observable object of the last ID to display on the modal.
   */
  public get getLastId(): BehaviorSubject<string> {
    return this.lastIdObservable;
  }

  /**
   * A setter that adds a new entry or places a timeOut on an existing log, then emitting an observable event to display the modal.
   *
   * @param id the ID input
   */
  public set setLastId(id: string) {
    const time = new Date();
    const log = this.logs.find(
      (value) =>
        value.id == id &&
        value.timeOut == null &&
        value.timeIn.getDate == time.getDate,
    );

    if (log === undefined) {
      this.logs.push({ id, timeIn: new Date(), timeOut: null });
      this.message = CardMessage.IN;
    } else if (time.getTime() - log.timeIn.getTime() < 5000) {
      this.message = CardMessage.COOLDOWN;
    } else {
      log.timeOut = time;
      this.message = CardMessage.OUT;
    }

    // if (true) this.message = CardMessage.COMPLETE;

    this.lastIdObservable.next(id);
  }

  /**
   * @returns the array of logs
   */
  public get getLogs(): Log[] {
    return this.logs;
  }

  /**
   * @returns the message to display on the modal
   */
  public get getMessage(): number {
    return this.message;
  }
}

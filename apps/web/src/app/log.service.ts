import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Log } from './log';
import { CardMessage } from './card-message';

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

  public get getLastId(): BehaviorSubject<string> {
    return this.lastIdObservable;
  }

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

  public get getLogs(): Log[] {
    return this.logs;
  }

  public get getMessage(): number {
    return this.message;
  }
}

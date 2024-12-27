import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { CursorPosition } from '../models/cursor.model';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  private cursorPosition = new BehaviorSubject<CursorPosition>({ x: 0, y: 0 });
  cursorPosition$ = this.cursorPosition.asObservable();
  private autoMoveInterval: any;
  private isAway = false;

  startAutoMove() {
    this.isAway = true;
    this.autoMoveInterval = interval(3000).subscribe(() => {
      if (this.isAway) {
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        this.updatePosition(randomX, randomY);
      }
    });
  }

  stopAutoMove() {
    this.isAway = false;
    if (this.autoMoveInterval) {
      this.autoMoveInterval.unsubscribe();
    }
  }

  updatePosition(x: number, y: number) {
    this.cursorPosition.next({ x, y });
  }
}
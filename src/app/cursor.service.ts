import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CursorPosition {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  private cursorPosition = new BehaviorSubject<CursorPosition>({ x: 0, y: 0 });
  cursorPosition$ = this.cursorPosition.asObservable();

  updatePosition(x: number, y: number) {
    this.cursorPosition.next({ x, y });
  }

  moveToPosition(x: number, y: number) {
    this.cursorPosition.next({ x, y });
  }
}
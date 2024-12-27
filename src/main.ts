import { Component, HostListener, OnDestroy } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CursorService } from './app/services/cursor.service';
import { CursorComponent } from './app/components/cursor.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, CursorComponent],
  template: `
    <div class="app-container">
      <h1>Auto-Moving Cursor</h1>
      <p>Status: {{ isAway ? 'Away' : 'Active' }}</p>
      <app-cursor [position]="(cursorPosition$ | async) ?? { x: 0, y: 0 }"/>
    </div>
  `,
  styles: [`
    .app-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 2rem;
      background-color: #f0f0f0;
    }
  `]
})
export class App implements OnDestroy {
  cursorPosition$ = this.cursorService.cursorPosition$;
  isAway = false;
  private activityTimeout: any;

  constructor(private cursorService: CursorService) {
    this.startActivityTimer();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorService.updatePosition(event.clientX, event.clientY);
    this.resetActivityTimer();
  }

  private startActivityTimer() {
    this.activityTimeout = setTimeout(() => {
      this.isAway = true;
      this.cursorService.startAutoMove();
    }, 3000);
  }

  private resetActivityTimer() {
    if (this.isAway) {
      this.isAway = false;
      this.cursorService.stopAutoMove();
    }
    clearTimeout(this.activityTimeout);
    this.startActivityTimer();
  }

  ngOnDestroy() {
    clearTimeout(this.activityTimeout);
    this.cursorService.stopAutoMove();
  }
}

bootstrapApplication(App);
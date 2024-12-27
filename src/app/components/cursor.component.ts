import { Component, Input } from '@angular/core';
import { CursorPosition } from '../models/cursor.model';

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: `
    <div 
      class="custom-cursor"
      [style.transform]="'translate(' + position.x + 'px, ' + position.y + 'px)'">
    </div>
  `
})
export class CursorComponent {
  @Input() position: CursorPosition = { x: 0, y: 0 };
}
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input() player!: 'me' | 'computer';
  rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((v, i) => i.toString(16));
  constructor(private game: GameService) {
    // console.log(this.rows);
  }

  action(e: MouseEvent) {
    const target = e.target as HTMLTableCellElement;
    if (target.hasAttribute('ship') || this.game.allMyShipsSet(this.player)) {
      return;
    }
    // console.log(target.id, target);
    this.game.placeShip(target, this.player);
  }
}

import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  rows = new Array(12);
  constructor(private game: GameService) {}

  action(e: MouseEvent) {
    const target = e.target as HTMLTableCellElement;
    if (target.hasAttribute('ship')) {
      return;
    }
    console.log(target.id, target);
    this.game.placeShip(target);
  }
}

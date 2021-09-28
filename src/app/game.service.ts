import { Injectable } from '@angular/core';
import { Ship } from './ship.class';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  indexOfShipWhileSetup = 0;
  shipLenth = [5, 4, 3, 2];
  player: 'me' | 'C' = 'me';
  myShips: Ship[] = this.shipLenth.map((length) => new Ship(length));
  computerShips: Ship[] = this.shipLenth.map((length) => new Ship(length));
  constructor() {}

  placeShip(elem: HTMLTableCellElement) {
    let shipList = this.player === 'me' ? this.myShips : this.computerShips;
    shipList[this.indexOfShipWhileSetup].addTile(elem);
    if (shipList[this.indexOfShipWhileSetup].isReady()) {
      this.indexOfShipWhileSetup++;
      if (this.indexOfShipWhileSetup >= shipList.length) {
        this.indexOfShipWhileSetup = 0;
      }
    }
  }

  readyToPlay() {
    return (
      this.myShips.every((ship) => ship.isReady()) &&
      this.computerShips.every((ship) => ship.isReady())
    );
  }
}

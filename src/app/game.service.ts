import { Injectable } from '@angular/core';
import { Ship } from './ship.class';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  indexOfShipWhileSetup = 0;
  shipLenth = [5, 4, 3, 2];
  myShips: Ship[] = this.shipLenth.map((length) => new Ship(length));
  computerShips: Ship[] = this.shipLenth.map((length) => new Ship(length));
  constructor() {}

  placeShip(elem: HTMLTableCellElement, player: 'me' | 'computer') {
    let shipList = player === 'me' ? this.myShips : this.computerShips;
    shipList[this.indexOfShipWhileSetup].addTile(elem);
    if (shipList[this.indexOfShipWhileSetup].isReady()) {
      this.indexOfShipWhileSetup++;
      if (this.indexOfShipWhileSetup >= shipList.length) {
        this.indexOfShipWhileSetup = 0;
      }
    }
  }

  allMyShipsSet(player: 'me' | 'computer'): boolean {
    return player === 'me'
      ? this.myShips.every((ship) => ship.isReady())
      : this.computerShips.every((ship) => ship.isReady());
  }

  readyToPlay() {
    return (
      this.myShips.every((ship) => ship.isReady()) &&
      this.computerShips.every((ship) => ship.isReady())
    );
  }
}

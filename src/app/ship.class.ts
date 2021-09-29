import {
  getValidCords,
  isEnoughSpaceArround,
  isNoSpaceBot,
  isNoSpaceLeft,
  isNoSpaceRight,
  isNoSpaceTop,
} from './position.utils';

export class Ship {
  coords: string[] = [];
  hits: number = 0;
  tiles: HTMLTableCellElement[] = [];
  orientation!: 'h' | 'v';
  validNextCoords: string[] = [];

  constructor(private length: number) {}

  addTile(tile: HTMLTableCellElement) {
    if (this.isValidTile(tile.id)) {
      tile.setAttribute('ship', String(this.length));
      this.tiles.push(tile);
      this.coords.push(tile.id);
      this.setOrientation();
      this.setValidNextCoords();
      if (this.isReady()) {
        this.tiles
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .forEach((tile: HTMLTableCellElement, i: number) => {
            if (i === 0) {
              tile.classList.add('start_' + this.orientation);
            } else if (i === this.tiles.length - 1) {
              tile.classList.add('end_' + this.orientation);
            } else {
              tile.classList.add('body_' + this.orientation);
            }
          });
      }
    }
    // console.log(this.tiles.sort((a, b) => (a.id > b.id ? 1 : -1)));
  }

  isHit(id: string) {
    if (this.coords.includes(id)) {
      this.hits++;
      this.tiles.find((tile) => tile.id === id)?.classList.add('hit');
      if (this.isDestroyed()) {
        this.tiles.forEach((tile) => tile.classList.add('destroyed'));
      }
    }
    return this.coords.includes(id);
  }

  isDestroyed() {
    return this.hits === this.length;
  }

  isReady() {
    return this.tiles.length === this.length;
  }

  isValidTile(id: string) {
    return this.validNextCoords.length === 0
      ? true
      : this.validNextCoords.includes(id);
  }

  setValidNextCoords() {
    if (this.isReady()) {
      this.validNextCoords = [];
    } else if (this.coords.length === 1) {
      const [r, c] = this.coords[0].split('_').map((s) => parseInt(s, 16));
      if (isEnoughSpaceArround(r, c)) {
        this.validNextCoords = getValidCords('none', r, c, 'none');
      } else if (isNoSpaceLeft(r, c)) {
        this.validNextCoords = getValidCords('l', r, c, 'none');
      } else if (isNoSpaceRight(r, c)) {
        this.validNextCoords = getValidCords('r', r, c, 'none');
      } else if (isNoSpaceTop(r, c)) {
        this.validNextCoords = getValidCords('t', r, c, 'none');
      } else if (isNoSpaceBot(r, c)) {
        this.validNextCoords = getValidCords('b', r, c, 'none');
      }
    } else {
      const coords = this.coords.sort();
      const [fr, fc] = coords[0].split('_').map((s) => parseInt(s, 16));
      const [lr, lc] = coords[this.coords.length - 1]
        .split('_')
        .map((s) => parseInt(s, 16));
      const limit: ('l' | 'r' | 't' | 'b')[] =
        this.orientation === 'h' ? ['r', 'l'] : ['b', 't'];
      this.validNextCoords = [
        ...getValidCords(limit[0], fr, fc, this.orientation),
        ...getValidCords(limit[1], lr, lc, this.orientation),
      ];
    }
    // console.log(this.validNextCoords);
  }

  setOrientation() {
    if (this.coords.length === 2) {
      const fr = this.coords[0].split('_')[0];
      const sr = this.coords[1].split('_')[0];
      this.orientation = fr === sr ? 'h' : 'v';
    }
  }
}

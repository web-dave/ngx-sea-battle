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
    }
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
    const [fr, fc] = this.coords[0].split('_').map((s) => Number(s));
    if (this.coords.length === 1) {
      if (isEnoughSpaceArround(fr, fc)) {
        this.validNextCoords = getValidCords('none', fr, fc, 'none');
      } else if (isNoSpaceLeft(fr, fc)) {
        this.validNextCoords = getValidCords('l', fr, fc, 'none');
      } else if (isNoSpaceRight(fr, fc)) {
        this.validNextCoords = getValidCords('r', fr, fc, 'none');
      } else if (isNoSpaceTop(fr, fc)) {
        this.validNextCoords = getValidCords('t', fr, fc, 'none');
      } else if (isNoSpaceBot(fr, fc)) {
        this.validNextCoords = getValidCords('b', fr, fc, 'none');
      }
      console.log(this.coords[0], this.validNextCoords);
    } else {
      const [lr, lc] = this.coords[this.coords.length - 1]
        .split('_')
        .map((s) => Number(s));
      const limit: ('l' | 'r' | 't' | 'b')[] =
        this.orientation === 'h' ? ['r', 'l'] : ['b', 't'];
      this.validNextCoords = [
        ...getValidCords(limit[0], fr, fc, this.orientation),
        ...getValidCords(limit[1], fr, fc, this.orientation),
      ];
    }
  }

  setOrientation() {
    if (this.coords.length === 2) {
      const fr = this.coords[0].split('_')[0];
      const sr = this.coords[1].split('_')[0];
      this.orientation = fr === sr ? 'h' : 'v';
    }
  }
}

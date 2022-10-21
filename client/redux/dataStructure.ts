import { PositionType } from '../../utils/types';

export class Player {
  num: number;

  name: string;

  position: PositionType;

  constructor(num: number, name: string, position: PositionType) {
    this.num = num;
    this.name = name;
    this.position = position;
  }
}

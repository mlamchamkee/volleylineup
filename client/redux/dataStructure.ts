import { PositionType } from '../../types';

export class Player {
  id: number;

  name: string;

  position: PositionType;

  constructor(id: number, name: string, position: PositionType) {
    this.id = id;
    this.name = name;
    this.position = position;
  }
}

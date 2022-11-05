type PositionType = 'S' | 'MB' | 'OH' | 'OPP' | 'UTL' | 'LIB' | 'DS';
// export default class Player {
//   num: number;

//   name: string;

//   position: PositionType;

//   constructor(num: number, name: string, position: PositionType) {
//     this.num = num;
//     this.name = name;
//     this.position = position;
//   }
// }

export default function player(num: number, name: string, position: PositionType) {
  return (
    {
      num,
      name,
      position,
    }
  );
}

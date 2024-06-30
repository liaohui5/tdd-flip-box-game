import { type GameMap } from "@/store/map";

const firstLevelGameData: GameMap = [
  // 第一关
  [1, 0, 1],
  [0, 0, 0],
  [1, 0, 1],
];

const secondLevelGameData: GameMap = [
  // 第一关
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

export const gameDatas: Array<GameMap> = [
  firstLevelGameData,
  secondLevelGameData,
];

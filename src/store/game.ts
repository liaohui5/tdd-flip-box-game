import { defineStore } from "pinia";
import { reactive } from "vue";
import { useMapStore, type GameMap, MapBlockState } from "@/store/map";

export interface GameData {
  maps: Array<GameMap>;
  steps: number;
  level: number;
  levelPassed: boolean;
}

export const useGameStore = defineStore("game", () => {
  const mapStore = useMapStore();
  const data = reactive<GameData>({
    maps: [],
    steps: 0,
    level: 0,
    levelPassed: false,
  });

  function _initLevelGameData() {
    data.levelPassed = false;
    data.steps = 0;
    // for restart game, ensure the level map is not referenced maps item
    const levelMap = JSON.parse(JSON.stringify(data.maps[data.level]));
    mapStore.initMap(levelMap);
  }

  function setupGame(maps: GameMap[]) {
    data.maps = maps;
    _initLevelGameData();
  }

  function toNextLevel() {
    data.level += 1;
    _initLevelGameData();
  }

  function restartGame() {
    _initLevelGameData();
  }

  function detectionGameLevelPassed(): boolean {
    const isPassed = mapStore.map.every((row) => {
      return row.every((block) => block === MapBlockState.NEGATIVE);
    });
    data.steps += 1;
    data.levelPassed = isPassed;
    return isPassed;
  }

  return {
    data,
    restartGame,
    setupGame,
    toNextLevel,
    detectionGameLevelPassed,
  };
});

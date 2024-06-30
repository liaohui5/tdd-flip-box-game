import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useGameStore } from "@/store/game";
import { useMapStore, type GameMap } from "@/store/map";

const firstLevelGameData: GameMap = [
  [1, 0, 1],
  [0, 0, 0],
  [1, 0, 1],
];

const secondLevelGameData: GameMap = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const gameDatas = [firstLevelGameData, secondLevelGameData];

describe("game store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should setup game", () => {
    const { setupGame, data } = useGameStore();
    setupGame(gameDatas);

    expect(data.maps).toEqual(gameDatas);
  });

  it("should be change to next level", () => {
    const { setupGame, toNextLevel } = useGameStore();
    setupGame(gameDatas);

    const { map } = useMapStore();

    expect(map).toEqual(firstLevelGameData);

    toNextLevel();

    expect(map).toEqual(secondLevelGameData);
  });

  it("should be count steps when delection game level passed", () => {
    const { setupGame, data, detectionGameLevelPassed } = useGameStore();
    setupGame(gameDatas);
    detectionGameLevelPassed();
    detectionGameLevelPassed();

    expect(data.steps).toBe(2);
  });

  it("should be passed level game", () => {
    const { setupGame, detectionGameLevelPassed } = useGameStore();
    setupGame(gameDatas);

    const { flip } = useMapStore();
    flip({ rowIndex: 1, colIndex: 1 });

    expect(detectionGameLevelPassed()).toBe(true);
  });
});

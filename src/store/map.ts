import { defineStore } from "pinia";
import { reactive } from "vue";
import { useEditorStore } from "./editor";

export enum MapBlockState {
  POSITIVE = 0,
  NEGATIVE = 1,
}
export type GameMap = Array<MapBlockState[]>;

export interface MapBlockPosition {
  rowIndex: number;
  colIndex: number;
}

export const useMapStore = defineStore("map", () => {
  const map = reactive<GameMap>([]);

  function initMap(newMap: GameMap) {
    map.splice(0, map.length, ...newMap);
  }

  function hasBlockInPos(pos: MapBlockPosition): boolean {
    const row = map[pos.rowIndex];
    return Array.isArray(row) && typeof row[pos.colIndex] === "number";
  }

  function getMapBlockByPos(pos: MapBlockPosition) {
    return map[pos.rowIndex][pos.colIndex];
  }

  function setMapBlockByPos(pos: MapBlockPosition, state: MapBlockState) {
    map[pos.rowIndex][pos.colIndex] = state;
  }

  function toggleBlockState(pos: MapBlockPosition) {
    if (!hasBlockInPos(pos)) {
      return;
    }
    const oldState = getMapBlockByPos(pos);
    const newState = oldState ^ 1; // 1 ^ 1 or 0 ^ 1
    setMapBlockByPos(pos, newState);
  }

  function flip(pos: MapBlockPosition) {
    const upPos = {
      rowIndex: pos.rowIndex - 1,
      colIndex: pos.colIndex,
    };

    const downPos = {
      colIndex: pos.colIndex,
      rowIndex: pos.rowIndex + 1,
    };

    const leftPos = {
      rowIndex: pos.rowIndex,
      colIndex: pos.colIndex - 1,
    };

    const rightPos = {
      rowIndex: pos.rowIndex,
      colIndex: pos.colIndex + 1,
    };

    const positions = [pos, upPos, downPos, leftPos, rightPos];
    positions.forEach((item) => {
      hasBlockInPos(item) && toggleBlockState(item);
    });
  }

  function detectionGameCompleted() {
    return map.every((row) => {
      return row.every((col) => col === MapBlockState.NEGATIVE);
    });
  }

  function updateMapRow() {
    const { row: newRows, col } = useEditorStore();
    const oldRows = map.length;
    if (newRows > oldRows) {
      // add rows
      const diff = newRows - oldRows;
      for (let i = 0; i < diff; i++) {
        map.push(Array(col).fill(MapBlockState.POSITIVE));
      }
    } else if (newRows < oldRows) {
      // remove rows
      const diff = oldRows - newRows;
      map.splice(oldRows - diff, oldRows);
    }
  }

  function updateMapCol() {
    const { col: newCols } = useEditorStore();
    const oldCols = map[0].length;
    if (newCols > oldCols) {
      // add columns
      const diff = newCols - oldCols;
      const rowNewItems = Array(diff).fill(MapBlockState.POSITIVE);
      map.forEach((cell) => cell.push(...rowNewItems));
    } else if (newCols < oldCols) {
      // remove columns
      map.forEach((cell) => cell.splice(newCols, oldCols));
    }
  }

  return {
    map,
    initMap,
    hasBlockInPos,
    getMapBlockByPos,
    setMapBlockByPos,
    toggleBlockState,
    flip,
    detectionGameCompleted,
    updateMapRow,
    updateMapCol,
  };
});

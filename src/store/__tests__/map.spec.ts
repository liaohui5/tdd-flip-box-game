import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useMapStore, MapBlockState } from "@/store/map";
import { useEditorStore } from "@/store/editor";

describe("map store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("shoud init map data", () => {
    const { map, initMap } = useMapStore();
    initMap([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    expect(map).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("should be get position is invalid", () => {
    const { initMap, hasBlockInPos } = useMapStore();
    initMap([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    const pos1 = {
      colIndex: 1,
      rowIndex: 1,
    };
    const pos2 = {
      colIndex: 5,
      rowIndex: 5,
    };

    expect(hasBlockInPos(pos1)).toBe(true);
    expect(hasBlockInPos(pos2)).toBe(false);
  });

  it("should get map block state by posision", () => {
    const { initMap, getMapBlockByPos, map } = useMapStore();
    initMap([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    const state = getMapBlockByPos({ rowIndex: 1, colIndex: 1 });
    expect(state).toBe(map[1][1]);
  });

  it("should set map block state by posision", () => {
    const { map, initMap, setMapBlockByPos } = useMapStore();
    initMap([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    setMapBlockByPos({ rowIndex: 1, colIndex: 1 }, MapBlockState.NEGATIVE);

    expect(map[1][1]).toBe(MapBlockState.NEGATIVE);
  });

  it("should be toggle block state", () => {
    const { map, initMap, toggleBlockState } = useMapStore();
    initMap([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    const pos = {
      rowIndex: 1,
      colIndex: 1,
    };

    toggleBlockState(pos);

    expect(map[pos.rowIndex][pos.colIndex]).toBe(MapBlockState.NEGATIVE);
    toggleBlockState(pos);
    expect(map[pos.rowIndex][pos.colIndex]).toBe(MapBlockState.POSITIVE);
  });

  it("should be flip blocks", () => {
    const { getMapBlockByPos, initMap, flip } = useMapStore();
    initMap([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    const centerPos = {
      rowIndex: 1,
      colIndex: 1,
    };

    flip(centerPos);

    const targetBlock = getMapBlockByPos(centerPos);

    const upBlock = getMapBlockByPos({
      rowIndex: centerPos.rowIndex - 1,
      colIndex: centerPos.colIndex,
    });
    const downBlock = getMapBlockByPos({
      rowIndex: centerPos.rowIndex + 1,
      colIndex: centerPos.colIndex,
    });

    const leftPos = getMapBlockByPos({
      rowIndex: centerPos.rowIndex,
      colIndex: centerPos.colIndex - 1,
    });

    const rightPos = getMapBlockByPos({
      rowIndex: centerPos.rowIndex,
      colIndex: centerPos.colIndex + 1,
    });

    expect(targetBlock).toBe(MapBlockState.NEGATIVE);
    expect(upBlock).toBe(MapBlockState.NEGATIVE);
    expect(downBlock).toBe(MapBlockState.NEGATIVE);
    expect(leftPos).toBe(MapBlockState.NEGATIVE);
    expect(rightPos).toBe(MapBlockState.NEGATIVE);
  });

  it(`should be detection game completed when all blocks value is ${MapBlockState.NEGATIVE}`, () => {
    const { initMap, flip, detectionGameCompleted } = useMapStore();
    initMap([
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ]);
    flip({ rowIndex: 1, colIndex: 1 });

    expect(detectionGameCompleted()).toBe(true);
  });

  it("should add map rows when editor row increase", () => {
    const { map, initMap, updateMapRow } = useMapStore();
    const { makeMapByRowsAndCols, setRow } = useEditorStore();

    initMap(makeMapByRowsAndCols(3, 3));
    setRow(4);

    updateMapRow();

    expect(map.length).toBe(4);
  });

  it("should remove map rows when editor row decrease", () => {
    const { map, initMap, updateMapRow } = useMapStore();
    const { makeMapByRowsAndCols, setRow } = useEditorStore();

    initMap(makeMapByRowsAndCols(3, 3));
    setRow(2);

    updateMapRow();

    expect(map.length).toBe(2);
  });

  it("should add map columns when editor col increase", () => {
    const { map, initMap, updateMapCol } = useMapStore();
    const { makeMapByRowsAndCols, setCol } = useEditorStore();

    initMap(makeMapByRowsAndCols(3, 3));
    setCol(4);

    updateMapCol();

    expect(map[0].length).toBe(4);
  });


  it("should remove map columns when editor col decrease", () => {
    const { map, initMap, updateMapCol } = useMapStore();
    const { makeMapByRowsAndCols, setCol } = useEditorStore();

    initMap(makeMapByRowsAndCols(3, 3));
    setCol(2);

    updateMapCol();

    expect(map[0].length).toBe(2);
  });


});

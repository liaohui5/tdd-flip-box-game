import { defineStore } from "pinia";
import { ref } from "vue";
import { type GameMap, MapBlockState } from "@/store/map";

export const useEditorStore = defineStore("editor", () => {
  const row = ref<number>(5);
  const col = ref<number>(5);

  function setRow(rows: number) {
    row.value = rows;
  }

  function setCol(cols: number) {
    col.value = cols;
  }

  function makeMapByRowsAndCols(rows?: number, cols?: number) {
    rows && setRow(rows);
    cols && setCol(cols);
    const map: GameMap = [];
    for (let i = 0; i < row.value; i++) {
      map.push(new Array(col.value).fill(MapBlockState.POSITIVE));
    }
    return map;
  }

  return {
    col,
    row,
    setRow,
    setCol,
    makeMapByRowsAndCols,
  };
});

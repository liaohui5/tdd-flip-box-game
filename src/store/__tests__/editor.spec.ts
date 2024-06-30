import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useEditorStore } from "@/store/editor";

describe("editor store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("should be make map data by cols and rows", () => {
    const map = useEditorStore().makeMapByRowsAndCols(3, 3);

    expect(map).toMatchInlineSnapshot(`
      [
        [
          0,
          0,
          0,
        ],
        [
          0,
          0,
          0,
        ],
        [
          0,
          0,
          0,
        ],
      ]
    `);
  });
});

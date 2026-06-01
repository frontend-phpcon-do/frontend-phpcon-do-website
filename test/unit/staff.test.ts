import { describe, expect, it } from "vite-plus/test";
import { normalizeStaffTypes, type StaffType } from "../../app/data/staff";

describe("normalizeStaffTypes", () => {
  it("returns an empty array when given undefined", () => {
    expect(normalizeStaffTypes(undefined)).toEqual([]);
  });

  it("drops staff types that have no members", () => {
    const types: StaffType[] = [
      { name: "スタッフ", name_en: "Staff", staff: [] },
      {
        name: "コアスタッフ",
        name_en: "Core Staff",
        staff: [{ id: "1", name: "alice" }],
      },
    ];

    const result = normalizeStaffTypes(types);

    expect(result).toHaveLength(1);
    expect(result[0]?.name_en).toBe("Core Staff");
  });

  it("trims whitespace in names and falls back name_en to name", () => {
    const types: StaffType[] = [{ name: "  実行委員長 ", staff: [{ id: "1", name: "chair" }] }];

    const [result] = normalizeStaffTypes(types);

    expect(result?.name).toBe("実行委員長");
    expect(result?.name_en).toBe("実行委員長");
  });

  it("orders Chair, then Core Staff, then Staff regardless of input order", () => {
    const types: StaffType[] = [
      { name: "コアスタッフ", name_en: "Core Staff", staff: [{ id: "1", name: "core" }] },
      { name: "スタッフ", name_en: "Staff", staff: [{ id: "2", name: "staff" }] },
      { name: "実行委員長", name_en: "Chair", staff: [{ id: "3", name: "chair" }] },
    ];

    const result = normalizeStaffTypes(types);

    expect(result.map((type) => type.name_en)).toEqual(["Chair", "Core Staff", "Staff"]);
  });

  it("keeps unknown staff types after known ones, preserving input order", () => {
    const types: StaffType[] = [
      { name: "デザイン", name_en: "Design", staff: [{ id: "1", name: "d" }] },
      { name: "スタッフ", name_en: "Staff", staff: [{ id: "2", name: "s" }] },
      { name: "広報", name_en: "PR", staff: [{ id: "3", name: "p" }] },
    ];

    const result = normalizeStaffTypes(types);

    expect(result.map((type) => type.name_en)).toEqual(["Staff", "Design", "PR"]);
  });
});

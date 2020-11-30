import { getCellsAround } from "./getCellsAround";

describe("store", () => {
  describe("getCellsAround", () => {
    const getSortedSubject: typeof getCellsAround = (...args) => getCellsAround(...args).sort((a, b) => a - b);

    it("returns valid cells for 1x1 field", () => {
      expect(getSortedSubject(0, 1, 1)).toEqual([]);
    });

    it("returns valid cells for 2x1 field", () => {
      expect(getSortedSubject(0, 2, 1)).toEqual([1]);
      expect(getSortedSubject(1, 2, 1)).toEqual([0]);
    });

    it("returns valid cells for 3x1 field", () => {
      expect(getSortedSubject(0, 3, 1)).toEqual([1]);
      expect(getSortedSubject(1, 3, 1)).toEqual([0, 2]);
      expect(getSortedSubject(2, 3, 1)).toEqual([1]);
    });

    it("returns valid cells for 1x2 field", () => {
      expect(getSortedSubject(0, 1, 2)).toEqual([1]);
      expect(getSortedSubject(1, 1, 2)).toEqual([0]);
    });

    it("returns valid cells for 1x3 field", () => {
      expect(getSortedSubject(0, 1, 3)).toEqual([1]);
      expect(getSortedSubject(1, 1, 3)).toEqual([0, 2]);
      expect(getSortedSubject(2, 1, 3)).toEqual([1]);
    });

    it("returns valid cells for 2x2 field", () => {
      expect(getSortedSubject(0, 2, 2)).toEqual([1, 2, 3]);
      expect(getSortedSubject(1, 2, 2)).toEqual([0, 2, 3]);
      expect(getSortedSubject(2, 2, 2)).toEqual([0, 1, 3]);
      expect(getSortedSubject(3, 2, 2)).toEqual([0, 1, 2]);
    });

    it("returns valid cells for 3x2 field", () => {
      expect(getSortedSubject(0, 3, 2)).toEqual([1, 3, 4]);
      expect(getSortedSubject(1, 3, 2)).toEqual([0, 2, 3, 4, 5]);
      expect(getSortedSubject(2, 3, 2)).toEqual([1, 4, 5]);
      expect(getSortedSubject(3, 3, 2)).toEqual([0, 1, 4]);
      expect(getSortedSubject(4, 3, 2)).toEqual([0, 1, 2, 3, 5]);
      expect(getSortedSubject(5, 3, 2)).toEqual([1, 2, 4]);
    });

    it("returns valid cells for 2x3 field", () => {
      expect(getSortedSubject(0, 2, 3)).toEqual([1, 2, 3]);
      expect(getSortedSubject(1, 2, 3)).toEqual([0, 2, 3]);
      expect(getSortedSubject(2, 2, 3)).toEqual([0, 1, 3, 4, 5]);
      expect(getSortedSubject(3, 2, 3)).toEqual([0, 1, 2, 4, 5]);
      expect(getSortedSubject(4, 2, 3)).toEqual([2, 3, 5]);
      expect(getSortedSubject(5, 2, 3)).toEqual([2, 3, 4]);
    });

    it("returns valid cells for 3x3 field", () => {
      expect(getSortedSubject(0, 3, 3)).toEqual([1, 3, 4]);
      expect(getSortedSubject(1, 3, 3)).toEqual([0, 2, 3, 4, 5]);
      expect(getSortedSubject(2, 3, 3)).toEqual([1, 4, 5]);
      expect(getSortedSubject(3, 3, 3)).toEqual([0, 1, 4, 6, 7]);
      expect(getSortedSubject(4, 3, 3)).toEqual([0, 1, 2, 3, 5, 6, 7, 8]);
      expect(getSortedSubject(5, 3, 3)).toEqual([1, 2, 4, 7, 8]);
      expect(getSortedSubject(6, 3, 3)).toEqual([3, 4, 7]);
      expect(getSortedSubject(7, 3, 3)).toEqual([3, 4, 5, 6, 8]);
      expect(getSortedSubject(8, 3, 3)).toEqual([4, 5, 7]);
    });
  });
});

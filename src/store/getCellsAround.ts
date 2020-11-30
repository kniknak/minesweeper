export const getCellsAround = (id: number, width: number, height: number): number[] => {
  const cells: number[] = [];

  const notInTopRow = id >= width;
  const notInBottomRow = id < (height - 1) * width;
  const notInLeftColumn = id % width;
  const notInRightColumn = id % width < width - 1;

  if (notInTopRow) {
    cells.push(id - width);

    if (notInLeftColumn) {
      cells.push(id - width - 1);
    }

    if (notInRightColumn) {
      cells.push(id - width + 1);
    }
  }

  if (notInBottomRow) {
    cells.push(id + width);

    if (notInLeftColumn) {
      cells.push(id + width - 1);
    }

    if (notInRightColumn) {
      cells.push(id + width + 1);
    }
  }

  if (notInLeftColumn) {
    cells.push(id - 1);
  }

  if (notInRightColumn) {
    cells.push(id + 1);
  }

  return cells;
};

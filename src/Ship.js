// factory fucntion for a ship

export function Ship(
  numBlocks,
  [init_x_coordinate, init_y_coordinate],
  orientation
) {
  const _blocks = new Array(numBlocks);
  const _orientation = orientation;

  // the blocks right now dont have any coordinates.
  /* for (let i = 0; i < numBlocks; i++) {
    _blocks[i] = Block();
  } */

  for (let i = 0; i < numBlocks; i++) {
    const block = Block();
    if (orientation === "horizontal") {
      block.setCoordinates(init_x_coordinate, init_y_coordinate);
      init_x_coordinate += 1;
    }
    if (orientation === "vertical") {
      block.setCoordinates(init_x_coordinate, init_y_coordinate);
      init_y_coordinate += 1;
    }

    _blocks[i] = block;
  }

  function hitBlock(blockNum) {
    _blocks[blockNum].getsHit();
  }

  function getBlocks() {
    return _blocks;
  }

  function isSunk() {
    let sunk = true;
    _blocks.forEach((block) => {
      if (block.isHit() === false) {
        sunk = false;
        return sunk;
      }
    });
    return sunk;
  }

  function getOrientation() {
    return _orientation;
  }

  return { hitBlock, getBlocks, isSunk, getOrientation };
}

export function Block() {
  let _hit = false;
  let x_coord = 0;
  let y_coord = 0;

  function getsHit() {
    _hit = true;
  }

  function isHit() {
    return _hit;
  }

  function setCoordinates(x, y) {
    x_coord = x;
    y_coord = y;
  }

  function getCoordinates() {
    return [x_coord, y_coord];
  }

  return {
    isHit,
    getsHit,
    setCoordinates,
    getCoordinates,
  };
}

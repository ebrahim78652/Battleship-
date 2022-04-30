import { Block, Ship } from "../Ship";
import { arraysEqual } from "../utlityMethods";

// testing for block

test("should be unhit initially", () => {
  const block = Block();

  expect(block.isHit()).toBe(false);
});

test("should have status as hit  ", () => {
  const block = Block();
  block.getsHit();

  expect(block.isHit()).toBe(true);
});

// ship testing

test("should result in ships blocks having the correct coordinates", () => {
  const ship = new Ship(3, [1, 1], "horizontal");
  const blocks = ship.getBlocks();

  expect(
    arraysEqual(blocks[0].getCoordinates(), [1, 1]) &&
      arraysEqual(blocks[1].getCoordinates(), [2, 1]) &&
      arraysEqual(blocks[2].getCoordinates(), [3, 1])
  ).toBe(true);
});

test("ship getting hit", () => {
  const ship = Ship(1, [1, 1], "horizontal");
  ship.hitBlock(0);

  expect(ship.getBlocks()[0].isHit()).toBe(true);
});

test("ship initially", () => {
  const ship = Ship(1, [1, 1], "horizontal");

  expect(ship.getBlocks()[0].isHit()).toBe(false);
});

test("ship sunk", () => {
  const ship = Ship(1, [1, 1], "horizontal");
  ship.hitBlock(0);

  expect(ship.isSunk()).toBe(true);
});

test("ship not sunk ", () => {
  const ship = Ship(1, [1, 1], "horizontal");
  expect(ship.isSunk()).toBe(false);
});

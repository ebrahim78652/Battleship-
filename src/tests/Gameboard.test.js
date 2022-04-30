import { Gameboard } from "../Gameboard";
import { Block, Ship } from "../Ship";

test("should add a hit to a ship", () => {
  const gameboard = Gameboard();
  const ship = Ship(3, [1, 1], "horizontal");
  gameboard.addShip(ship);

  gameboard.hitCoordinate([1, 1]);

  expect(ship.getBlocks()[0].isHit()).toBe(true);
  expect(ship.isSunk()).toBe(false);

  // add 2 more hits to the ship and test if sunk
  gameboard.hitCoordinate([2, 1]);
  gameboard.hitCoordinate([3, 1]);
  expect(ship.isSunk()).toBe(true);
});

test("should result in a miss", () => {
  const gameboard = Gameboard();
  const ship = Ship(3, [1, 1], "horizontal");
  gameboard.addShip(ship);

  gameboard.hitCoordinate([1, 4]);

  expect(gameboard.hitCoordinate([1, 4])).toBe(false);
});

test("should result in a miss since hitting a block on a ship that has already been targetted", () => {
  const gameboard = Gameboard();
  const ship = Ship(3, [1, 1], "horizontal");
  gameboard.addShip(ship);

  gameboard.hitCoordinate([3, 1]);

  expect(gameboard.hitCoordinate([3, 1])).toBe(false);
});

test("it should result in false: not all ships sunk", () => {
  const gameboard = Gameboard();
  const ship = Ship(1, [1, 1], "horizontal");
  const ship1 = Ship(1, [1, 2], "horizontal");
  const ship2 = Ship(1, [1, 3], "horizontal");
  gameboard.addShip(ship);
  gameboard.addShip(ship1);
  gameboard.addShip(ship2);

  gameboard.hitCoordinate([1, 1]);
  gameboard.hitCoordinate([1, 2]);

  expect(gameboard.isAllShipsSunk()).toBe(false);

  gameboard.hitCoordinate([1, 3]);
  expect(gameboard.isAllShipsSunk()).toBe(true);
});

test("should result in a false: ships being placed have intersecting blocks", () => {
  const gameboard = Gameboard();
  const ship = Ship(1, [1, 1], "horizontal");
  const ship1 = Ship(1, [1, 2], "horizontal");
  const ship2 = Ship(2, [1, 2], "horizontal");
  gameboard.addShip(ship);
  gameboard.addShip(ship1);
  expect(gameboard.addShip(ship2)).toBe(false);

  gameboard.hitCoordinate([1, 1]);
  gameboard.hitCoordinate([1, 2]);

  expect(gameboard.isAllShipsSunk()).toBe(true);
});

test("should result in a true: ships is placed successfuly", () => {
  const gameboard = Gameboard();
  const ship = Ship(1, [1, 1], "horizontal");
  const ship1 = Ship(1, [1, 2], "horizontal");
  const ship2 = Ship(1, [1, 3], "horizontal");
  gameboard.addShip(ship);
  gameboard.addShip(ship1);
  expect(gameboard.addShip(ship2)).toBe(true);
});

test("should result in a false: ships is overflowing horizontally", () => {
  const gameboard = Gameboard();
  const ship = Ship(8, [95, 1], "horizontal");

  expect(gameboard.addShip(ship)).toBe(false);
});

test("should result in a true: ships is overflowing vertically", () => {
  const gameboard = Gameboard();
  const ship = Ship(8, [1, 95], "vertical");

  expect(gameboard.addShip(ship)).toBe(false);
});

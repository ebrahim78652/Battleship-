import { Player } from "../Player";
import { Block, Ship } from "../Ship";

/* test("gameover should be false", () => {
  const player = Player();
  player.setName("ebrahim");

  const ship = Ship(1, [1, 1], "horizontal");
  const ship1 = Ship(1, [1, 2], "horizontal");
  const ship2 = Ship(1, [1, 3], "horizontal");

  player.gameboard.addShip(ship);
  player.gameboard.addShip(ship1);
  player.gameboard.addShip(ship2);

  player.hitCoordinate([1, 1]);
  player.hitCoordinate([1, 2]);

  expect(player.checkGameOver()).toBe(false);
  player.hitCoordinate([1, 3]);
  expect(player.checkGameOver()).toBe(true);
}); */

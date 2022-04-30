import { Gameboard } from "./Gameboard";
import { getRandomInt, getRandomArbitrary } from "./Randomgenerators";

export function Player() {
  let _name;
  const gameboard = Gameboard();

  function setName(name) {
    _name = name;
  }
  function getName(name) {
    return name;
  }

  function hitRandomCoordinate() {
    while (true) {
      if (gameboard.getIsLastHitSuccessful()) {
        const successHitCoordinate = gameboard.getLastSuccessfulCoordinates();
      }
      const x_coord = getRandomInt(100);
      const y_coord = getRandomInt(100);

      const result = gameboard.hitCoordinate([x_coord, y_coord]);

      // "true" if placed on a ship or if a miss occured. If repeated block
      // has been placed, then it will be "false"
      if (result) {
        break;
      }
    }
  }

  function checkGameOver() {
    if (gameboard.isAllShipsSunk()) {
      return true;
    }
    return false;
  }

  return {
    gameboard,
    checkGameOver,
    hitRandomCoordinate,
    setName,
    getName,
  };
}

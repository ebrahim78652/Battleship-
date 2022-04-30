import { Block, Ship } from "./Ship";
import { Gameboard } from "./Gameboard";
import { getRandomInt, getRandomArbitrary } from "./Randomgenerators";

export function Computer() {
  const _gameboard = Gameboard();

  function placeShipsRandomly() {
    const SIZE_CARRIER = 5;
    const SIZE_BATTLESHIP = 4;
    const SIZE_CRUISER = 3;
    const SIZE_SUBMARINE = 3;
    const SIZE_DESTROYER = 2;

    const arrShipSizes = [
      SIZE_CARRIER,
      SIZE_BATTLESHIP,
      SIZE_CRUISER,
      SIZE_SUBMARINE,
      SIZE_DESTROYER,
    ];

    arrShipSizes.forEach((size) => {
      while (true) {
        const orientationNumber = getRandomInt(2);
        let orientation;
        if (orientationNumber === 0) {
          orientation = "horizontal";
        } else {
          orientation = "vertical";
        }

        // now the x and y coordinates
        if (orientation === "horizontal") {
          const xCoord = getRandomArbitrary(0, 100 - size);
          const yCoord = getRandomArbitrary(0, 100);

          const shipToAdd = Ship(size, [xCoord, yCoord], "horizontal");
          const resultOfAdding = _gameboard.addShip(shipToAdd);
          if (resultOfAdding) {
            break;
          }
        }
        if (orientation === "vertical") {
          const xCoord = getRandomArbitrary(0, 100);
          const yCoord = getRandomArbitrary(0, 100 - size);
          const shipToAdd = Ship(size, [xCoord, yCoord], "vertical");
          const resultOfAdding = _gameboard.addShip(shipToAdd);
          if (resultOfAdding) {
            break;
          }
        }
      }
    });
  }

  function checkGameOver() {
    if (_gameboard.isAllShipsSunk()) {
      return true;
    }
    return false;
  }

  function hitCoordinate([x_coord, y_coord]) {
    _gameboard.hitCoordinate([x_coord, y_coord]);
  }

  return { placeShipsRandomly, hitCoordinate, checkGameOver };
}

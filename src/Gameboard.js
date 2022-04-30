import { Block } from "./Ship";
import { arraysEqual } from "./utlityMethods";

export function Gameboard() {
  const _missedBlocks = [];
  const _ships = [];
  let isLastHitSuccessful = false;
  const lastSuccessfulHitCoordinates = [0, 0];

  function addShip(ship) {
    // add validations here before ading every ship;
    const blocksOfShip = ship.getBlocks();
    const lengthOfShip = blocksOfShip.length;
    const startingBlock = blocksOfShip[0];
    const [xFirstBlock, yFirstBlock] = startingBlock.getCoordinates();
    const orientationShip = ship.getOrientation();

    // ship should not overflow the board
    if (
      (orientationShip === "horizontal" && xFirstBlock + lengthOfShip < 99) ||
      (orientationShip === "vertical" && yFirstBlock + lengthOfShip < 99)
    ) {
      // check if ship has any block in common with the already placed Ships
      let blockIntersectionOccuring = false;
      _ships.some((shipElement) => {
        shipElement.getBlocks().some((block) => {
          blocksOfShip.some((toBePlacedBlock) => {
            if (
              arraysEqual(
                block.getCoordinates(),
                toBePlacedBlock.getCoordinates()
              )
            ) {
              blockIntersectionOccuring = true;
              return true;
            }
          });
        });
      });

      if (blockIntersectionOccuring) {
        return false;
      }
      // if both of the above conditions are satisfied, then add the ship to the array
      _ships.push(ship);
      return true;
    }

    // if reached here, the the ship is either horizontal and
    // overflowing OR vertical and overflowing
    return false;
  }

  function hitCoordinate([x_coord, y_coord]) {
    const blockAlreadyChosen = _missedBlocks.filter((element) => {
      if (arraysEqual(element.getCoordinates(), [x_coord, y_coord])) {
        return true;
      }
    });

    if (blockAlreadyChosen.length === 0) {
      _ships.forEach((ship) => {
        const _blocks = ship.getBlocks();
        _blocks.forEach((block) => {
          if (
            arraysEqual(block.getCoordinates(), [x_coord, y_coord]) &&
            !block.isHit()
          ) {
            block.getsHit();
            isLastHitSuccessful = true;
            lastSuccessfulHitCoordinates[0] = x_coord;
            lastSuccessfulHitCoordinates[1] = y_coord;
            return true;
          }
          isLastHitSuccessful = false;
          return false;
        });
      });

      const miss = Block();
      miss.setCoordinates(x_coord, y_coord);
      _missedBlocks.push(miss);
      isLastHitSuccessful = false;
      return true;
    }
    isLastHitSuccessful = false;
    return false;
  }

  function isAllShipsSunk() {
    let allSunk = true;
    _ships.forEach((ship) => {
      if (!ship.isSunk()) {
        allSunk = false;
        return true;
      }
    });

    return allSunk;
  }

  function getIsLastHitSuccessful() {
    return isLastHitSuccessful;
  }

  function getLastSuccessfulCoordinates() {
    return lastSuccessfulHitCoordinates;
  }

  return {
    hitCoordinate,
    addShip,
    isAllShipsSunk,
    getIsLastHitSuccessful,
    getLastSuccessfulCoordinates,
  };
}

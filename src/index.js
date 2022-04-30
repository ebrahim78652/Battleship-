import { Gameboard } from "./Gameboard";
import { Block, Ship } from "./Ship";
import { Computer } from "./Computer";

const comp = Computer();
comp.placeShipsRandomly();
comp.gameboard._ships.forEach((ship) => {
  console.log(ship.getOrientation());
  ship.getBlocks().forEach((block) => {
    console.log(block.getCoordinates());
  });
});

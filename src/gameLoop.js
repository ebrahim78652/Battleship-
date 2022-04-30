import { Player } from "./Player";
import { Computer } from "./Computer";
import { Block } from "./Ship";

const player = Player();
// call the dom method and fetch the name;
player.setName("ebrahim");
// set the name as the name of the player.

const comp = Computer();

const ship1 = Ship(5, [2, 5], "vertical");
const ship2 = Ship(2, [4, 6], "vertical");
const ship3 = Ship(1, [6, 5], "horizontal");
player.gameboard.addShip(ship1);
player.gameboard.addShip(ship2);
player.gameboard.addShip(ship3);

comp.placeShipsRandomly();

const someoneWon = false;
while (someoneWon === false) {
  let playerChoice = prompt("enter coordinates to attack on the computer!");
}

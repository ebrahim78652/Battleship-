/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Computer.js":
/*!*************************!*\
  !*** ./src/Computer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Computer": () => (/* binding */ Computer)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
/* harmony import */ var _Randomgenerators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Randomgenerators */ "./src/Randomgenerators.js");




function Computer() {
  const _gameboard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();

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
        const orientationNumber = (0,_Randomgenerators__WEBPACK_IMPORTED_MODULE_2__.getRandomInt)(2);
        let orientation;
        if (orientationNumber === 0) {
          orientation = "horizontal";
        } else {
          orientation = "vertical";
        }

        // now the x and y coordinates
        if (orientation === "horizontal") {
          const xCoord = (0,_Randomgenerators__WEBPACK_IMPORTED_MODULE_2__.getRandomArbitrary)(0, 100 - size);
          const yCoord = (0,_Randomgenerators__WEBPACK_IMPORTED_MODULE_2__.getRandomArbitrary)(0, 100);

          const shipToAdd = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(size, [xCoord, yCoord], "horizontal");
          const resultOfAdding = _gameboard.addShip(shipToAdd);
          if (resultOfAdding) {
            break;
          }
        }
        if (orientation === "vertical") {
          const xCoord = (0,_Randomgenerators__WEBPACK_IMPORTED_MODULE_2__.getRandomArbitrary)(0, 100);
          const yCoord = (0,_Randomgenerators__WEBPACK_IMPORTED_MODULE_2__.getRandomArbitrary)(0, 100 - size);
          const shipToAdd = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(size, [xCoord, yCoord], "vertical");
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


/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* harmony import */ var _utlityMethods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utlityMethods */ "./src/utlityMethods.js");



function Gameboard() {
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
              (0,_utlityMethods__WEBPACK_IMPORTED_MODULE_1__.arraysEqual)(
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
      if ((0,_utlityMethods__WEBPACK_IMPORTED_MODULE_1__.arraysEqual)(element.getCoordinates(), [x_coord, y_coord])) {
        return true;
      }
    });

    if (blockAlreadyChosen.length === 0) {
      _ships.forEach((ship) => {
        const _blocks = ship.getBlocks();
        _blocks.forEach((block) => {
          if (
            (0,_utlityMethods__WEBPACK_IMPORTED_MODULE_1__.arraysEqual)(block.getCoordinates(), [x_coord, y_coord]) &&
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

      const miss = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Block)();
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


/***/ }),

/***/ "./src/Randomgenerators.js":
/*!*********************************!*\
  !*** ./src/Randomgenerators.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomArbitrary": () => (/* binding */ getRandomArbitrary),
/* harmony export */   "getRandomInt": () => (/* binding */ getRandomInt)
/* harmony export */ });
function getRandomInt(max) {
  const c = Math.floor(Math.random() * max);
  return c;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Block": () => (/* binding */ Block),
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
// factory fucntion for a ship

function Ship(
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

function Block() {
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


/***/ }),

/***/ "./src/utlityMethods.js":
/*!******************************!*\
  !*** ./src/utlityMethods.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arraysEqual": () => (/* binding */ arraysEqual)
/* harmony export */ });
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* harmony import */ var _Computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Computer */ "./src/Computer.js");




const comp = (0,_Computer__WEBPACK_IMPORTED_MODULE_2__.Computer)();
comp.placeShipsRandomly();
comp.gameboard._ships.forEach((ship) => {
  console.log(ship.getOrientation());
  ship.getBlocks().forEach((block) => {
    console.log(block.getCoordinates());
  });
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map
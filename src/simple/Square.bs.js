'use strict';

var List = require("bs-platform/lib/js/list.js");
var Coordinates = require("./Coordinates.bs.js");

function createSquare(x, y, imagePath) {
  return /* record */[
          /* x */x,
          /* y */y,
          /* imagePath */imagePath,
          /* isSelected */false,
          /* isTargeted */false,
          /* isHovered */false,
          /* inMovementRange */false,
          /* coordinates */Coordinates.createCoordinates(x, y)
        ];
}

function getSquares(relativeCoordinates, squares, centerCoordinates) {
  return List.filter((function (square) {
                  return List.exists((function (relativeCoordinate) {
                                return Coordinates.equals(square[/* coordinates */7], Coordinates.sum(relativeCoordinate, centerCoordinates));
                              }), relativeCoordinates);
                }))(squares);
}

function reset(square) {
  return /* record */[
          /* x */square[/* x */0],
          /* y */square[/* y */1],
          /* imagePath */square[/* imagePath */2],
          /* isSelected */false,
          /* isTargeted */false,
          /* isHovered */false,
          /* inMovementRange */false,
          /* coordinates */square[/* coordinates */7]
        ];
}

exports.createSquare = createSquare;
exports.getSquares = getSquares;
exports.reset = reset;
/* No side effect */

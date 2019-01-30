'use strict';


function createCoordinates(x, y) {
  return /* record */[
          /* x */x,
          /* y */y
        ];
}

function equals(coordinates1, coordinates2) {
  if (coordinates1[/* x */0] === coordinates2[/* x */0]) {
    return coordinates1[/* y */1] === coordinates2[/* y */1];
  } else {
    return false;
  }
}

function sum(coordinates1, coordinates2) {
  return /* record */[
          /* x */coordinates1[/* x */0] + coordinates2[/* x */0] | 0,
          /* y */coordinates1[/* y */1] + coordinates2[/* y */1] | 0
        ];
}

function distance(coordinates1, coordinates2) {
  return Math.abs(coordinates1[/* x */0] - coordinates2[/* x */0] | 0) + Math.abs(coordinates1[/* y */1] - coordinates2[/* y */1] | 0) | 0;
}

function distance2(param, param$1) {
  return Math.abs(param[/* x */0] - param$1[/* x */0] | 0) + Math.abs(param[/* y */1] - param$1[/* y */1] | 0) | 0;
}

exports.createCoordinates = createCoordinates;
exports.equals = equals;
exports.sum = sum;
exports.distance = distance;
exports.distance2 = distance2;
/* No side effect */

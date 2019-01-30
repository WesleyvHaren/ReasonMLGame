'use strict';

var List = require("bs-platform/lib/js/list.js");
var Coordinates = require("./Coordinates.bs.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function createGamestate(grid, units, player) {
  return /* record */[
          /* grid */grid,
          /* units */units,
          /* selectedUnitId */undefined,
          /* interactionMode : SelectingAction */0,
          /* player */player
        ];
}

function findUnit(units, coordinates) {
  var match = List.exists((function (unit) {
          return Coordinates.equals(unit[/* coordinates */5], coordinates);
        }), units);
  if (match) {
    return List.find((function (unit) {
                  return Coordinates.equals(unit[/* coordinates */5], coordinates);
                }), units);
  }
  
}

function valueOrDefault(option, $$default) {
  if (option !== undefined) {
    return Js_primitive.valFromOption(option);
  } else {
    return $$default;
  }
}

function updateGamestate(squares, interactionMode, selectedUnitId, units, gamestate) {
  return /* record */[
          /* grid : record */[/* squares */valueOrDefault(squares, gamestate[/* grid */0][/* squares */0])],
          /* units */valueOrDefault(units, gamestate[/* units */1]),
          /* selectedUnitId */valueOrDefault(selectedUnitId, gamestate[/* selectedUnitId */2]),
          /* interactionMode */valueOrDefault(interactionMode, gamestate[/* interactionMode */3]),
          /* player */gamestate[/* player */4]
        ];
}

exports.createGamestate = createGamestate;
exports.findUnit = findUnit;
exports.valueOrDefault = valueOrDefault;
exports.updateGamestate = updateGamestate;
/* No side effect */

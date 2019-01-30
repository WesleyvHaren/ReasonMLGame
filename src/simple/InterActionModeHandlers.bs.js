'use strict';

var List = require("bs-platform/lib/js/list.js");
var Unit = require("./Unit.bs.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Option = require("./Option.bs.js");
var Square = require("./Square.bs.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Gamestate = require("./Gamestate.bs.js");
var Coordinates = require("./Coordinates.bs.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function getClickedUnitId(gameState, clickedSquare) {
  return Option.map((function (unit) {
                return unit[/* id */3];
              }), Gamestate.findUnit(gameState[/* units */1], clickedSquare[/* coordinates */7]));
}

function selectSquare(clickedSquare) {
  return (function (param) {
      return List.map((function (square) {
                    return /* record */[
                            /* x */square[/* x */0],
                            /* y */square[/* y */1],
                            /* imagePath */square[/* imagePath */2],
                            /* isSelected */square[/* x */0] === clickedSquare[/* x */0] && square[/* y */1] === clickedSquare[/* y */1],
                            /* isTargeted */square[/* isTargeted */4],
                            /* isHovered */square[/* isHovered */5],
                            /* inMovementRange */square[/* inMovementRange */6],
                            /* coordinates */square[/* coordinates */7]
                          ];
                  }), param);
    });
}

function findUnit(id) {
  return (function (param) {
      return List.find((function (unit) {
                    return unit[/* id */3] === id;
                  }), param);
    });
}

function findUnitInUnitList(list, id) {
  return List.find((function (unit) {
                return unit[/* id */3] === id;
              }), list);
}

function selectIntactionModeInClickedSquare(gameState, unitId) {
  if (unitId !== undefined) {
    var match = findUnit(unitId)(gameState[/* units */1])[/* subtype */4];
    return match + 1 | 0;
  } else {
    return /* SelectingAction */0;
  }
}

function selectActionClickedSquareHandler(gameState, clickedSquare) {
  var unitId = getClickedUnitId(gameState, clickedSquare);
  return Gamestate.updateGamestate(selectSquare(clickedSquare)(gameState[/* grid */0][/* squares */0]), selectIntactionModeInClickedSquare(gameState, unitId), Js_primitive.some(getClickedUnitId(gameState, clickedSquare)), undefined, gameState);
}

function onlyIfUnitSelected(fn, gameState) {
  var match = gameState[/* selectedUnitId */2];
  if (match !== undefined) {
    return Curry._2(fn, findUnit(match)(gameState[/* units */1]), gameState);
  } else {
    return (function () {
        return gameState;
      });
  }
}

function attackIfTargetHandler(param) {
  return onlyIfUnitSelected((function (attackingUnit, gameState, clickedSquare) {
                var targetId = getClickedUnitId(gameState, clickedSquare);
                var units = Option.map((function (id) {
                        return List.map((function (unit) {
                                      var match = unit[/* id */3] === id;
                                      if (match) {
                                        return /* record */[
                                                /* x */unit[/* x */0],
                                                /* y */unit[/* y */1],
                                                /* imagePath */unit[/* imagePath */2],
                                                /* id */unit[/* id */3],
                                                /* subtype */unit[/* subtype */4],
                                                /* coordinates */unit[/* coordinates */5],
                                                /* equipment */unit[/* equipment */6],
                                                /* hp */unit[/* hp */7] - Unit.getTotalAttack(attackingUnit) | 0,
                                                /* baseAttack */unit[/* baseAttack */8],
                                                /* baseSpeed */unit[/* baseSpeed */9],
                                                /* skills */unit[/* skills */10],
                                                /* movementrange */unit[/* movementrange */11]
                                              ];
                                      } else {
                                        return unit;
                                      }
                                    }), gameState[/* units */1]);
                      }), targetId);
                return Gamestate.updateGamestate(undefined, /* HeroSelected */2, undefined, units, gameState);
              }), param);
}

function moveIfValidLocationHandler(param) {
  return onlyIfUnitSelected((function (selectedUnit, gameState, clickedSquare) {
                var resetGrid = /* record */[/* squares */List.map(Square.reset, gameState[/* grid */0][/* squares */0])];
                var match = Coordinates.distance2(selectedUnit[/* coordinates */5], clickedSquare[/* coordinates */7]) < selectedUnit[/* movementrange */11];
                if (match) {
                  return /* record */[
                          /* grid */resetGrid,
                          /* units */List.map((function (unit) {
                                  var match = Caml_obj.caml_equal(selectedUnit, unit);
                                  if (match) {
                                    return /* record */[
                                            /* x */unit[/* x */0],
                                            /* y */unit[/* y */1],
                                            /* imagePath */unit[/* imagePath */2],
                                            /* id */unit[/* id */3],
                                            /* subtype */unit[/* subtype */4],
                                            /* coordinates : record */[
                                              /* x */clickedSquare[/* coordinates */7][/* x */0],
                                              /* y */clickedSquare[/* coordinates */7][/* y */1]
                                            ],
                                            /* equipment */unit[/* equipment */6],
                                            /* hp */unit[/* hp */7],
                                            /* baseAttack */unit[/* baseAttack */8],
                                            /* baseSpeed */unit[/* baseSpeed */9],
                                            /* skills */unit[/* skills */10],
                                            /* movementrange */unit[/* movementrange */11]
                                          ];
                                  } else {
                                    return unit;
                                  }
                                }), gameState[/* units */1]),
                          /* selectedUnitId */gameState[/* selectedUnitId */2],
                          /* interactionMode : SelectingAction */0,
                          /* player */gameState[/* player */4]
                        ];
                } else {
                  return /* record */[
                          /* grid */resetGrid,
                          /* units */gameState[/* units */1],
                          /* selectedUnitId */gameState[/* selectedUnitId */2],
                          /* interactionMode : HeroSelected */2,
                          /* player */gameState[/* player */4]
                        ];
                }
              }), param);
}

function showMovementRange(param) {
  return onlyIfUnitSelected((function (selectedUnit, gameState, _) {
                return /* record */[
                        /* grid : record */[/* squares */List.map((function (square) {
                                  var match = Coordinates.distance2(selectedUnit[/* coordinates */5], square[/* coordinates */7]) < selectedUnit[/* movementrange */11];
                                  if (match) {
                                    return /* record */[
                                            /* x */square[/* x */0],
                                            /* y */square[/* y */1],
                                            /* imagePath */square[/* imagePath */2],
                                            /* isSelected */square[/* isSelected */3],
                                            /* isTargeted */square[/* isTargeted */4],
                                            /* isHovered */square[/* isHovered */5],
                                            /* inMovementRange */true,
                                            /* coordinates */square[/* coordinates */7]
                                          ];
                                  } else {
                                    return square;
                                  }
                                }), gameState[/* grid */0][/* squares */0])],
                        /* units */gameState[/* units */1],
                        /* selectedUnitId */gameState[/* selectedUnitId */2],
                        /* interactionMode : MovingUnit */4,
                        /* player */gameState[/* player */4]
                      ];
              }), param);
}

exports.getClickedUnitId = getClickedUnitId;
exports.selectSquare = selectSquare;
exports.findUnit = findUnit;
exports.findUnitInUnitList = findUnitInUnitList;
exports.selectIntactionModeInClickedSquare = selectIntactionModeInClickedSquare;
exports.selectActionClickedSquareHandler = selectActionClickedSquareHandler;
exports.onlyIfUnitSelected = onlyIfUnitSelected;
exports.attackIfTargetHandler = attackIfTargetHandler;
exports.moveIfValidLocationHandler = moveIfValidLocationHandler;
exports.showMovementRange = showMovementRange;
/* Unit Not a pure module */

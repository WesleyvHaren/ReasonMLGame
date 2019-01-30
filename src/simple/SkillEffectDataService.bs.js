'use strict';

var List = require("bs-platform/lib/js/list.js");
var Utils = require("./Utils.bs.js");
var Square = require("./Square.bs.js");
var Coordinates = require("./Coordinates.bs.js");

function getSquaresInAreaOfEffect(areaOfEffect) {
  if (typeof areaOfEffect === "number") {
    if (areaOfEffect !== 0) {
      return (function (_, _$1) {
          return /* [] */0;
        });
    } else {
      var partial_arg = /* :: */[
        /* record */[
          /* x */0,
          /* y */0
        ],
        /* [] */0
      ];
      return (function (param, param$1) {
          return Square.getSquares(partial_arg, param, param$1);
        });
    }
  } else {
    var partial_arg$1 = areaOfEffect[0];
    return (function (param, param$1) {
        return Square.getSquares(partial_arg$1, param, param$1);
      });
  }
}

function getSkillEffect(skill) {
  return (function (gamestate, clickedSquare) {
      var unitInRange = function (unit) {
        return List.exists((function (square) {
                      return Coordinates.equals(square[/* coordinates */7], unit[/* coordinates */5]);
                    }), getSquaresInAreaOfEffect(skill[/* targetingReticule */3])(gamestate[/* grid */0][/* squares */0], clickedSquare[/* coordinates */7]));
      };
      var fireballEffect = function (unit) {
        return /* record */[
                /* x */unit[/* x */0],
                /* y */unit[/* y */1],
                /* imagePath */unit[/* imagePath */2],
                /* id */unit[/* id */3],
                /* subtype */unit[/* subtype */4],
                /* coordinates */unit[/* coordinates */5],
                /* equipment */unit[/* equipment */6],
                /* hp */unit[/* hp */7] - 3 | 0,
                /* baseAttack */unit[/* baseAttack */8],
                /* baseSpeed */unit[/* baseSpeed */9],
                /* skills */unit[/* skills */10],
                /* movementrange */unit[/* movementrange */11]
              ];
      };
      return /* record */[
              /* grid : record */[/* squares */List.map((function (square) {
                        return /* record */[
                                /* x */square[/* x */0],
                                /* y */square[/* y */1],
                                /* imagePath */square[/* imagePath */2],
                                /* isSelected */square[/* isSelected */3],
                                /* isTargeted */false,
                                /* isHovered */square[/* isHovered */5],
                                /* inMovementRange */square[/* inMovementRange */6],
                                /* coordinates */square[/* coordinates */7]
                              ];
                      }), gamestate[/* grid */0][/* squares */0])],
              /* units */Utils.updateList(unitInRange, fireballEffect)(gamestate[/* units */1]),
              /* selectedUnitId */gamestate[/* selectedUnitId */2],
              /* interactionMode */gamestate[/* interactionMode */3],
              /* player */gamestate[/* player */4]
            ];
    });
}

exports.getSquaresInAreaOfEffect = getSquaresInAreaOfEffect;
exports.getSkillEffect = getSkillEffect;
/* Utils Not a pure module */

'use strict';

var List = require("bs-platform/lib/js/list.js");
var Unit = require("./Unit.bs.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("./Utils.bs.js");
var React = require("react");
var Option = require("./Option.bs.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Equipment = require("./Equipment.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var SkillEffectDataService = require("./SkillEffectDataService.bs.js");
var InterActionModeHandlers = require("./InterActionModeHandlers.bs.js");

var component = ReasonReact.reducerComponent("Grid");

function moveClicked(gamestate) {
  return /* Update */Block.__(0, [/* record */[/* gameState */Curry._1(InterActionModeHandlers.showMovementRange(gamestate), 1)]]);
}

function attackClicked(gamestate) {
  return /* Update */Block.__(0, [/* record */[/* gameState : record */[
                /* grid */gamestate[/* grid */0],
                /* units */gamestate[/* units */1],
                /* selectedUnitId */gamestate[/* selectedUnitId */2],
                /* interactionMode : AttackingUnit */5,
                /* player */gamestate[/* player */4]
              ]]]);
}

function shopClicked(gamestate) {
  return /* Update */Block.__(0, [/* record */[/* gameState : record */[
                /* grid */gamestate[/* grid */0],
                /* units */gamestate[/* units */1],
                /* selectedUnitId */gamestate[/* selectedUnitId */2],
                /* interactionMode : OpenShop */6,
                /* player */gamestate[/* player */4]
              ]]]);
}

function closeShop(gamestate) {
  return /* Update */Block.__(0, [/* record */[/* gameState : record */[
                /* grid */gamestate[/* grid */0],
                /* units */gamestate[/* units */1],
                /* selectedUnitId */gamestate[/* selectedUnitId */2],
                /* interactionMode : HeroSelected */2,
                /* player */gamestate[/* player */4]
              ]]]);
}

function equip(gameState, itemTypes) {
  return /* Update */Block.__(0, [/* record */[/* gameState : record */[
                /* grid */gameState[/* grid */0],
                /* units */List.map((function (unit) {
                        var match = Option.contains(gameState[/* selectedUnitId */2], unit[/* id */3]);
                        if (match) {
                          return /* record */[
                                  /* x */unit[/* x */0],
                                  /* y */unit[/* y */1],
                                  /* imagePath */unit[/* imagePath */2],
                                  /* id */unit[/* id */3],
                                  /* subtype */unit[/* subtype */4],
                                  /* coordinates */unit[/* coordinates */5],
                                  /* equipment */Equipment.equip(unit[/* equipment */6], Equipment.createItem(itemTypes)),
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
              ]]]);
}

function make(_, gamestate) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              var partial_arg = self[/* state */1][/* gameState */0];
              var partial_arg$1 = self[/* send */3];
              var partial_arg$2 = self[/* state */1][/* gameState */0][/* units */1];
              var match = self[/* state */1][/* gameState */0][/* interactionMode */3] === /* HeroSelected */2 && Option.contains(self[/* state */1][/* gameState */0][/* selectedUnitId */2], List.hd(Unit.determineTurnOrder(self[/* state */1][/* gameState */0][/* units */1]))[/* id */3]);
              var match$1 = self[/* state */1][/* gameState */0][/* interactionMode */3] === /* OpenShop */6 && Option.contains(self[/* state */1][/* gameState */0][/* selectedUnitId */2], List.hd(Unit.determineTurnOrder(self[/* state */1][/* gameState */0][/* units */1]))[/* id */3]);
              return React.createElement("div", {
                          className: "grid"
                        }, Utils.createGrid(10, 10, (function (param) {
                                return Utils.createSquare(partial_arg$1, partial_arg, param);
                              }), self[/* state */1][/* gameState */0][/* grid */0][/* squares */0]), React.createElement("div", undefined, Option.optionIntToString(self[/* state */1][/* gameState */0][/* selectedUnitId */2])), React.createElement("div", undefined, "Turnorder?"), React.createElement("div", undefined, $$Array.of_list(List.map((function (unit) {
                                        return String(unit[/* id */3]);
                                      }), Unit.determineTurnOrder(self[/* state */1][/* gameState */0][/* units */1])))), React.createElement("div", undefined, Option.optionIntToString(Option.map((function (unit) {
                                        return unit[/* hp */7];
                                      }), Option.map((function (param) {
                                            return InterActionModeHandlers.findUnitInUnitList(partial_arg$2, param);
                                          }), self[/* state */1][/* gameState */0][/* selectedUnitId */2])))), match ? React.createElement("div", undefined, React.createElement("button", {
                                    onClick: (function () {
                                        return Curry._1(self[/* send */3], /* MoveClicked */0);
                                      })
                                  }, "Move"), React.createElement("button", {
                                    onClick: (function () {
                                        return Curry._1(self[/* send */3], /* AttackClicked */1);
                                      })
                                  }, "Attack"), React.createElement("button", {
                                    onClick: (function () {
                                        return Curry._1(self[/* send */3], /* ShopClicked */2);
                                      })
                                  }, "Open shop"), $$Array.of_list(List.map((function (skill) {
                                          return React.createElement("button", {
                                                      onClick: (function () {
                                                          return Curry._1(self[/* send */3], /* SelectSkill */Block.__(2, [skill]));
                                                        })
                                                    }, skill[/* name */0]);
                                        }), List.hd(Unit.determineTurnOrder(self[/* state */1][/* gameState */0][/* units */1]))[/* skills */10]))) : React.createElement("span", undefined), match$1 ? React.createElement("div", undefined, React.createElement("button", {
                                    onClick: (function () {
                                        return Curry._1(self[/* send */3], /* Equip */Block.__(1, [/* Sword */0]));
                                      })
                                  }, "Sword"), React.createElement("button", {
                                    onClick: (function () {
                                        return Curry._1(self[/* send */3], /* Equip */Block.__(1, [/* TwoHanded */2]));
                                      })
                                  }, "Two-Handed Sword"), React.createElement("button", {
                                    onClick: (function () {
                                        return Curry._1(self[/* send */3], /* Close */3);
                                      })
                                  }, "Close")) : React.createElement("span", undefined));
            }),
          /* initialState */(function () {
              return /* record */[/* gameState */gamestate];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
              if (typeof action === "number") {
                switch (action) {
                  case 0 : 
                      return moveClicked(state[/* gameState */0]);
                  case 1 : 
                      return attackClicked(state[/* gameState */0]);
                  case 2 : 
                      return shopClicked(state[/* gameState */0]);
                  case 3 : 
                      var match = state[/* gameState */0][/* interactionMode */3];
                      if (typeof match === "number" && match >= 6) {
                        return closeShop(state[/* gameState */0]);
                      } else {
                        return /* Update */Block.__(0, [state]);
                      }
                  
                }
              } else {
                switch (action.tag | 0) {
                  case 0 : 
                      var clickedSquare = action[0];
                      var match$1 = state[/* gameState */0][/* interactionMode */3];
                      if (typeof match$1 === "number") {
                        var exit = 0;
                        switch (match$1) {
                          case 0 : 
                          case 1 : 
                          case 2 : 
                          case 3 : 
                              exit = 1;
                              break;
                          case 4 : 
                              return /* Update */Block.__(0, [/* record */[/* gameState */Curry._1(InterActionModeHandlers.moveIfValidLocationHandler(state[/* gameState */0]), clickedSquare)]]);
                          case 5 : 
                              return /* Update */Block.__(0, [/* record */[/* gameState */Curry._1(InterActionModeHandlers.attackIfTargetHandler(state[/* gameState */0]), clickedSquare)]]);
                          case 6 : 
                              return /* Update */Block.__(0, [state]);
                          
                        }
                        if (exit === 1) {
                          return /* Update */Block.__(0, [/* record */[/* gameState */InterActionModeHandlers.selectActionClickedSquareHandler(state[/* gameState */0], clickedSquare)]]);
                        }
                        
                      } else {
                        var init = SkillEffectDataService.getSkillEffect(match$1[0])(state[/* gameState */0], clickedSquare);
                        return /* Update */Block.__(0, [/* record */[/* gameState : record */[
                                      /* grid */init[/* grid */0],
                                      /* units */init[/* units */1],
                                      /* selectedUnitId */init[/* selectedUnitId */2],
                                      /* interactionMode : SelectingAction */0,
                                      /* player */init[/* player */4]
                                    ]]]);
                      }
                      break;
                  case 1 : 
                      return equip(state[/* gameState */0], action[0]);
                  case 2 : 
                      var skill = action[0];
                      var match$2 = skill[/* targetingReticule */3];
                      var exit$1 = 0;
                      if (typeof match$2 === "number" && match$2 !== 0) {
                        var init$1 = SkillEffectDataService.getSkillEffect(skill)(state[/* gameState */0], List.hd(state[/* gameState */0][/* grid */0][/* squares */0]));
                        return /* Update */Block.__(0, [/* record */[/* gameState : record */[
                                      /* grid */init$1[/* grid */0],
                                      /* units */init$1[/* units */1],
                                      /* selectedUnitId */init$1[/* selectedUnitId */2],
                                      /* interactionMode : SelectingAction */0,
                                      /* player */init$1[/* player */4]
                                    ]]]);
                      } else {
                        exit$1 = 1;
                      }
                      if (exit$1 === 1) {
                        var init$2 = state[/* gameState */0];
                        return /* Update */Block.__(0, [/* record */[/* gameState : record */[
                                      /* grid */init$2[/* grid */0],
                                      /* units */init$2[/* units */1],
                                      /* selectedUnitId */init$2[/* selectedUnitId */2],
                                      /* interactionMode : Targeting */[skill],
                                      /* player */init$2[/* player */4]
                                    ]]]);
                      }
                      break;
                  case 3 : 
                      var hoveredSquare = action[0];
                      var match$3 = state[/* gameState */0][/* interactionMode */3];
                      if (typeof match$3 === "number") {
                        var init$3 = state[/* gameState */0];
                        return /* Update */Block.__(0, [/* record */[/* gameState : record */[
                                      /* grid : record */[/* squares */List.map((function (square) {
                                                var match = Caml_obj.caml_equal(square, hoveredSquare);
                                                if (match) {
                                                  return /* record */[
                                                          /* x */square[/* x */0],
                                                          /* y */square[/* y */1],
                                                          /* imagePath */square[/* imagePath */2],
                                                          /* isSelected */square[/* isSelected */3],
                                                          /* isTargeted */square[/* isTargeted */4],
                                                          /* isHovered */true,
                                                          /* inMovementRange */square[/* inMovementRange */6],
                                                          /* coordinates */square[/* coordinates */7]
                                                        ];
                                                } else {
                                                  return /* record */[
                                                          /* x */square[/* x */0],
                                                          /* y */square[/* y */1],
                                                          /* imagePath */square[/* imagePath */2],
                                                          /* isSelected */square[/* isSelected */3],
                                                          /* isTargeted */square[/* isTargeted */4],
                                                          /* isHovered */false,
                                                          /* inMovementRange */square[/* inMovementRange */6],
                                                          /* coordinates */square[/* coordinates */7]
                                                        ];
                                                }
                                              }), state[/* gameState */0][/* grid */0][/* squares */0])],
                                      /* units */init$3[/* units */1],
                                      /* selectedUnitId */init$3[/* selectedUnitId */2],
                                      /* interactionMode */init$3[/* interactionMode */3],
                                      /* player */init$3[/* player */4]
                                    ]]]);
                      } else {
                        var skill$1 = match$3[0];
                        var init$4 = state[/* gameState */0];
                        return /* Update */Block.__(0, [/* record */[/* gameState : record */[
                                      /* grid : record */[/* squares */List.map((function (square) {
                                                var match = List.exists((function (areaSquare) {
                                                        return Caml_obj.caml_equal(areaSquare, square);
                                                      }), SkillEffectDataService.getSquaresInAreaOfEffect(skill$1[/* targetingReticule */3])(state[/* gameState */0][/* grid */0][/* squares */0], hoveredSquare[/* coordinates */7]));
                                                if (match) {
                                                  return /* record */[
                                                          /* x */square[/* x */0],
                                                          /* y */square[/* y */1],
                                                          /* imagePath */square[/* imagePath */2],
                                                          /* isSelected */square[/* isSelected */3],
                                                          /* isTargeted */true,
                                                          /* isHovered */square[/* isHovered */5],
                                                          /* inMovementRange */square[/* inMovementRange */6],
                                                          /* coordinates */square[/* coordinates */7]
                                                        ];
                                                } else {
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
                                                }
                                              }), state[/* gameState */0][/* grid */0][/* squares */0])],
                                      /* units */init$4[/* units */1],
                                      /* selectedUnitId */init$4[/* selectedUnitId */2],
                                      /* interactionMode */init$4[/* interactionMode */3],
                                      /* player */init$4[/* player */4]
                                    ]]]);
                      }
                  
                }
              }
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

exports.component = component;
exports.moveClicked = moveClicked;
exports.attackClicked = attackClicked;
exports.shopClicked = shopClicked;
exports.closeShop = closeShop;
exports.equip = equip;
exports.make = make;
/* component Not a pure module */

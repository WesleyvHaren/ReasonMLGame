'use strict';

var Unit = require("./Unit.bs.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Gamestate = require("./Gamestate.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function getClasses(square) {
  var match = square[/* isSelected */3];
  var match$1 = !square[/* isSelected */3] && square[/* isHovered */5] && !square[/* isTargeted */4];
  var match$2 = !square[/* isSelected */3] && square[/* isTargeted */4];
  var match$3 = square[/* inMovementRange */6];
  return "grid__square" + ((
            match ? " grid__square--selected" : ""
          ) + ((
              match$1 ? " grid__square--hovered" : ""
            ) + ((
                match$2 ? " grid__square--targeted" : ""
              ) + (
                match$3 ? " grid__square--in-movement-range" : ""
              ))));
}

var component = ReasonReact.reducerComponent("Square");

function make(square, handleClick, gamestate, _) {
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
              var match = Gamestate.findUnit(gamestate[/* units */1], square[/* coordinates */7]);
              var unitImage;
              if (match !== undefined) {
                var unit = match;
                var match$1 = Unit.isAlive(unit);
                unitImage = match$1 ? "http://127.0.0.1:5500/src/images/" + unit[/* imagePath */2] : "";
              } else {
                unitImage = "";
              }
              return React.createElement("svg", {
                          className: getClasses(square),
                          onClick: (function () {
                              return Curry._1(handleClick, /* ClickedSquare */Block.__(0, [square]));
                            }),
                          onMouseLeave: (function () {
                              return Curry._1(self[/* send */3], /* HoverOff */1);
                            }),
                          onMouseOver: (function () {
                              return Curry._1(handleClick, /* HoverSquare */Block.__(3, [square]));
                            })
                        }, React.createElement("image", {
                              alt: "lalala",
                              height: "60",
                              href: "http://127.0.0.1:5500/src/images/terrain/mountain.png",
                              width: "60"
                            }), React.createElement("image", {
                              alt: "lalala",
                              height: "60",
                              href: unitImage,
                              width: "60"
                            }));
            }),
          /* initialState */(function () {
              return /* record */[
                      /* isSelected */square[/* isSelected */3],
                      /* isHovered */false,
                      /* isTargeted */false
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
              if (typeof action === "number") {
                if (action !== 0) {
                  return /* Update */Block.__(0, [/* record */[
                              /* isSelected */state[/* isSelected */0],
                              /* isHovered */false,
                              /* isTargeted */state[/* isTargeted */2]
                            ]]);
                } else {
                  return /* Update */Block.__(0, [/* record */[
                              /* isSelected */state[/* isSelected */0],
                              /* isHovered */true,
                              /* isTargeted */state[/* isTargeted */2]
                            ]]);
                }
              } else {
                throw [
                      Caml_builtin_exceptions.match_failure,
                      /* tuple */[
                        "SquareComponent.re",
                        26,
                        4
                      ]
                    ];
              }
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

exports.getClasses = getClasses;
exports.component = component;
exports.make = make;
/* component Not a pure module */

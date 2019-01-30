'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var SquareComponent = require("./SquareComponent.bs.js");

function createSquare(handleClick, gamestate, square) {
  return ReasonReact.element(undefined, undefined, SquareComponent.make(square, handleClick, gamestate, /* array */[]));
}

function range(n) {
  var match = n === 0;
  if (match) {
    return /* [] */0;
  } else {
    return /* :: */[
            n - 1 | 0,
            range(n - 1 | 0)
          ];
  }
}

function createList(y, create) {
  return List.map(create, range(y));
}

function updateList(condition, updateItem) {
  return (function (param) {
      return List.map((function (item) {
                    var match = Curry._1(condition, item);
                    if (match) {
                      return Curry._1(updateItem, item);
                    } else {
                      return item;
                    }
                  }), param);
    });
}

function createReasonReactArray(y, create) {
  return $$Array.of_list(List.map(create, range(y)));
}

function createGrid(x, y, create, squares) {
  return $$Array.of_list(List.map((function (i) {
                    return $$Array.of_list(List.map((function (j) {
                                      return Curry._1(create, List.find((function (square) {
                                                        if (square[/* x */0] === i) {
                                                          return square[/* y */1] === j;
                                                        } else {
                                                          return false;
                                                        }
                                                      }), squares));
                                    }), range(y)));
                  }), range(x)));
}

function filledRange(n, create) {
  if (n !== 0) {
    return /* :: */[
            Curry._1(create, n - 1 | 0),
            filledRange(n - 1 | 0, create)
          ];
  } else {
    return /* [] */0;
  }
}

exports.createSquare = createSquare;
exports.range = range;
exports.createList = createList;
exports.updateList = updateList;
exports.createReasonReactArray = createReasonReactArray;
exports.createGrid = createGrid;
exports.filledRange = filledRange;
/* ReasonReact Not a pure module */

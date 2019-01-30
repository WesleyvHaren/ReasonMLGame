'use strict';

var Unit = require("./Unit.bs.js");
var Utils = require("./Utils.bs.js");
var Player = require("./Player.bs.js");
var Square = require("./Square.bs.js");
var Gamestate = require("./Gamestate.bs.js");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var GridComponent = require("./GridComponent.bs.js");

var grid = /* record */[/* squares */Utils.createList(100, (function (e) {
          var match = e < 10;
          return Square.createSquare(e % 10, match ? 0 : (e - e % 10 | 0) / 10 | 0, "");
        }))];

var hero = Unit.createUnit(0, 0, "units/bluearcherdown.png", 0, /* Hero */1);

var monster = Unit.createUnit(0, 1, "units/redarcherdown.png", 1, /* Monster */2);

var units_001 = /* :: */[
  monster,
  /* [] */0
];

var units = /* :: */[
  hero,
  units_001
];

var player = Player.createPlayer("Wesley", /* Red */0);

var gamestate = Gamestate.createGamestate(grid, units, player);

ReactDOMRe.renderToElementWithId(ReasonReact.element(undefined, undefined, GridComponent.make(/* array */[], gamestate)), "grid");

exports.grid = grid;
exports.hero = hero;
exports.monster = monster;
exports.units = units;
exports.player = player;
exports.gamestate = gamestate;
/* grid Not a pure module */

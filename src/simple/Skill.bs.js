'use strict';

var Coordinates = require("./Coordinates.bs.js");

function createSkill(name, skilltype, cooldown, targetingReticule) {
  return /* record */[
          /* name */name,
          /* skilltype */skilltype,
          /* cooldown */cooldown,
          /* targetingReticule */targetingReticule
        ];
}

var areaPlus = /* AreaOfEffect */[/* :: */[
    Coordinates.createCoordinates(0, 0),
    /* :: */[
      Coordinates.createCoordinates(1, 0),
      /* :: */[
        Coordinates.createCoordinates(0, 1),
        /* :: */[
          Coordinates.createCoordinates(-1, 0),
          /* :: */[
            Coordinates.createCoordinates(0, -1),
            /* [] */0
          ]
        ]
      ]
    ]
  ]];

function createFireball() {
  return createSkill("Fireball", /* Fireball */0, 0, areaPlus);
}

exports.createSkill = createSkill;
exports.areaPlus = areaPlus;
exports.createFireball = createFireball;
/* areaPlus Not a pure module */

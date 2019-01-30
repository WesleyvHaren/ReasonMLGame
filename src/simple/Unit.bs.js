'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Skill = require("./Skill.bs.js");
var Equipment = require("./Equipment.bs.js");
var Coordinates = require("./Coordinates.bs.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");

function createEquipment() {
  return Equipment.creatEquipment(Equipment.createItem(/* EmptyLeftArm */3), Equipment.createItem(/* EmptyRightArm */4));
}

function compareUnitSpeed(unit1, unit2) {
  var speedComparison = Caml_primitive.caml_int_compare(unit1[/* baseSpeed */9], unit2[/* baseSpeed */9]);
  var match = speedComparison === 0;
  if (match) {
    return Caml_primitive.caml_int_compare(unit1[/* id */3], unit2[/* id */3]);
  } else {
    return speedComparison;
  }
}

function determineTurnOrder(units) {
  return List.sort(compareUnitSpeed, units);
}

function createUnit(x, y, imagePath, id, subtype) {
  return /* record */[
          /* x */x,
          /* y */y,
          /* imagePath */imagePath,
          /* id */id,
          /* subtype */subtype,
          /* coordinates */Coordinates.createCoordinates(x, y),
          /* equipment */createEquipment(/* () */0),
          /* hp */10,
          /* baseAttack */1,
          /* baseSpeed */5,
          /* skills : :: */[
            Skill.createFireball(/* () */0),
            /* [] */0
          ],
          /* movementrange */2
        ];
}

function getTotalAttack(unit) {
  return unit[/* baseAttack */8] + Equipment.getAttackModifierTotal(unit[/* equipment */6]) | 0;
}

function isAlive(unit) {
  return unit[/* hp */7] > 0;
}

function Make(LocatableType) {
  var compare = function (locatable1, locatable2) {
    if (Curry._1(LocatableType[/* getXCoordinate */0], locatable1) === Curry._1(LocatableType[/* getXCoordinate */0], locatable2)) {
      return Curry._1(LocatableType[/* getYCoordinate */1], locatable1) === Curry._1(LocatableType[/* getYCoordinate */1], locatable2);
    } else {
      return false;
    }
  };
  return /* module */[/* compare */compare];
}

function MakeGeneric(LocatableType) {
  return (function (LocatableType2) {
      var compare = function (locatable1, locatable2) {
        if (Curry._1(LocatableType[/* getXCoordinate */0], locatable1) === Curry._1(LocatableType2[/* getXCoordinate */0], locatable2)) {
          return Curry._1(LocatableType[/* getYCoordinate */1], locatable1) === Curry._1(LocatableType2[/* getYCoordinate */1], locatable2);
        } else {
          return false;
        }
      };
      return /* module */[/* compare */compare];
    });
}

function getXCoordinate(unit) {
  return unit[/* x */0];
}

function getYCoordinate(unit) {
  return unit[/* y */1];
}

var Unit = /* module */[
  /* getXCoordinate */getXCoordinate,
  /* getYCoordinate */getYCoordinate
];

function compare(locatable1, locatable2) {
  if (locatable1[/* x */0] === locatable2[/* x */0]) {
    return locatable1[/* y */1] === locatable2[/* y */1];
  } else {
    return false;
  }
}

var LocatableUnit = /* module */[/* compare */compare];

exports.createEquipment = createEquipment;
exports.compareUnitSpeed = compareUnitSpeed;
exports.determineTurnOrder = determineTurnOrder;
exports.createUnit = createUnit;
exports.getTotalAttack = getTotalAttack;
exports.isAlive = isAlive;
exports.Make = Make;
exports.MakeGeneric = MakeGeneric;
exports.Unit = Unit;
exports.LocatableUnit = LocatableUnit;
/* Skill Not a pure module */

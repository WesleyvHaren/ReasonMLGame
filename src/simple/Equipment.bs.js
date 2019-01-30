'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

function createEquipable(attackModifier, hpModifier, equipmentType) {
  return /* record */[
          /* attackModifier */attackModifier,
          /* hpModifier */hpModifier,
          /* equipmentType */equipmentType
        ];
}

function getAttackModifier(equipable) {
  return equipable[/* attackModifier */0];
}

function getHpModifier(equipable) {
  return equipable[/* hpModifier */1];
}

function creatEquipment(leftArm, rightArm) {
  return /* record */[
          /* leftArm */leftArm,
          /* rightArm */rightArm
        ];
}

function createItem(itemTypes) {
  switch (itemTypes) {
    case 0 : 
        return /* record */[
                /* attackModifier */1,
                /* hpModifier */0,
                /* equipmentType : LeftArm */0
              ];
    case 1 : 
        return /* record */[
                /* attackModifier */0,
                /* hpModifier */1,
                /* equipmentType : RightArm */1
              ];
    case 2 : 
        return /* record */[
                /* attackModifier */3,
                /* hpModifier */0,
                /* equipmentType : TwoHanded */2
              ];
    case 3 : 
        return /* record */[
                /* attackModifier */0,
                /* hpModifier */0,
                /* equipmentType : LeftArm */0
              ];
    case 4 : 
        return /* record */[
                /* attackModifier */0,
                /* hpModifier */0,
                /* equipmentType : RightArm */1
              ];
    
  }
}

function equip(equipment, equipable) {
  var match = equipable[/* equipmentType */2];
  switch (match) {
    case 0 : 
        return /* record */[
                /* leftArm */equipable,
                /* rightArm */equipment[/* rightArm */1]
              ];
    case 1 : 
        var match$1 = equipment[/* leftArm */0][/* equipmentType */2] === /* TwoHanded */2;
        return /* record */[
                /* leftArm */match$1 ? /* record */[
                    /* attackModifier */0,
                    /* hpModifier */0,
                    /* equipmentType : LeftArm */0
                  ] : equipment[/* leftArm */0],
                /* rightArm */equipable
              ];
    case 2 : 
        return /* record */[
                /* leftArm */equipable,
                /* rightArm : record */[
                  /* attackModifier */0,
                  /* hpModifier */0,
                  /* equipmentType : RightArm */1
                ]
              ];
    case 3 : 
        return equipment;
    
  }
}

function getStatTotal(statGetter, equipment) {
  return Curry._1(statGetter, equipment[/* leftArm */0]) + Curry._1(statGetter, equipment[/* rightArm */1]) | 0;
}

function getAttackModifierTotal(param) {
  return getStatTotal(getAttackModifier, param);
}

function getHpModifierTotal(param) {
  return getStatTotal(getHpModifier, param);
}

exports.createEquipable = createEquipable;
exports.getAttackModifier = getAttackModifier;
exports.getHpModifier = getHpModifier;
exports.creatEquipment = creatEquipment;
exports.createItem = createItem;
exports.equip = equip;
exports.getStatTotal = getStatTotal;
exports.getAttackModifierTotal = getAttackModifierTotal;
exports.getHpModifierTotal = getHpModifierTotal;
/* No side effect */

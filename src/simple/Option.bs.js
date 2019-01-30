'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function map(fn, option) {
  if (option !== undefined) {
    return Js_primitive.some(Curry._1(fn, Js_primitive.valFromOption(option)));
  }
  
}

function optionStringtoString(option) {
  if (option !== undefined) {
    return option;
  } else {
    return "leeg";
  }
}

function optionIntToString(option) {
  return optionStringtoString(map((function (prim) {
                    return String(prim);
                  }), option));
}

function contains(option, value) {
  if (option !== undefined) {
    return Caml_obj.caml_equal(Js_primitive.valFromOption(option), value);
  } else {
    return false;
  }
}

exports.map = map;
exports.optionStringtoString = optionStringtoString;
exports.optionIntToString = optionIntToString;
exports.contains = contains;
/* No side effect */

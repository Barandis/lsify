(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by LiveScript 1.4.0
(function(){
  var table1, table2, upCaseName, id1, name, id2, age;
  table1 = [
    {
      id: 1,
      name: 'george'
    }, {
      id: 2,
      name: 'mike'
    }, {
      id: 3,
      name: 'donald'
    }
  ];
  table2 = [
    {
      id: 2,
      age: 21
    }, {
      id: 1,
      age: 20
    }, {
      id: 3,
      age: 26
    }
  ];
  upCaseName = function(it){
    return it.name = it.name.toUpperCase();
  };
  JSON.stringify(
  each(upCaseName)(
  sortBy(function(it){
    return it.id;
  })(
  (function(){
    var i$, ref$, len$, ref1$, j$, len1$, ref2$, results$ = [];
    for (i$ = 0, len$ = (ref$ = table1).length; i$ < len$; ++i$) {
      ref1$ = ref$[i$], id1 = ref1$.id, name = ref1$.name;
      for (j$ = 0, len1$ = (ref1$ = table2).length; j$ < len1$; ++j$) {
        ref2$ = ref1$[j$], id2 = ref2$.id, age = ref2$.age;
        if (id1 === id2) {
          results$.push({
            id: id1,
            name: name,
            age: age
          });
        }
      }
    }
    return results$;
  }()))));
}).call(this);


},{}]},{},[1]);

// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function test(expectation, f) {
  var stack;
  try {
    f();
  } catch (e) {
    stack = e.stack;
  }
  print(stack);
  assertTrue(stack.indexOf("at eval (evaltest:" + expectation + ")") > 0);
}

test("1:5", new Function(
    '1 + reference_error //@ sourceURL=evaltest'));
test("2:6", new Function(
    'x', '\n 1 + reference_error //@ sourceURL=evaltest'));
test("2:6", new Function(
    'x\n\n', "z//\n", "y", '\n 1 + reference_error //@ sourceURL=evaltest'));
test("1:5", new Function(
    'x/*', "z//\n", "y*/", '1 + reference_error //@ sourceURL=evaltest'));
test("2:6", eval(
    '(function () {\n 1 + reference_error //@ sourceURL=evaltest\n})'));

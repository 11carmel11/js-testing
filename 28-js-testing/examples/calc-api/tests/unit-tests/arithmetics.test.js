const { add, sub, multiply, divide } = require('./../../src/services/arithmetics');

test('1 + 2 = 3', () => {
  expect(add(1, 2)).toBe(3);
})

test('3 - 2 = 1', () => {
  expect(sub(3, 2)).toBe(1);
})

test('2 * 3 = 6', () => {
  expect(multiply(2, 3)).toBe(6);
})

test('6 / 3 = 2', () => {
  expect(divide(6, 3)).toBe(2);
})

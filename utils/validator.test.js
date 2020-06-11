const validator = require('./validator');

test('Has protocol uremont.com to equal false', () => {
  expect(validator.hasProtocol('uremont.com')).toBe(false);
});

test('Has www uremont.com to equal true', () => {
  expect(validator.hasWWW('www.uremont.com')).toBe(true);
});

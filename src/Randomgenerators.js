export function getRandomInt(max) {
  const c = Math.floor(Math.random() * max);
  return c;
}

export function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const sample = require('./sample/sample');
// const sample = [...Array(n).map(() => Math.random())];

const n = sample.length;
const k = 30;
const a = 5;

const observed = sample.sort();
const expected = Array(k).fill(0);

for (let index = 0; index < k; index++) {
  expected[index] = (index + 1) / k;
}

const accumulatedAbsoluteDifference = Array(k).fill(0);

for (let index = 0; index < k; index++) {
  accumulatedAbsoluteDifference[index] = Math.abs(
    expected[index] - observed[index]
  );
}

const maxAccumulatedAbsoluteDifference = Math.max(
  ...accumulatedAbsoluteDifference
);

console.log(
  `La diferencia máxima observada Dmax=${maxAccumulatedAbsoluteDifference}, comparar con el valor crítico para un nivel de significancia del ${a}\nSi Dmax empírico es mayor que D(${n},${a}) teórico se rechaza Ho, en caso contrario no se rechaza.`
);

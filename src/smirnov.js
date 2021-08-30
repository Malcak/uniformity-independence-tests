const groupBy = require('lodash.groupby');

const n = 100;
const k = 10;
const ei = 10;
const a = 0.01;

const expected = Array(k).fill(ei);
const observed = Array(k).fill(0);

const sample = [...Array(n).map(() => Math.random())];
// const sample = [];

const grouper = (value) => {
  for (let index = 1; index < k; index++) {
    const group = index / k;
    if (value < group) {
      return group;
    }
  }
};

const groupedSample = Object.values(groupBy(sample.sort(), grouper));

for (let index = 0; index < groupedSample.length; index++) {
  observed[index] = groupedSample[index].length;
}

// borrar esta línea
xobserved = [14, 15, 9, 8, 4, 11, 10, 10, 7, 12];

const sumObserved = Array(k).fill(0);
const sumExpected = Array(k).fill(0);

for (let index = 0; index < k; index++) {
  if (index != 0) {
    sumObserved[index] = xobserved[index] + sumObserved[index - 1];
    sumExpected[index] = expected[index] + sumExpected[index - 1];
  } else {
    sumObserved[index] = xobserved[index];
    sumExpected[index] = expected[index];
  }
}

const empiricalCumulativeFunction = sumObserved.map((value) => value / n);
const theoricalCumulativeFunction = sumExpected.map((value) => value / n);

const accumulatedAbsoluteDifference = Array(k).fill(0);

for (let index = 0; index < k; index++) {
  accumulatedAbsoluteDifference[index] = Math.abs(
    theoricalCumulativeFunction[index] - empiricalCumulativeFunction[index]
  );
}

const maxAccumulatedAbsoluteDifference = Math.max(
  ...accumulatedAbsoluteDifference
);

console.log(
  `La diferencia máxima observada Dmax=${maxAccumulatedAbsoluteDifference}, comparar con el valor crítico para un nivel de significancia del ${a}\nSi Dmax empírico es mayor que D(${n},${a}) teórico se rechaza Ho, en caso contrario no se rechaza.`
);

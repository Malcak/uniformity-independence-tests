const groupBy = require('lodash.groupby');
const ChiSqTest = require('chi-sq-test');

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

console.log(
  `El estadístico de prueba X²=${
    ChiSqTest.gof(xobserved, expected, a).value
  }, comparar con el valor crítico X² con ${k - 1} y ${
    1 - a
  }\nSi X² empírico es mayor que X² teórico se rechaza Ho, en caso contrario no se rechaza.`
);

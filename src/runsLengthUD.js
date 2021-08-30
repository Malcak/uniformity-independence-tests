const groupBy = require('lodash.groupby');
const ChiSqTest = require('chi-sq-test');

const fact = (num) => {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * fact(num - 1);
  }
};

const isRunLengthLessThanFive = (array) => {
  return array.some((n) => n < 5);
};

const sample = require('./sample/sample');
// const sample = [...Array(n).map(() => Math.random())];

const n = sample.length;
const a = 0.05;

const runsSequence = Array(n - 1); // 0 for - and 1 for +
for (let index = 0; index < n - 1; index++) {
  runsSequence[index] = sample[index] <= sample[index + 1] ? 1 : 0;
}

const runsList = [];
let tmpList = [];

for (let index = 0; index < runsSequence.length; index++) {
  const element = runsSequence[index];
  if (tmpList.length === 0) {
    tmpList.push(element);
  } else if (element == tmpList[tmpList.length - 1]) {
    tmpList.push(element);
  } else if (element != tmpList[tmpList.length - 1]) {
    runsList.push(tmpList.length);
    tmpList = [element];
  }
}
runsList.push(tmpList.length);

const groupedRuns = Object.values(groupBy(runsList));
const runsIntervals = Object.keys(groupBy(runsList));

const observedRunsLength = [];
for (let index = 0; index < groupedRuns.length; index++) {
  observedRunsLength[index] = groupedRuns[index].length;
}

const expectedRunsLength = [];
for (let index = 0; index < runsIntervals.length; index++) {
  const i = Number(runsIntervals[index]);

  if (i <= n - 2) {
    expectedRunsLength[index] =
      (2 / fact(i + 3)) *
      (n * (Math.pow(i, 2) + 3 * i + 1) -
        (Math.pow(i, 3) + 3 * Math.pow(i, 2) - i - 4));
  } else if (i == n - 1) {
    expectedRunsLength[index] = 2 / fact(n);
  }
}

while (isRunLengthLessThanFive(expectedRunsLength)) {
  expectedRunsLength[expectedRunsLength.length - 2] =
    expectedRunsLength[expectedRunsLength.length - 2] +
    expectedRunsLength.pop();

  observedRunsLength[observedRunsLength.length - 2] =
    observedRunsLength[observedRunsLength.length - 2] +
    observedRunsLength.pop();
}

const empA = observedRunsLength.reduce((acc, el) => acc + el);
const theA = expectedRunsLength.reduce((acc, el) => acc + el);

// WARN: solo en caso de que el valor teórico se pase del número de rachas
expectedRunsLength[expectedRunsLength.length - 1] -= theA - empA;

console.log(
  `El estadístico de prueba X²=${
    ChiSqTest.gof(observedRunsLength, expectedRunsLength, a).value
  }, comparar con el valor crítico X² con ${expectedRunsLength.length - 1} y ${
    1 - a
  }\nSi X² empírico es mayor que X² teórico se rechaza Ho, en caso contrario no se rechaza.`
);

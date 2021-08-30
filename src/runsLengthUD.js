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

const n = 100;
const a = 0.05;

const sample = [
  0.95, 0.97, 0.83, 0.72, 0.35, 0.12, 0.08, 0.91, 0.23, 0.69, 0.62, 0.96, 0.71,
  0.08, 0.57, 0.26, 0.92, 0.64, 0.07, 0.18, 0.98, 0.75, 0.22, 0.09, 0.01, 0.79,
  0.17, 0.36, 0.15, 0.14, 0.03, 0.38, 0.51, 0.17, 0.93, 0.51, 0.23, 0.26, 0.99,
  0.14, 0.42, 0.77, 0.34, 0.63, 0.21, 0.09, 0.11, 0.37, 0.73, 0.58, 0.41, 0.72,
  0.1, 0.64, 0.38, 0.07, 0.45, 0.62, 0.14, 0.78, 0.9, 0.91, 0.81, 0.23, 0.58,
  0.87, 0.52, 0.8, 0.61, 0.89, 0.4, 0.87, 0.11, 0.34, 0.56, 0.8, 0.22, 0.6,
  0.14, 0.97, 0.05, 0.03, 0.26, 0.76, 0.73, 0.02, 0.04, 0.55, 0.39, 0.94, 0.61,
  0.7, 0.16, 0.17, 0.1, 0.59, 0.14, 0.07, 0.62, 0.6,
];

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

const groupBy = require('lodash.groupby');
const ChiSqTest = require('chi-sq-test');

const isRunLengthLessThanFive = (array) => {
  return array.some((n) => n < 5);
};

const n = 30; // tamaño de la muestra
const a = 0.05; // nivel de significancia

const sample = [
  0.1998, 0.945, 0.8811, 0.2639, 0.2522, 0.6555, 0.5317, 0.8529, 0.3486, 0.732,
  0.5175, 0.881, 0.5917, 0.1287, 0.6151, 0.9163, 0.3616, 0.1334, 0.8237, 0.9881,
  0.3897, 0.5062, 0.7266, 0.7804, 0.7038, 0.9245, 0.0663, 0.1294, 0.5792,
  0.4948,
];

// creo la secuencia +-+-+++...
const runsSequence = Array(n);
for (let index = 0; index < n; index++) {
  runsSequence[index] = sample[index] < 0.5 ? 0 : 1;
}

console.log(runsSequence);

const runsList = [];
let tmpList = [];

// agrupo los valores en rachas
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

// agrupo las rachas de una misma longitud [1, 2, 3, 4, ...] y extraigo esos intervalos
let groupedRuns = Object.values(groupBy(runsList));
let runsIntervals = Object.keys(groupBy(runsList));

// en caso de que no exista ninguna racha para un intervalo X lo lleno con un array vacio
for (let index = 0; index < Math.max(...runsIntervals); index++) {
  if (Number(runsIntervals[index]) != index + 1) {
    groupedRuns.splice(index, 0, []);
    runsIntervals.splice(index, 0, String(index + 1));
  }
}

// extraigo la longitud de racha para cada intervalo
const observedRunsLength = [];
for (let index = 0; index < Math.max(...runsIntervals); index++) {
  observedRunsLength[index] = groupedRuns[index].length;
}

// calculo n1 y n2
const n1 = Object.values(groupBy(runsSequence.sort()))[0].length;
const n2 = Object.values(groupBy(runsSequence.sort()))[1].length;

// calculo la longitud de racha teórico para cada intervalo
const expectedRunsLength = [];
for (let index = 0; index < Math.max(...runsIntervals); index++) {
  const i = index + 1;
  expectedRunsLength[index] = 2 * n * Math.pow(n1 / n, i) * Math.pow(n2 / n, 2);
}

console.log(expectedRunsLength);

// mientras la longitud de racha en los ultimos intervalos sea menor a 5 sumo los últimos valores
while (isRunLengthLessThanFive(expectedRunsLength)) {
  expectedRunsLength[expectedRunsLength.length - 2] =
    expectedRunsLength[expectedRunsLength.length - 2] +
    expectedRunsLength.pop();

  observedRunsLength[observedRunsLength.length - 2] =
    observedRunsLength[observedRunsLength.length - 2] +
    observedRunsLength.pop();
}

const empB = observedRunsLength.reduce((acc, el) => acc + el);
const theB = expectedRunsLength.reduce((acc, el) => acc + el);

// calculo la longitud faltante para completar el total de rachas
expectedRunsLength[expectedRunsLength.length - 1] -= theB - empB;

console.log(
  `El estadístico de prueba X²=${
    ChiSqTest.gof(observedRunsLength, expectedRunsLength, a).value
  }, comparar con el valor crítico X² con ${expectedRunsLength.length - 1} y ${
    1 - a
  }\nSi X² empírico es mayor que X² teórico se rechaza Ho, en caso contrario no se rechaza.`
);

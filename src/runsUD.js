const groupBy = require('lodash.groupby');

const n = 30; // tamaño de la muestra
const a = 0.05; // grados de libertad

const sample = [
  0.1998, 0.945, 0.8811, 0.2639, 0.2522, 0.6555, 0.5317, 0.8529, 0.3486, 0.732,
  0.5175, 0.881, 0.5917, 0.1287, 0.6151, 0.9163, 0.3616, 0.1334, 0.8237, 0.9881,
  0.3897, 0.5062, 0.7266, 0.7804, 0.7038, 0.9245, 0.0663, 0.1294, 0.5792,
  0.4948,
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

const runsLength = [];
for (let index = 0; index < groupedRuns.length; index++) {
  runsLength[index] = groupedRuns[index].length;
}

const A = runsLength.reduce((acc, el) => acc + el);

const mu = (2 * n - 1) / 3;

const sigma = Math.sqrt((16 * n - 29) / 90);

const Z = (A - mu) / sigma;

console.log(
  `El estadístico de prueba Z=${Math.abs(
    Z
  )}, comparar con el valor crítico Z con ${
    1 - a / 2
  }\nSi Z empírico es mayor que Z teórico se rechaza Ho, en caso contrario no se rechaza.`
);

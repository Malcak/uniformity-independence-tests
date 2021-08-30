const groupBy = require('lodash.groupby');

const n = 30; // tamaño de la muestra
const a = 0.05; // nivel de significancia

const sample = [
  0.1998, 0.945, 0.8811, 0.2639, 0.2522, 0.6555, 0.5317, 0.8529, 0.3486, 0.732,
  0.5175, 0.881, 0.5917, 0.1287, 0.6151, 0.9163, 0.3616, 0.1334, 0.8237, 0.9881,
  0.3897, 0.5062, 0.7266, 0.7804, 0.7038, 0.9245, 0.0663, 0.1294, 0.5792,
  0.4948,
];

// creo la secuencia de +-+-+-+--...
const runsSequence = Array(n);
for (let index = 0; index < n; index++) {
  runsSequence[index] = sample[index] < 0.5 ? 0 : 1;
}

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

// agrupo las rachas de una misma longitud [1, 2, 3, 4, ...]
const groupedRuns = Object.values(groupBy(runsList));

const runsLength = [];
for (let index = 0; index < groupedRuns.length; index++) {
  runsLength[index] = groupedRuns[index].length;
}

// calculo el total de rachas
const B = runsLength.reduce((acc, el) => acc + el);

// calculo n1 y n2
const n1 = Object.values(groupBy(runsSequence.sort()))[0].length;
const n2 = Object.values(groupBy(runsSequence.sort()))[1].length;

// calculo el estaditico de prueba Z
const mu = (2 * n1 * n2) / (n1 + n2) + 1;

const sigma = Math.sqrt(
  (2 * n1 * n1 * (2 * n1 * n2 - n1 - n2)) /
    (Math.pow(n1 + n2, 2) * (n1 + n2 - 1))
);

const Z = (B - mu) / sigma;

console.log(
  `El estadístico de prueba Z=${Math.abs(
    Z
  )}, comparar con el valor crítico Z con ${
    1 - a / 2
  }\nSi Z empírico es mayor que Z teórico se rechaza Ho, en caso contrario no se rechaza.`
);

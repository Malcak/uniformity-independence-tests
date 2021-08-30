const n = 19;
const k = 19;
const a = 5;

const sample = [
  0.245, 0.69, 0.58, 0.09, 0.77, 0.56, 0.59, 0.54, 0.56, 0.03, 0.75, 0.93, 0.55,
  0.75, 0.47, 0.744, 0.85, 0.86, 0.53,
];

// const sample = [
//   0.066, 0.075, 0.08, 0.119, 0.178, 0.228, 0.262, 0.348, 0.573, 0.62, 0.635,
//   0.695, 0.709, 0.719, 0.829, 0.908, 0.916, 0.945, 0.964, 0.973,
// ];

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

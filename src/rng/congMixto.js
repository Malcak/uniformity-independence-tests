const M = 100; // cifras
const a = 13; // constante multiplicativa
const C = 7; // constante aditiva

let x = 3; // semilla del generador

let index = 0;
do {
  x = (a * x + C) % M;
  console.log(x / M);
  index++;
} while (index < 15);

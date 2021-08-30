# Pruebas de uniformidad

Hipótesis nula (H0): La secuencia de números se distribuyen uniformemente en el intervalo (0,1).

Hipótesis alternativa (H1): La secuencia de números **NO** se distribuyen uniformemente en el intervalo (0,1).

> La hipótesis nula no se acepta, se rechaza o no se rechaza

> La hipótesis alternativa sí se puede aceptar o rechazar

# Pruebas de independencia

Hipótesis nula (H0): No existe una correlación entre la secuencia de números.

Hipótesis alternativa (H1): ?

> La hipótesis nula no se acepta, se rechaza o no se rechaza

> La hipótesis alternativa sí se puede aceptar o rechazar

# Correr cada prueba

## Chi Squared test

```
npm run chiSquare
```

## Smirnov - Kolmogrov

```
npm run smirnov
```

## Smirnov con valores individuales

```
npm run smirnovNG
```

## Rachas ascendentes y descendentes

```
npm run runsUD
```

## Rachas por encima y por debajo de la media

```
npm run runsAB
```

## Longitud de rachas ascendentes y descendentes

```
npm run runsLenUD
```

## Longitud de rachas por encima y por debajo de la media

```
npm run runsLenAB
```

# Generar números aleatorios

Para cambiar la cantidad de números generados modificar el archvo en /src/rng/congMixto.js

```
npm run rng
```

# Cambiar la muestra

Para cambiar la muestra hay que modificar el archivo /src/sample/sample.js

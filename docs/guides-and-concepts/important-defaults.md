# Valores Por-Defecto Importantes

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/important-defaults)
:::

Fuera de la caja, TanStack Query está configurado con valores predeterminados **agresivos pero sensatos. A veces, estos valores predeterminados pueden tomar desprevenidos a los nuevos usuarios o dificultar el aprendizaje/depuración si el usuario los desconoce**. Téngalos en cuenta a medida que continúa aprendiendo y utilizando TanStack Query:

- Las instancias de consulta mediante `useQuery` o `useInfiniteQuery` **consideran** de forma predeterminada **que los datos almacenados en caché están obsoletos**.

>_"Para cambiar este comportamiento, puede configurar sus consultas tanto globalmente como por consulta usando la opción `staleTime`. Especificar un `staleTime` más largo significa que las consultas no recuperarán sus datos con tanta frecuencia."_

- Las consultas obsoletas se recuperan automáticamente en segundo plano cuando:

  - Nuevas instancias del montaje de consultas.
  - La ventana se reenfoca
  - La red se vuelve a conectar.
  - La consulta se configura opcionalmente con un intervalo de recuperación

>_"Para cambiar esta funcionalidad, puede utilizar opciones como `refetchOnMount`, `refetchOnWindowFocus`, `refetchOnReconnect` y `refetchInterval`."_

- Los resultados de las consultas que no tienen más instancias activas de `useQuery`, `useInfiniteQuery` u observadores de consultas se etiquetan como "inactive" y permanecen en la memoria caché en caso de que se vuelvan a utilizar más adelante.

- De forma predeterminada, las consultas "inactive" se recolectan como basura después de **5 minutos**.

>_"Para cambiar esto, puede modificar el `gcTime` predeterminado para consultas a un valor distinto de `1000 * 60 * 5` milisegundos."_

- Las consultas que fallan **se reintentan silenciosamente 3 veces, con un retraso exponencial** antes de capturar y mostrar un error en la interfaz de usuario.

>_"Para cambiar esto, puede modificar las opciones predeterminadas de `retry` y `retryDelay` para consultas a algo distinto de `3` y la función de retroceso exponencial predeterminada."_

- Los resultados de la consulta de forma predeterminada se **comparten estructuralmente para detectar si los datos realmente han cambiado** y, de lo contrario, **la referencia de los datos permanece sin cambios** para ayudar mejor con la estabilización del valor con respecto a useMemo y useCallback. Si este concepto te suena extraño, ¡no te preocupes! El 99,9% de las veces no necesitarás desactivar esto y hará que tu aplicación tenga más rendimiento sin costo alguno para ti.

>_"El uso compartido estructural solo funciona con valores compatibles con JSON; cualquier otro tipo de valor siempre se considerará modificado. Si observa problemas de rendimiento debido a respuestas grandes, por ejemplo, puede desactivar esta función con el indicador `config.structuralSharing`. Si está tratando con valores no compatibles con JSON en las respuestas de su consulta y aún desea detectar si los datos han cambiado o no, puede proporcionar su propia función personalizada como `config.structuralSharing` para calcular un valor a partir de las respuestas antiguas y nuevas, conservando las referencias. según sea necesario."_

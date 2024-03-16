# Modo Red

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/network-mode)
:::

TanStack Query proporciona tres modos de red diferentes para distinguir cómo deben comportarse las [Consultas](./queries.html) y las [Mutaciones](./mutations.html) si no tiene conexión de red. Este modo se puede configurar para cada Consulta / Mutación individualmente o globalmente a través de los valores predeterminados de consulta / mutación.

Dado que TanStack Query se utiliza con mayor frecuencia para la recuperación de datos en combinación con bibliotecas de recuperación de datos, el modo de red predeterminado es [en línea](./network-mode.html#modo-de-red-en-linea).

## Modo de Red: online

En este modo, las consultas y mutaciones no se activarán a menos que tenga una conexión de red. Este es el modo por defecto. Si se inicia una recuperación para una consulta, siempre permanecerá en el `state` (`pending`, `error`, `success`) en el que se encuentra si la recuperación no se puede realizar porque no hay conexión de red. Sin embargo, también se expone un [fetchStatus](./queries.html#fetchstatus). Esto puede ser:


- `fetching`: El `queryFn` realmente se está ejecutando: una solicitud está en curso.
- `paused`: La consulta no se está ejecutando; está `paused` hasta que vuelva a tener conexión
- `idle`: La consulta no está recuperando ni pausada


Los indicadores `isFetching` e `isPaused` se derivan de este estado y se exponen por conveniencia.

>_"Tenga en cuenta que puede que no sea suficiente comprobar el estado `pending` para mostrar un control giratorio de carga. Las consultas pueden estar en `state: 'pending`, pero `fetchStatus: 'paused'` si se están montando por primera vez y no tiene conexión de red."_


Si se ejecuta una consulta porque está en línea, pero se desconecta mientras aún se realiza la recuperación, TanStack Query también pausará el mecanismo de reintento. Las consultas pausadas continuarán ejecutándose una vez que recupere la conexión de red. Esto es independiente de `refetchOnReconnect` (que también es `true` por defecto en este modo), porque no es un `refetch`, sino un `continue`. Si mientras tanto la consulta ha sido [cancelada](./query-cancellation.html), no continuará.

## Modo de Red: always

En este modo, TanStack Query siempre buscará e ignorará el estado online / offline. Es probable que este sea el modo que desee elegir si utiliza TanStack Query en un entorno donde no necesita una conexión de red activa para que sus consultas funcionen; si acaba de leer desde `AsyncStorage`, o si simplemente desea devolver `Promise.resolve(5)` desde su `queryFn`.

- Las consultas nunca serán `paused` porque no tengas conexión de red.
- Los reintentos tampoco se detendrán: su consulta pasará al estado `error` si falla.
- `refetchOnReconnect` el valor predeterminado es `false` en este modo, porque volver a conectarse a la red ya no es un buen indicador de que las consultas obsoletas deben recuperarse. Aún puedes activarlo si lo deseas.

## Modo de Red: offlineFirst

Este modo es el punto medio entre las dos primeras opciones, donde TanStack Query ejecutará `queryFn` una vez, pero luego pausará los reintentos. Esto es muy útil si tiene un _serviceWorker_ que intercepta una solicitud de almacenamiento en caché como en una [PWA primero fuera de línea](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers), o si usa el almacenamiento en caché HTTP a través del [encabezado de Control de Caché.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#the_cache-control_header).

En esas situaciones, la primera recuperación puede tener éxito porque proviene de un _offline storage / cache_. Sin embargo, si hay una pérdida de caché, la solicitud de red se interrumpirá y fallará, en cuyo caso este modo se comporta como una consulta `online`: pausa los reintentos.


## Herramientas de Desarrollo

[TanStack Query Devtools](../get-start/devtools.html) mostrará las consultas en un estado `paused` si se están recuperando, pero no hay conexión de red. También hay un botón de alternancia para _Simular el comportamiento fuera de línea_. Tenga en cuenta que este botón en realidad _no_ afectará su conexión de red (puede hacerlo en las herramientas de desarrollo del navegador), pero configurará [OnlineManager](https://tanstack.com/query/latest/docs/reference/onlineManager) en un estado fuera de línea.


## Signatura

- `networkMode: 'online' | 'always' | 'offlineFirst'`
  - opcional
  - por defecto a `'online'`



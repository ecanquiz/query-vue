# Reintentos de Consulta

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/query-retries)
:::

Cuando falla una consulta `useQuery` (la función de consulta arroja un error), TanStack Query reintentará automáticamente la consulta si la solicitud de esa consulta no ha alcanzado el número máximo de reintentos consecutivos (el valor predeterminado es `3`) o se proporciona una función para determinar si se permite un reintento.

Puede configurar reintentos tanto a nivel global como a nivel de consulta individual.


- Establecer `retry = false` deshabilitará los reintentos.
- Establecer `retry = 6` reintentará las solicitudes fallidas `6` veces antes de mostrar el error final arrojado por la función.
- Establecer `retry = true` reintentará infinitamente las solicitudes fallidas.
- Establecer `retry = (failureCount, error) => ...` permite una lógica personalizada basada en el motivo por el cual falló la solicitud.


>_"En el servidor, los reintentos están predeterminados en `0` para que el procesamiento del servidor sea lo más rápido posible."_


```ts
import { useQuery } from '@tanstack/vue-query'

// Make a specific query retry a certain number of times
const result = useQuery({
  queryKey: ['todos', 1],
  queryFn: fetchTodoListPage,
  retry: 10, // Will retry failed requests 10 times before displaying an error
})
```

>_"Info: El contenido de la propiedad `error` formará parte de la propiedad de respuesta `failureReason` de `useQuery` hasta el último reintento. Entonces, en el ejemplo anterior, cualquier contenido de error será parte de la propiedad `failureReason` durante los primeros 9 intentos de reintento (10 intentos en total) y, finalmente, será parte del `error` después del último intento si el error persiste después de todos los reintentos."_


## Retardo de Reintento

De forma predeterminada, los reintentos en TanStack Query no ocurren inmediatamente después de que falla una solicitud. Como es estándar, se aplica gradualmente un retraso de retroceso a cada reintento.

El `retryDelay` predeterminado está configurado para duplicarse (comenzando en `1000`ms) con cada intento, pero no excede los 30 segundos:


```ts
import { VueQueryPlugin } from '@tanstack/vue-query'

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  },
}
app.use(VueQueryPlugin, vueQueryPluginOptions)
```

Aunque no se recomienda, obviamente puede anular la function/integer de `retryDelay` tanto en el complemento como en las opciones de consulta individuales. Si se establece en un número entero en lugar de una función, el retraso siempre será la misma cantidad de tiempo:


```ts
const result = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
  retryDelay: 1000, // Will always wait 1000ms to retry, regardless of how many retries
})
```


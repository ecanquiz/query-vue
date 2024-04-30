# Deshabilitar/Pausar Consultas

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/disabling-queries)
:::

Si alguna vez desea desactivar una consulta para que no se ejecute automáticamente, puede usar la opción `enabled = false`.

Cuando `enabled` es `false`:

- Si la consulta tiene datos almacenados en caché, la consulta se inicializará en el `status === 'success'` o estado `isSuccess`.
- Si la consulta no tiene datos almacenados en caché, entonces la consulta comenzará en el `status === 'pending'` y `fetchStatus === 'idle'`.
- La consulta no se buscará automáticamente en el montaje.
- La consulta no se volverá a vuscar automáticamente en segundo plano.
- La consulta ignorará las llamadas `invalidateQueries` y `refetchQueries` del cliente de consulta que normalmente darían como resultado la recuperación de la consulta.
- El `refetch` devuelto por `useQuery` se puede utilizar para activar manualmente la consulta para recuperar. Sin embargo, no funcionará con `skipToken`.

>_Los usuarios de Typescript pueden preferir usar [skipToken](./disabling-queries.html#deshabilitacion-de-consultas-con-seguridad-tipografica-mediante-skiptoken) como alternativa a [enable = false]._

```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
  enabled: false,
})
</script>

<template>
  <button @click="refetch">Fetch Todos</button>
  <span v-if="isIdle">Not ready...</span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <div v-else-if="data">
    <span v-if="isFetching">Fetching...</span>
    <ul>
      <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
    </ul>
  </div>
</template>
```

Al deshabilitar permanentemente una consulta, se excluyen muchas características excelentes que **TanStack Query** tiene para ofrecer (como recuperaciones en segundo plano), y tampoco es la forma idiomática. Lo lleva del enfoque declarativo (que define las dependencias cuando debe ejecutarse su consulta) a un modo imperativo (buscar cada vez que hago clic aquí). Tampoco es posible pasar parámetros para `refetch`. A menudo, todo lo que desea es una consulta diferida que posponga la búsqueda inicial:

## Consultas Diferidas

La opción habilitada no solo se puede utilizar para deshabilitar permanentemente una consulta, sino también para habilitarla/deshabilitarla en un momento posterior. Un buen ejemplo sería un formulario de filtro en el que solo desea activar la primera solicitud una vez que el usuario haya ingresado un valor de filtro:




```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const filter = ref('')
const isEnabled = computed(() => !!filter.value)
const { data } = useQuery({
  queryKey: ['todos', filter],
  queryFn: () => fetchTodos(filter),
  // ⬇️ disabled as long as the filter is empty
  enabled: isEnabled,
})
</script>

<template>
  <span v-if="data">Filter was set and data is here!</span>
</template>
```

## isLoading (Previously: `isInitialLoading`)

Las consultas diferidas estarán en `status: 'pending'` desde el principio porque `pending` significa que aún no hay datos. Sin embargo, esto es técnicamente cierto, ya que actualmente no estamos obteniendo ningún dato (ya que la consulta no está habilitada), también significa que probablemente no puedas usar esta bandera para mostrar un control giratorio de carga.

Si está utilizando consultas deshabilitadas o diferidas, puede usar el indicador `isLoading` en su lugar. Es una bandera derivada que se calcula a partir de:

`isPending && isFetching`

por lo que solo será cierto si la consulta se está recuperando por primera vez.



## Deshabilitación de consultas con seguridad tipográfica mediante `skipToken`

Si está utilizando TypeScript, puede utilizar `skipToken` para deshabilitar una consulta. Esto es útil cuando desea deshabilitar una consulta basada en una condición, pero aún desea mantener la consulta segura.

>_"IMPORTANTE: `refetch` desde `useQuery` no funcionará con `skipToken`. Aparte de eso, `skipToken` funciona igual que `enabled: false`."_


```vue
<script setup>
import { useQuery, skipToken } from '@tanstack/vue-query'

const filter = ref('')
const isEnabled = computed(() => !!filter.value)
const { data } = useQuery({
  queryKey: ['todos', filter],
  // ⬇️ disabled as long as the filter is undefined or empty
  queryFn: filter ? () => fetchTodos(filter) : skipToken,
})
</script>

<template>
  <span v-if="data">Filter was set and data is here!</span>
</template>
```





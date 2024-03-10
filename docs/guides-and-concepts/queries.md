# Consultas

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/queries)
:::


## Conceptos Básicos de Consulta

Una consulta es una dependencia declarativa de una fuente de datos asincrónica que está vinculada a una **clave única**. Se puede utilizar una consulta con cualquier método basado en _Promise_ (incluidos los métodos GET y POST) para recuperar datos de un servidor. Si su método modifica datos en el servidor, le recomendamos utilizar [Mutaciones](./mutations.html) en su lugar.


Para suscribirse a una consulta en sus componentes o ganchos personalizados, llame al enlace `useQuery` con al menos:

- Una **clave única para la consulta**
- Una función que devuelve una promesa que:
  - Resuelve los datos, o
  - arroja un error


```ts
import { useQuery } from '@tanstack/vue-query'

const result = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
```

La **clave única** que proporciona se utiliza internamente para recuperar, almacenar en caché y compartir sus consultas en toda su aplicación.

El resultado de la consulta devuelto por `useQuery` contiene toda la información sobre la consulta que necesitará para crear plantillas y cualquier otro uso de los datos:

```ts
const result = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
```

El objeto `result` contiene algunos estados muy importantes que deberá conocer para ser productivo. Una consulta sólo puede estar en uno de los siguientes estados en un momento dado:


- `isPending` o `status === 'pending'` - La consulta aún no tiene datos
- `isError` o `status === 'error'` - La consulta encontró un error
- `isSuccess` o `status === 'success'` - La consulta fue exitosa y los datos están disponibles

Más allá de esos estados primarios, hay más información disponible según el estado de la consulta:

- `error`: Si la consulta está en estado `isError`, el error está disponible a través de la propiedad `error`.
- `data`: Si la consulta está en estado `isSuccess`, los datos están disponibles a través de la propiedad `data`.
- `isFetching`: En cualquier estado, si la consulta se recupera en cualquier momento (incluida la recuperación en segundo plano), `isFetching` será `true`.

Para la **mayoría** de las consultas, generalmente es suficiente verificar el estado `isPending`, luego el estado `isError` y, finalmente, asumir que los datos están disponibles y representar el estado exitoso:



```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const { isPending, isError, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
})
</script>

<template>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <!-- We can assume by this point that `isSuccess === true` -->
  <ul v-else-if="data">
    <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
  </ul>
</template>
```

Si los valores booleanos no son lo tuyo, siempre puedes usar también el `status` del estado:


```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const { status, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
})
</script>

<template>
  <span v-if="status === 'pending'">Loading...</span>
  <span v-else-if="status === 'error'">Error: {{ error.message }}</span>
  <!-- also status === 'success', but "else" logic works, too -->
  <ul v-else-if="data">
    <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
  </ul>
</template>
```

TypeScript también limitará el tipo de `data` correctamente si ha verificado si hay `pending` y `error` antes de acceder a ellos.

## FetchStatus

Además del campo `status`, también obtendrá una propiedad `fetchStatus` adicional con las siguientes opciones:

- `fetchStatus === 'fetching'` - La consulta se está recuperando actualmente.
- `fetchStatus === 'paused'` - La consulta quería recuperarse, pero está en pausa. Lea más sobre esto en la guía [Modo de Red](./network-mode).
- `fetchStatus === 'idle'` - La consulta no hace nada en este momento.

## ¿Por qué dos estados diferentes?

Las recuperaciones en segundo plano y la lógica obsoleta mientras se revalida hacen posibles todas las combinaciones de `status` y `fetchStatus`. Por ejemplo:

- una consulta en _status_ `success` generalmente estará en _fetchStatus_ `idle`, pero también podría estar en `fetching` si se está realizando una recuperación en segundo plano.
- una consulta que se monta y no tiene datos normalmente estará en _status_ `pending` y _fetchStatus_ `fetching`, pero también podría ser `paused` si no hay conexión de red.

Por lo tanto, tenga en cuenta que una consulta puede estar en _status_ `pending` sin obtener datos. Como una regla de oro:

- El `status` da información sobre la `data`: ¿Tenemos alguna o no?
- El `fetchStatus` brinda información sobre `queryFn`: ¿Se está ejecutando o no?





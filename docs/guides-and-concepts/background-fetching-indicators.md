# Indicadores de Búsqueda de Segundo Plano

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/background-fetching-indicators)
:::

El estado `status === 'pending'` de una consulta es suficiente para mostrar el estado de carga inicial de una consulta, pero a veces es posible que desee mostrar un indicador adicional de que una consulta se está recuperando en segundo plano. Para hacer esto, las consultas también le proporcionan un booleano `isFetching` que puede usar para mostrar que está en un estado de recuperación, independientemente del estado de la variable `status`:


```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos,
})
</script>

<template>
  <div v-if="isFetching">Refreshing...</div>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <!-- We can assume by this point that `isSuccess === true` -->
  <ul v-else-if="data">
    <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
  </ul>
</template>
```

## Mostrar Segundo Plano Global Obteniendo Estado de Carga

Además de los estados de carga de consultas individuales, si desea mostrar un indicador de carga global cuando se recupera alguna consulta (incluso en segundo plano), puede usar el gancho `useIsFetching`:


```vue
<script setup>
import { useIsFetching } from '@tanstack/vue-query'

const isFetching = useIsFetching()
</script>

<template>
  <div v-if="isFetching">Queries are fetching in the background...</div>
</template>
```


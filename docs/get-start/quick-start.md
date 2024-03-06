# Inicio Rápido

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/quick-start)
:::

Este fragmento de código ilustra muy brevemente los 3 conceptos centrales de Vue Query:

- [Consultas](../guides-and-concepts/queries.html)
- [Mutaciones](../guides-and-concepts/mutations.html)
- [Invalidación de Consultas](../guides-and-concepts/query-invalidation.html)

Si está buscando un ejemplo completamente funcional, eche un vistazo al [ejemplo básico codesandbox](https://tanstack.com/query/latest/docs/framework/vue/examples/basic).

```vue
<script setup>
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'

// Access QueryClient instance
const queryClient = useQueryClient()

// Query
const { isPending, isError, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos,
})

// Mutation
const mutation = useMutation({
  mutationFn: postTodo,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

function onButtonClick() {
  mutation.mutate({
    id: Date.now(),
    title: 'Do Laundry',
  })
}
</script>

<template>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <!-- We can assume by this point that `isSuccess === true` -->
  <ul v-else>
    <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
  </ul>
  <button @click="onButtonClick">Add Todo</button>
</template>
```

Estos tres conceptos constituyen la mayor parte de la funcionalidad principal de Vue Query. Las siguientes secciones de la documentación repasarán cada uno de estos conceptos básicos con gran detalle.
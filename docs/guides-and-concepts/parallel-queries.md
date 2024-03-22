# Consultas Paralelas

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/parallel-queries)
:::


Las consultas "paralelas" son consultas que se ejecutan en paralelo o al mismo tiempo para maximizar la concurrencia de recuperación.

## Consultas Paralelas Manuales

Cuando el número de consultas paralelas no cambia, no hay ningún esfuerzo adicional para utilizar consultas paralelas. ¡Simplemente use cualquier número de ganchos `useQuery` y `useInfiniteQuery` de TanStack Query uno al lado del otro!

```vue
<script setup lang="ts">
// The following queries will execute in parallel
const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
const projectsQuery = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
})
</script>
```

## Consultas Dinámicas Paralelas con `useQueries`

Si la cantidad de consultas que necesita ejecutar cambia de una renderización a otra, no puede utilizar consultas manuales ya que eso violaría las reglas de los ganchos. En cambio, TanStack Query proporciona un gancho `useQueries`, que puede utilizar para ejecutar dinámicamente tantas consultas en paralelo como desee.

`useQueries` acepta un objeto de opciones con una clave de consulta cuyo valor es una matriz de objetos de consulta. Devuelve una serie de resultados de la consulta:


```ts
const users = computed(...)
const queries = computed(() => users.value.map(user => {
    return {
      queryKey: ['user', user.id],
      queryFn: () => fetchUserById(user.id),
    }
  })
);
const userQueries = useQueries({queries: queries})
```




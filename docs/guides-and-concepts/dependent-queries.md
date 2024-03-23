# Consultas Dependientes

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/dependent-queries)
:::

## Consulta dependiente de `useQuery`

Las consultas dependientes (o en serie) dependen de que las anteriores finalicen antes de poder ejecutarse. Para lograr esto, es tan fácil como usar la opción `enabled` para indicarle a una consulta cuándo está lista para ejecutarse:


```ts
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: () => getUserByEmail(email.value),
})

const userId = computed(() => user.value?.id)
const enabled = computed(() => !!user.value?.id)

// Then get the user's projects
const { isIdle, data: projects } = useQuery({
  queryKey: ['projects', userId],
  queryFn: () => getProjectsByUser(userId.value),
  enabled, // The query will not execute until `enabled == true`
})
```

La consulta `projects` comenzará en:


```ts
status: 'pending'
isPending: true
fetchStatus: 'idle'
```

Tan pronto como el `user` esté disponible, la consulta `projects` será `enabled` y luego pasará a:


```ts
status: 'pending'
isPending: true
fetchStatus: 'fetching'
```

Una vez que tengamos los proyectos, irá a:


```ts
status: 'success'
isPending: false
fetchStatus: 'idle'
```

## Consulta dependiente de `useQueries`

Consulta paralela dinámica - `useQueries` también puede depender de una consulta anterior, aquí se explica cómo lograrlo:


```ts
// Get the users ids
const { data: userIds } = useQuery({
  queryKey: ['users'],
  queryFn: getUsersData,
  select: (users) => users.map((user) => user.id),
})

// Then get the users messages
const usersMessages = useQueries({
  queries: userIds
    ? userIds.map((id) => {
        return {
          queryKey: ['messages', id],
          queryFn: () => getMessagesByUsers(id),
        }
      })
    : [], // if users is undefined, an empty array will be returned
})
```

Tenga en cuenta que `useQueries` devuelve una serie de resultados de consultas.


## Una nota sobre el rendimiento

Las consultas dependientes, por definición, constituyen una forma de [cascada de solicitudes](../get-start/overview.html), lo que perjudica el rendimiento. Si pretendemos que ambas consultas toman la misma cantidad de tiempo, realizarlas en serie en lugar de en paralelo siempre toma el doble de tiempo, lo cual es especialmente perjudicial cuando sucede en un cliente que tiene una latencia alta. Si puede, siempre es mejor reestructurar las API de backend para que ambas consultas se puedan recuperar en paralelo, aunque esto no siempre sea factible en la práctica.

En el ejemplo anterior, en lugar de buscar primero `getUserByEmail` para ser capaz de `getProjectsByUser`, introducir una nueva consulta `getProjectsByUserEmail` aplanaría la cascada.


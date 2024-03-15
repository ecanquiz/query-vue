# Funciones de Consulta

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/query-functions)
:::

Una función de consulta puede ser literalmente cualquier función que **devuelva una promesa**. La promesa que se devuelve **debería resolver los datos** o **generar un error**.

Todas las siguientes son configuraciones de funciones de consulta válidas:


```ts
useQuery({ queryKey: ['todos'], queryFn: fetchAllTodos })
useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
})
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
})
```

## Manejo y Lanzamiento de Errores

Para que TanStack Query determine que una consulta tiene un error,la función de consulta **debe arrojar** o devolver una **Promesa rechazada**. Cualquier error que se produzca en la función de consulta persistirá en el estado `error` de la consulta.


```ts
const { error } = useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    if (somethingGoesWrong) {
      throw new Error('Oh no!')
    }
    if (somethingElseGoesWrong) {
      return Promise.reject(new Error('Oh no!'))
    }

    return data
  },
})
```


## Uso con `fetch` y otros clientes que no lanzan de forma predeterminada

Si bien la mayoría de las utilidades como `axios` o `graphql-request` arrojan errores automáticamente para llamadas HTTP fallidas, algunas utilidades como `fetch` no arrojan errores de forma predeterminada. Si ese es el caso, tendrás que tirarlos tú mismo. A continuación se muestra una forma sencilla de hacerlo con la popular API `fetch`:


```ts
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const response = await fetch('/todos/' + todoId)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  },
})
```

## Variables de Funciones de Consulta

Las claves de consulta no sirven solo para identificar de forma única los datos que está obteniendo, sino que también se pasan convenientemente a su función de consulta como parte del `QueryFunctionContext`. Aunque no siempre es necesario, esto permite extraer las funciones de consulta si es necesario:


```ts
const result = useQuery({
  queryKey: ['todos', { status, page }],
  queryFn: fetchTodoList,
})

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey
  return new Promise()
}
```

## Contexto de la Función de Consulta

El `QueryFunctionContext` es el objeto pasado a cada función de consulta. Consiste en:

- `queryKey: QueryKey`: [Claves de Consulta](./query-keys)
- `signal?: AbortSignal`
  - Instancia [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) proporcionada por TanStack Query
  - Se puede utilizar para [Cancelar Consultas](./query-cancellation)
- `meta: Record<string, unknown> | undefined`
  - un campo opcional que puede completar con información adicional sobre su consulta

Además, las [Consultas Infinitas](./infinite-queries) obtienen las siguientes opciones:
- `pageParam: TPageParam`
  - el parámetro de página utilizado para buscar la página actual
- `direction: 'forward' | 'backward'`
  - la dirección de búsqueda de la página actual
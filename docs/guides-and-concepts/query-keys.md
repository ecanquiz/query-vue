# Claves de Consulta

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/query-keys)
:::


En esencia, TanStack Query administra el almacenamiento en caché de consultas basado en las claves de consulta. Las claves de consulta deben ser una matriz en el nivel superior y pueden ser tan simples como una matriz con una sola cadena o tan complejas como una matriz de muchas cadenas y objetos anidados. Siempre que la clave de consulta sea serializable y **única para los datos de la consulta**, ¡puede usarla!

## Claves de Consulta Simples

La forma más simple de clave es una matriz con valores constantes. Este formato es útil para:

- Recursos genéricos de Lista/Índice
- Recursos no jerárquicos


```ts
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

## Claves de Matriz con Variables

Cuando una consulta necesita más información para describir de forma única sus datos, puede usar una matriz con una cadena y cualquier cantidad de objetos serializables para describirla. Esto es útil para:

- Recursos jerárquicos o anidados
  - Es común pasar un ID, índice u otra primitiva para identificar de forma única el elemento.
- Consultas con parámetros adicionales
  - Es común pasar un objeto de opciones adicionales


```ts
// An individual todo
useQuery({ queryKey: ['todo', 5], ... })

// An individual todo in a "preview" format
useQuery({ queryKey: ['todo', 5, { preview: true }], ...})

// A list of todos that are "done"
useQuery({ queryKey: ['todos', { type: 'done' }], ... })
```

## ¡Las Claves de Consulta tienen hash de forma determinista!

Esto significa que sin importar el orden de las claves en los objetos, todas las consultas siguientes se consideran iguales:

```ts
useQuery({ queryKey: ['todos', { status, page }], ... })
useQuery({ queryKey: ['todos', { page, status }], ...})
useQuery({ queryKey: ['todos', { page, status, other: undefined }], ... })
```

Sin embargo, las siguientes claves de consulta no son iguales. ¡El orden de los elementos de la matriz importa!


```ts
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
useQuery({ queryKey: ['todos', undefined, page, status], ...})
```

## Si su función de consulta depende de una variable, inclúyala en su clave de consulta

Dado que las claves de consulta describen de forma única los datos que están obteniendo, deben incluir cualquier variable que utilice en su función de consulta que **cambie**. Por ejemplo:

```ts
function useTodos(todoId) {
  const queryKey = ['todos', todoId]
  return useQuery(queryKey, () => fetchTodoById(todoId.value))
}
```

Tenga en cuenta que las claves de consulta actúan como dependencias para sus funciones de consulta. Agregar variables dependientes a su clave de consulta garantizará que las consultas se almacenen en caché de forma independiente y que cada vez que cambie una variable, _las consultas se recuperarán automáticamente_ (dependiendo de su configuración `staleTime`). Consulte la sección de [detalles exhaustivos](https://tanstack.com/query/latest/docs/eslint/exhaustive-deps) para obtener más información y ejemplos.

## Otras lecturas

Para obtener consejos sobre cómo organizar las Claves de Consulta en aplicaciones más grandes, consulte [Effective React Query Keys](https://tanstack.com/query/latest/docs/framework/vue/community/tkdodos-blog#8-effective-react-query-keys) y consulte [Query Key Factory Package](https://tanstack.com/query/latest/docs/framework/vue/community/community-projects#query-key-factory) en los recursos de la comunidad.
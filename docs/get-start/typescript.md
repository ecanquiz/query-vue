# TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/typescript)
:::

¡Vue Query ahora está escrito en TypeScript para garantizar que la biblioteca y sus proyectos sean seguros para escribir!

Cosas a tener en cuenta:

- Los tipos actualmente requieren el uso de TypeScript **v4.7** o superior
- Los cambios en los tipos en este repositorio se consideran **no disruptivos** y generalmente se publican como cambios de **parches** de versionado semántico (de lo contrario, cada mejora de tipos sería una versión principal).
- Se **recomienda encarecidamente que bloquee la versión de su paquete vue-query en una versión de parche específica y la actualice con la expectativa de que los tipos puedan corregirse o actualizarse entre cualquier versión**.
- La API pública no relacionada con el tipo de Vue Query todavía sigue versionado semántico muy estrictamente.

## Inferencia de Tipos

Los tipos en Vue Query generalmente fluyen muy bien, por lo que no es necesario que usted mismo proporcione anotaciones de tipo.

```ts
const { data } = useQuery({
  //    ^? const data: Ref<number> | Ref<undefined>
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPQBuOAtAEcc+KgFgAUBNYRm8JABN6DInAC8KDNlx4AFAglw4nTocMA9APwG4Q7QGl0eAFxwA2lRjoWVALoAaa1t8ADFGFx0ASjUAPjgABXIQYAwAOigvCAAbbnQdAFYIgPFCCKA)


```ts
const { data } = useQuery({
  //      ^? const data: Ref<string> | Ref<undefined>
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
  select: (data) => data.toString(),
})
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPQBuOAtAEcc+KgFgAUBNYRm8JABN6DInAC8KDNlx4AFAglw4nTodNwAegH4DcIdoDS6PAC44AbSox0LKgF0ANDZ2+ABijK46AJRqAHxwAArkIMAYAHRQ3hAANtzoOgCskYHihhhZ6KwwEYoM0apxNfSpMBAAyjBQwIwA5lHFhJFAA)

Esto funciona mejor si su `queryFn` tiene un tipo devuelto bien definido. Tenga en cuenta que la mayoría de las bibliotecas de recuperación de datos devuelven `any` de forma predeterminada, así que asegúrese de extraerlo en una función escrita correctamente:


```ts
const fetchGroups = (): Promise<Group[]> =>
  axios.get('/groups').then((response) => response.data)

const { data } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const data: Ref<Group[]> | Ref<undefined>
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPQBuOAtAEcc+KgFgAUKEiw49AB7AIqUuUpV5i1GPESYeMOjgBxcsjBwAvIjjAAJgC44jZCABGuIhImsIzeCXQYVgALEwgzZSsACgBKRwAFVWAMAB4wswBtAF0APksciThZBSUAOgBzQKiqTnLTMC0Y0phg9EYoqKh0VEhmdBj8uC6e3wxS23oGGK9xHz9rCYYiSxQMbFw8KKQhDYBpdDxHDKo68IaqLIAaOB38ADFGRwCg0PrlQmnxTk4i37gAPQA-EA)


## Estrechamiento de Tipo

Vue Query utiliza un [tipo de unión discriminada](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) para el resultado de la consulta, discriminada por el campo `status` y los indicadores _status_ de estado derivados. Esto le permitirá comprobar, por ejemplo _status_ de `success` para definir `data`:


```ts
const { data, isSuccess } = reactive(
  useQuery({
    queryKey: ['test'],
    queryFn: () => Promise.resolve(5),
  }),
)

if (isSuccess) {
  data
  // ^? const data: number
}
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPQBuOAtAEcc+KgFgAUKEixEcKOnqsYwbuiKlylKr3RUA3BImsIzeEgAm9BgBo4wVAGVkrVulSp1AXjkKlK9AAUaFjCeAEA2lQwbjBUALq2AQCUcJ4AfHAACpr26AB08qgQADaqAQCsSVWGkiRwAfZOLm6oKQgScJ1wlgwSnJydAHoA-BKEEkA)


## Tipar el Campo Error

El tipo de error predeterminado es `Error`, porque eso es lo que la mayoría de los usuarios esperan.


```ts
const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Error
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPRTr2swBaAI458VALAAoUJFhx6AD2ARUpcpSqLlqCZKkw8YdHADi5ZGDgBeRHGAATAFxxGyEACNcRKVNYRm8CToMKwAFmYQFqo2ABQAlM4ACurAGAA8ERYA2gC6AHzWBVoqAHQA5sExVJxl5mA6cSUwoeiMMTyokMzGVgUdXRgl9vQMcT6SfgG2uORQRNYoGNi4eDFZVLWR9VQ5ADSkwWGZ9WOSnJxwl1cAegD8QA)


```ts
const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Ref<unknown>

if (error.value instanceof Error) {
  error.value
  //     ^? const error: Error
}
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPRTr2swBaAI458VALAAoUJFhx6AD2ARUpcpSqLlqCZKkw8YdHADi5ZGDgBeRHGAATAFxxGyEACNcRKVNYRm8CToMKwAFmYQFqo2ABQAlM4ACurAGAA8ERYA2gC6AHzWBVoqAHQA5sExVJxl5mA6cSUwoeiMMTyokMzGVgUdXRgl9vQMcT6SfgG2uORQRNYoGNi4eDFIIisA0uh4zllUtZH1VDkANHAb+ABijM5BIeF1qoRjkpyccJ9fAHoA-OPAEhwGLFVAlVIAQSUKgAolBZjEZtA4nFEFJPkioOi4O84H8pIQgA)


```ts
const { error } = useQuery<Group[], string>(['groups'], fetchGroups)
//      ^? const error: string | null
```

```ts
import axios from 'axios'

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Error | null

if (axios.isAxiosError(error)) {
  error
  // ^? const error: AxiosError
}
```


[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPRTr2swBaAI458VALAAoUJFhx6AD2ARUpcpSqLlqCZKkw8YdHADi5ZGDgBeRHGAATAFxxGyEACNcRKVNYRm8CToMKwAFmYQFqo2ABQAlM4ACurAGAA8ERYA2gC6AHzWBVoqAHQA5sExVJxl5mA6cSUwoeiMMTyokMzGVgUdXRgl9vQMcT6SfgG2uORQRNYoGNi4eDFIIisA0uh4zllUtZH1VDkANHAb+ABijM5BIeF1qoRjkpyccJ9fAHoA-OPAEhwGLFVAlVIAQSUKgAolBZjEZtA4nFEFJPkioOi4O84H8pIQgA)


```ts
import '@tanstack/vue-query'

declare module '@tanstack/vue-query' {
  interface Register {
    defaultError: AxiosError
  }
}

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: AxiosError | null
```


## Tipar meta _Registrar Meta global_

De manera similar a registrar un [tipo de error global](https://tanstack.com/query/latest/docs/framework/vue/typescript#registering-a-global-error), también puede registrar un tipo `Meta` global. Esto garantiza que el campo `meta` opcional sobre [consultas](https://tanstack.com/query/latest/docs/framework/vue/overview) y [mutaciones](https://tanstack.com/query/latest/docs/framework/vue/overview) se mantenga coherente y tenga seguridad de escritura. Tenga en cuenta que el tipo registrado debe extender `Record<string, unknown>` para que `meta` siga siendo un objeto.



```ts
import '@tanstack/vue-query'

interface MyMeta extends Record<string, unknown> {
  // Your meta type definition.
}

declare module '@tanstack/vue-query' {
  interface Register {
    queryMeta: MyMeta
    mutationMeta: MyMeta
  }
}
```

## Tipar Opciones de Consultas


Si integra opciones de consulta en `useQuery`, obtendrá una inferencia de tipos automática. Sin embargo, es posible que desee extraer las opciones de consulta en una función separada para compartirlas entre `useQuery` y por ejemplo `prefetchQuery`. En ese caso, perderías la inferencia de tipos. Para recuperarlo, puede utilizar el asistente `queryOptions`:


```ts
import { queryOptions } from '@tanstack/vue-query'

function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

useQuery(groupOptions())
queryClient.prefetchQuery(groupOptions())
```

Además, la `queryKey` devuelta por `queryOptions` conoce la `queryFn` asociada a ella y podemos aprovechar esa información de tipo para que funciones como `queryClient.getQueryData` también tengan en cuenta esos tipos:



```ts
function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

const data = queryClient.getQueryData(groupOptions().queryKey)
//     ^? const data: Group[] | undefined
```

Sin `queryOptions`, el tipo de `data` sería `unknown`, a menos que le pasáramos un genérico:


```ts
const data = queryClient.getQueryData<Group[]>(['groups'])
```

## Otras Lecturas

Para obtener consejos y trucos sobre la inferencia de tipos, consulte [Vue Query y TypeScript](https://tanstack.com/query/latest/docs/framework/vue/community/tkdodos-blog#6-react-query-and-typescript) en los recursos de la comunidad. Para saber cómo obtener la mejor seguridad de tipos posible, puede leer [Vue Query con Tipos-seguros](https://tanstack.com/query/latest/docs/framework/vue/community/tkdodos-blog#19-type-safe-react-query).



## Desactivación segura de consultas mediante `skipToken`

Si está utilizando TypeScript, puede utilizar `skipToken` para deshabilitar una consulta. Esto es útil cuando desea deshabilitar una consulta basada en una condición, pero aún desea mantener la consulta segura. Lea más al respecto en la guía [Desactivación de Consultas](https://tanstack.com/query/latest/docs/framework/vue/guides/disabling-queries#typesafe-disabling-of-queries-using-skiptoken).



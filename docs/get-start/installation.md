# Instalación

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/installation)
:::

Puede instalar Vue Query a través de [NPM](https://www.npmjs.com/).

>_"v5 está actualmente disponible como candidato a lanzamiento. No anticipamos ningún cambio importante en la API de ahora en adelante. Le recomendamos que lo pruebe e informe cualquier problema que encuentre."_

## NPM

```sh
$ npm i @tanstack/vue-query
# or
$ pnpm add @tanstack/vue-query
# or
$ yarn add @tanstack/vue-query
# or
$ bun add @tanstack/vue-query
```

>_"¿Quieres probarlo antes de descargarlo? ¡Prueba el ejemplo [básico](https://tanstack.com/query/latest/docs/framework/vue/examples/basic)!"_


Vue Query es compatible con Vue 2.x y 3.x

>_"Si está utilizando Vue 2.6, asegúrese de configurar también [@vue/composition-api](https://github.com/vuejs/composition-api)"_


## Inicialización Vue Query

Antes de usar Vue Query, debe inicializarlo usando `VueQueryPlugin`

```ts
import { VueQueryPlugin } from '@tanstack/vue-query'

app.use(VueQueryPlugin)
```

## Uso de la _Composition API_ con `<script setup>`

Todos los ejemplos de nuestra documentación utilizan la sintaxis `<script setup>`.

Los usuarios de Vue 2 también pueden usar esa sintaxis usando [este complemento](https://github.com/antfu/unplugin-vue2-script-setup). Consulte la documentación del complemento para obtener detalles de instalación.

Si no es fanático de la sintaxis `<script setup>`, puede traducir fácilmente todos los ejemplos a la sintaxis normal de la _Composition API_ moviendo el código bajo la función `setup()` y devolviendo los valores utilizados en la plantilla.

```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos,
})
</script>

<template>...</template>
```
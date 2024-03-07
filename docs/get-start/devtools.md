# Herramientas de Desarrollo

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/devtools)
:::

Agita tus manos en el aire y grita ¡hurra porque Vue Query viene con herramientas de desarrollo dedicadas! 🥳

Cuando comience su viaje con Vue Query, querrá tener estas herramientas de desarrollo a su lado. Ayudan a visualizar todo el funcionamiento interno de Vue Query y probablemente le ahorrarán horas de depuración si se encuentra en apuros.

Lo único que debe hacer es instalar [Vue Devtools](https://devtools.vuejs.org/guide/installation.html) oficial.

Vue Query se integrará perfectamente con las herramientas de desarrollo oficiales, agregando inspectores personalizados y eventos de línea de tiempo. El código de Devtool se extraerá de los paquetes de producción de forma predeterminada.

## DevTools Basadas en Componentes (Vue 3)

Puede incorporar el componente devtools en su página utilizando un paquete dedicado.
Las herramientas de desarrollo basadas en componentes utilizan la misma implementación independiente del framework, tienen más funciones y se actualizan con más frecuencia.

El componente devtools es un paquete independiente que debe instalar:


```sh
$ npm i @tanstack/vue-query-devtools
# or
$ pnpm add @tanstack/vue-query-devtools
# or
$ yarn add @tanstack/vue-query-devtools
# or
$ bun add @tanstack/vue-query-devtools
```

De forma predeterminada, Vue Query Devtools solo se incluyen en paquetes cuando `process.env.NODE_ENV === 'development'`, por lo que no necesita preocuparse por excluirlos durante una compilación de producción.

Devtools se montará como un elemento fijo y flotante en su aplicación y proporcionará un interruptor en la esquina de la pantalla para mostrar y ocultar las devtools. Este estado de alternancia se almacenará y recordará en localStorage durante las recargas.

Coloque el siguiente código lo más alto que pueda en su aplicación Vue. ¡Cuanto más cerca esté de la raíz de la página, mejor funcionará!


```vue
<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <h1>The app!</h1>
  <VueQueryDevtools />
</template>
```

## Opciones

- `initialIsOpen: Boolean`
    - Establezca esto como `true` si desea que las herramientas de desarrollo estén abiertas de forma predeterminada.
- `buttonPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right"`
    - Por defecto es `bottom-right`
    - La posición del logotipo de Vue Query para abrir y cerrar el panel de herramientas de desarrollo
- `position?: "top" | "bottom" | "left" | "right"`
    - Por defecto es `bottom`
    - La posición del panel de herramientas de desarrollo de Vue Query
- `client?: QueryClient`
    - Utilice esto para usar un QueryClient personalizado. En caso contrario, se utilizará el del contexto más cercano.
- `errorTypes?: { name: string; initializer: (query: Query) => TError}`
    - Utilice esto para predefinir algunos errores que pueden activarse en sus consultas. Se llamará al inicializador (con la consulta específica) cuando ese error se active desde la interfaz de usuario. Debe devolver un error.

- `styleNonce?: string`
    Úselo para pasar un nonce a la etiqueta de estilo que se agrega al encabezado del documento. Esto es útil si está utilizando un nonce de Política de Seguridad de Contenido (CSP) para permitir estilos en línea.
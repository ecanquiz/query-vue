# Recuperación del Foco de Ventana

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/guides/window-focus-refetching)
:::


Si un usuario abandona su aplicación y regresa y los datos de la consulta están obsoletos, **TanStack Query solicita automáticamente datos nuevos en segundo plano**. Puede desactivar esto globalmente o por consulta utilizando la opción `refetchOnWindowFocus`:

## Deshabilitar Globalmente


```ts
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
}
app.use(VueQueryPlugin, vueQueryPluginOptions)
```

## Deshabilitar Por-Consulta


```ts
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  refetchOnWindowFocus: false,
})
```

## Evento de Enfoque de Ventana Personalizado


En raras circunstancias, es posible que desee administrar sus propios eventos de foco de ventana que activan la revalidación de TanStack Query. Para hacer esto, TanStack Query proporciona una función `focusManager.setEventListener` que le proporciona la devolución de llamada que debe activarse cuando la ventana está enfocada y le permite configurar sus propios eventos. Al llamar a `focusManager.setEventListener`, se elimina el manejador configurado previamente (que en la mayoría de los casos será el manejador predeterminado) y en su lugar se utiliza el nuevo manejador. Por ejemplo, este es el manejador predeterminado:


```ts
focusManager.setEventListener((handleFocus) => {
  // Listen to visibilitychange
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('visibilitychange', () => handleFocus(), false)
    return () => {
      // Be sure to unsubscribe if a new handler is set
      window.removeEventListener('visibilitychange', () => handleFocus())
    }
  }
})
```

## Gestionar el Estado de Enfoque


```ts
import { focusManager } from '@tanstack/vue-query'

// Override the default focus state
focusManager.setFocused(true)

// Fallback to the default focus check
focusManager.setFocused(undefined)
```







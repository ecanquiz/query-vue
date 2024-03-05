# Visión General


:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://tanstack.com/query/latest/docs/framework/vue/overview)
:::

TanStack Query (FKA Vue Query) a menudo se describe como la biblioteca de recuperación de datos que falta para aplicaciones web, pero en términos más técnicos, facilita la **búsqueda, el almacenamiento en caché, la sincronización y la actualización del estado del servidor** en sus aplicaciones web.

## Motivación

La mayoría de los _frameworks_ web centrales *no* vienen con una forma obstinada de obtener o actualizar datos de manera holística. Debido a esto, los desarrolladores terminan construyendo metamarcos que encapsulan opiniones estrictas sobre la obtención de datos o inventan sus propias formas de obtener datos. Por lo general, esto significa improvisar estados y efectos secundarios basados en componentes, o usar bibliotecas de administración de estado de propósito más general para almacenar y proporcionar datos asincrónicos en todas sus aplicaciones.

Si bien la mayoría de las bibliotecas de administración de estado tradicionales son excelentes para trabajar con el estado del cliente, **no son tan buenas para trabajar con el estado asíncrono o del servidor**. Esto se debe a que **el estado del servidor es totalmente diferente**. Para empezar, estado del servidor:

- Se mantiene de forma remota en una ubicación que usted no controla ni es de su propiedad.
- Requiere API asincrónicas para recuperar y actualizar
- Implica propiedad compartida y otras personas pueden cambiarlo sin su conocimiento.
- Potencialmente, sus aplicaciones pueden quedar "desactualizadas" si no tiene cuidado

Una vez que comprenda la naturaleza del estado del servidor en su aplicación, **surgirán aún más desafíos** a medida que avance, por ejemplo:

- Almacenamiento en caché... (posiblemente lo más difícil de hacer en programación)
- Deduplicar múltiples solicitudes para los mismos datos en una sola solicitud
- Actualización de datos "obsoletos" en segundo plano
- Saber cuándo los datos están "obsoletos"
- Reflejar las actualizaciones de los datos lo más rápido posible
- Optimizaciones de rendimiento como paginación y carga diferida de datos
- Gestión de la memoria y la recolección de basura del estado del servidor
- Memorizar los resultados de la consulta con el uso compartido estructural

Si esa lista no lo abruma, entonces eso debe significar que probablemente ya haya resuelto todos los problemas de estado de su servidor y merece un premio. Sin embargo, si eres como la gran mayoría de las personas, aún tienes que afrontar todos o la mayoría de estos desafíos y ¡solo estamos arañando la superficie!

Vue Query es sin duda una de las mejores bibliotecas para gestionar el estado del servidor. Funciona sorprendentemente bien **desde el primer momento, sin configuración y puede personalizarse** a su gusto a medida que su aplicación crece.

Vue Query le permite vencer y superar los difíciles desafíos y obstáculos del estado del servidor y controlar los datos de su aplicación antes de que comience a controlarlo a usted.

En una nota más técnica, Vue Query probablemente:

- Le ayuda a eliminar **muchas** líneas de código complicado e incomprendido de su aplicación y a reemplazarlo con solo un puñado de líneas de lógica de Vue Query.
- Haga que su aplicación sea más fácil de mantener y más fácil de crear nuevas funciones sin preocuparse por conectar nuevas fuentes de datos del estado del servidor.
- Tenga un impacto directo en sus usuarios finales haciendo que su aplicación se sienta más rápida y con mayor capacidad de respuesta que nunca.
- Potencialmente le ayudará a ahorrar ancho de banda y aumentar el rendimiento de la memoria.

## Me Convenciste, ¿Y Ahora Qué?

Aprenda Vue Query a su propio ritmo con nuestra increíblemente completa [Guía Paso a Paso](./installation) y [Referencia de API](https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery)


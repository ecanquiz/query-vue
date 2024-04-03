import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TanStack Query Vue',
  description: 'TDD con Vue 3.',
  base: '/query-vue/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/me.jpg',
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Comenzar', link: '/get-start/overview' },
      { text: 'ecanquiz', link: 'https://ecanquiz.github.io/' },     
    ],
    sidebar: [{
      text: 'Comenzar',   // required
      path: '/get-start/',      // optional, link of the title, which should be an absolute path and must exist        
      sidebarDepth: 1,    // optional, defaults to 1
      collapsible: true,
      collapsed: false, 
      items: [
        { text: 'Visión General', link: '/get-start/overview' },   
        { text: 'Instalación', link: '/get-start/installation' },
        { text: 'Inicio Rápido', link: '/get-start/quick-start' },
        { text: 'Herramientas de Desarrollo', link: '/get-start/devtools' },
        { text: 'TypeScript', link: '/get-start/typescript' },
        { text: 'Graphql', link: '/get-start/graphql' }        
      ]
    }, {
      text: 'Guías y Conceptos',   
      path: '/guides-and-concepts/',
      sidebarDepth: 1,
      collapsible: true,
      collapsed: false, 
      items: [      
        { text: 'Valores Por-Defecto Importantes', link: '/guides-and-concepts/important-defaults' },
        { text: 'Consultas', link: '/guides-and-concepts/queries' },
        { text: 'Claves de Consulta', link: '/guides-and-concepts/query-keys' },
        { text: 'Funciones de Consulta', link: '/guides-and-concepts/query-functions' },
        { text: 'Modo Red', link: '/guides-and-concepts/network-mode' },
        { text: 'Consultas Paralelas', link: '/guides-and-concepts/parallel-queries' },
        { text: 'Consultas Dependientes', link: '/guides-and-concepts/dependent-queries' }, 
        { text: 'Indicadores de Búsqueda de Segundo Plano', link: '/guides-and-concepts/background-fetching-indicators' },
        { text: 'Recuperación del Foco de Ventana', link: '/guides-and-concepts/window-focus-refetching' },       
        { text: 'Consultas Infinitas', link: '/guides-and-concepts/infinite-queries' },
        { text: 'Mutaciones', link: '/guides-and-concepts/mutations' },
        { text: 'Invalidación de Consultas', link: '/guides-and-concepts/query-invalidation' },
        { text: 'Cancelar Consultas', link: '/guides-and-concepts/query-cancellation' }        
      ]
    }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ecanquiz/query-vue' }
    ]
  }
})



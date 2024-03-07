import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TanStack Query Vue',
  description: 'TDD con Vue 3.',
  base: '/tanstack-query-vue/',
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
        { text: 'Herramientas de Desarrollo', link: '/get-start/devtools' }        
      ]
    }, {
      text: 'Guías y Conceptos',   
      path: '/guides-and-concepts/',
      sidebarDepth: 1,
      collapsible: true,
      collapsed: false, 
      items: [
        { text: 'Consultas', link: '/guides-and-concepts/queries' },
        { text: 'Mutaciones', link: '/guides-and-concepts/mutations' },
        { text: 'Invalidación de Consultas', link: '/guides-and-concepts/query-invalidation' },        

      ]
    }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ecanquiz/tanstack-query-vue' }
    ]
  }
})



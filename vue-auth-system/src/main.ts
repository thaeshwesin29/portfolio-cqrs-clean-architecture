import { createApp } from 'vue'
import App from './App.vue'

import './assets/tailwind.css'

// 🧭 Router, Store, and Query
import router from './router'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

// 🔔 Toast Notifications
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

// 🚀 Apollo Client (GraphQL)
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

// 🔊 Laravel Echo
import '@/plugins/echo'

// Apollo client instance
export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
})

// Create the app instance
const app = createApp(App)

// Provide Apollo globally
app.provide(DefaultApolloClient, apolloClient)

// Register plugins
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

// ✅ Toast options
const toastOptions = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

app.use(Toast, toastOptions)

// Mount app
app.mount('#app')

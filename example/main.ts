import { createApp } from 'vue'

import App from './App.vue'
// import router from './router'
import PaystackPlugin from '../src'
const paystackKey = "pk_test_27c1ac1537f006ecefc74402138941790c586e67"
// const paystackKey = "pk_test_a137d402b5975716e89952a898aad2832c961d69"

const app = createApp(App)

// app.use(router)
app.use(PaystackPlugin, {key: paystackKey})

app.mount('#app')

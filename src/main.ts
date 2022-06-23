import { createApp } from 'vue'

import App from './App.vue'
import PayStack from './index'
const paystackKey = "pk_test_27c1ac1537f006ecefc74402138941790c586e67"

const app = createApp(App)

app.use(PayStack, {key: paystackKey})

app.mount('#app')

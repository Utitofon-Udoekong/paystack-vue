# VUE 3 Paystack Plugin

A vue 3 component for integrating the paystack payment gateway

![Preview Image](paystack-modal.png?raw=true "Preview Image")

## Features

- [💚 Vue 3](https://v3.vuejsjs.org)

- ⚡️ Vite - Instant HMR

- 🔥 The `<script setup>` syntax

- 🦾 TypeScript, of course

## Installation

### NPM

```bash
npm install paystack-vue
```

## USAGE

#### main.ts

```javascript
    import { createApp } from 'vue'

    import App from './App.vue'
    import PayStack from './index'
    const paystackKey = "pk_test_27c1ac1537f006ecefc74402138941790c586e67"

    const app = createApp(App)

    app.use(PayStack, {key: paystackKey})

    app.mount('#app')
```

#### App.vue(or any component)

```vue
    <script setup lang="ts">
    const callback = (response) => {
    alert(`Ref: ${response.reference}, status: ${response.status}`)
    }
    const onClose = () => {
    alert("Payment modal closed")
    }
    </script>
    <template>
        <header>

            <div class="wrapper">
                <PayStack
                    :embedInModal="false"
                    :amount="200"
                    :callback="callback"
                    :onClose="onClose"
                    email="eve@mail.com"
                    firstName="firstname"
                    lastName="lastname"
                    paymentButtonClass="payment-button"
                />
            </div>
        </header>
    </template>
    <style>
    .payment-button{
        width: 100%;
        background-color: green;
        border-radius: 10px
    }
    </style>

```

[Example configuration file for npm global usage](example/App.vue)

For more options checkout the [paystack documentation](https://paystack.com/docs/payments/accept-payments#popup)

## Deployment
Keys used in this plugin are test keys only. Do well to change them to production ready keys.

## Contributing

1. Fork ithe repository
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/iamraphson)!

Thanks!
Ayeni Olusegun.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

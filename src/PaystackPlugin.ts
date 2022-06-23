import type { App }  from "vue";
import { PayStack } from "./components";

export default {
    install: (app: App, options: {key: string} = {key: ""}) => {
        app.component("PayStack", PayStack)
        app.provide("paystackPublicKey",options.key)
    }
}

// export { PayStack }
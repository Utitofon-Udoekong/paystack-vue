import type { App }  from "vue";
import PayStack from "./components/pay-stack.vue";

export default {
     /*
    * install function
    * @param  {Vue} Vue
    * @param  {object} options paystack key
    */
    install: (app: App, options: {key: string} = {key: ""}) => {
        app.component("PayStack", PayStack)
        app.provide("paystackPublicKey",options.key)
    }
}


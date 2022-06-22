<script setup lang="ts">
import { ref, toRefs } from "vue";

const isScriptReady = ref(false);
const props = defineProps({
    paystackAPIKey: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    amount: {
        type: Number,
        required: true,
        validator(value) {
            return value > 0;
        },
    },
    onClose: {
        type: Function,
        default: () => {
            alert("Payment closed");
        },
    },
    callback: {
        type: Function,
        required: true,
        default: (response: any) => {
            return response;
        },
    },
    channels: {
        type: Array,
        default() {
            return ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"];
        },
    },
    redirect_url: String,
    redirect: Boolean,
});
const { channels } = toRefs(props);
const generateInlineScript = (callback: any) => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    document.querySelectorAll("head")[0].appendChild(script);
    if (document.readyState) {
        document.onreadystatechange = () => {
            if (
                document.readyState === "interactive" ||
                document.readyState === "complete"
            ) {
                script.onload((){})
                document.onreadystatechange = null;
                callback();
            }
        };
    } else {
        // Others
        script.onload = () => {
            callback();
        };
    }
};

const paymentChannels = channels;
const payWithPaystack = () => { };
</script>
<template>
    <button v-if="!isScriptReady">
        <slot></slot>
    </button>
    <div v-else id="embedPaymentModal"></div>
</template>
<style>
</style>

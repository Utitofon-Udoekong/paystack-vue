
<script setup lang="ts">
///This plugin enables accepting of payments through the paystack secure modal or an embedded form on the application. 
import { inject, onBeforeMount, onMounted, ref} from "vue";
/* eslint-disable */
// @ts-ignore
import PaystackPop from '@paystack/inline-js';
/* eslint-enable */
interface Paystackoptions{
    key: string
    email: string
    firstname: string
    lastname: string
    channels: string[] | unknown[]
    amount: number
    access_code: string | undefined
    ref: string
    // eslint-disable-next-line @typescript-eslint/ban-types
    callback: Function
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClose: Function
    metadata: object
    currency: string
    transaction_charge: number
    bearer: string
    container?: string
}

const key: string = inject("paystackPublicKey") as string
const isScriptReady = ref(null);

const props = defineProps({
  ///String: Class Name for the payment button
  paymentButtonClass: String,
  ///Boolean: Indicates whether or not to embed the popup in a custom modal
  embedInModal: {
    type: Boolean,
    default: false,
  },
  ///String: Your public key from Paystack. Use test key for test mode and live key for live mode
  paystackPublicKey: String,
  ///String: Email address of the user
  email: {
    type: String,
    required: true,
  },
  ///String: Firstname of the user
  firstName: {
    type: String,
    default: "",
  },
  ///String: Lastname of the user
  lastName: {
    type: String,
    default: "",
  },
  ///Number: Amount (in the lowest currency value - kobo, pesewas or cent) you are debiting customer. Do not pass this if creating subscriptions.
  amount: {
    type: Number,
    required: true,
    validator(value: number) {
      return value > 0;
    },
  },
  ///Function that is called if the customer closes the payment window instead of making a payment.
  onClose: {
    type: Function,
    default: () => {
      alert("Payment closed");
    },
  },
  ///Function that runs when payment is successful. This returns a response with the necessary status information..
  callback: {
    type: Function,
    required: true,
    default: (response: any) => {
      return response;
    },
  },
  ///An array of payment channels to control what channels you want to make available to the user to make a payment with. Available channels include; ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
  channels: {
    type: Array,
    default() {
      return ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"];
    },
  },
  redirect_url: String,
  redirect: Boolean,
  ///String: The code for the subaccount that owns the payment. e.g. ACCT_8f4s1eq7ml6rlzj
  subAccount: String,
  split: {
    type: Object,
    default: () => {
      return {};
    },
  },
  ///String: The split code of the transaction split. e.g. SPL_98WF13Eb3w
  splitCode: String,
  ///Number: A flat fee to charge the subaccount for this transaction (in kobo, pesewas or cents). This overrides the split percentage set when the subaccount was created. Ideally, you will need to use this if you are splitting in flat rates (since subaccount creation only allows for percentage split).
  transactionCharge: {
    type: Number,
    default: 0,
  },
  ///String: Used to apply a multiple to the amount returned by the plan code.
  quantity: String,
  ///String: Decide who will bear Paystack transaction charges between account and subaccount. Defaults to account.
  bearer: {
    type: String,
    default: "account",
  },
  ///String: Currency charge should be performed in. Allowed values are: NGN, GHS, ZAR or USD. This package defaults to NGN.
  currency: {
    type: String,
    default: "NGN",
  },
  ///Object: Object containing any extra information you want recorded with the transaction. Fields within the custom_field object will show up on merchant receipt and within the transaction information on the Paystack Dashboard.
  metadata: {
    type: Object,
    default: () => {
      return {};
    },
  },
  accessCode: String,
  ///String: Plan code generated from creating a plan. This makes the payment become a subscription payment.
  plan: String,
});


const dynamicSplit = () => {
  return (
    props.split.constructor === Object && Object.keys(props.split).length > 0
  );
};
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

const payWithPaystack = () => {
  const paystackOptions: Paystackoptions = {
    key: key ?? props.paystackPublicKey,
    email: props.email,
    firstname: props.firstName,
    lastname: props.lastName,
    channels: props.channels,
    amount: props.amount * 100,
    access_code: props.accessCode,
    ref: "" + Math.floor(Math.random() * 1000000000 + 1),
    callback: (response: any) => {
      props.callback(response);
    },
    onClose: () => {
      props.onClose();
    },
    metadata: props.metadata,
    currency: props.currency,
    transaction_charge: dynamicSplit() ? 0 : props.transactionCharge,
    bearer: dynamicSplit() ? "" : props.bearer,
  };
  if (props.embedInModal) {
    paystackOptions.container = "embedPaymentModal";
  }
  const handler = PaystackPop.setup(paystackOptions);
  if (!props.embedInModal) {
    handler.openIframe();
  }
};
onBeforeMount(() => {
  isScriptReady.value = new Promise<void>((resolve) => {
    generateInlineScript(() => {
      resolve();
    });
  });
});
onMounted(() => {
  if (props.embedInModal) {
    payWithPaystack();
  }
});
</script>

<template>
    <button v-if="!embedInModal"
    @click="payWithPaystack"
    :class="paymentButtonClass ?? 'payment-button'"
  >
    <slot>Pay with Paystack</slot>
  </button>
  <div v-else id="embedPaymentModal" class="embeded-modal"></div>
</template>

<style>
.payment-button {
  box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #011b33;
    color: #fff;
    cursor: pointer;
}
.embeded-modal{
  height: 100%;
}
</style>

<script setup lang="ts">
import PayStack from "../components/pay-stack.vue";
import router from "../router";
const callback = (response: any) => {
  console.log(response);
  router.push(`/success/${response.reference}`);
};
const onClose = () => {
  alert("Overriden on close method");
};
</script>

<template>
    <PayStack
    :embedInModal="false"
      paystackPublicKey="pk_test_27c1ac1537f006ecefc74402138941790c586e67"
      :amount="200"
      :callback="callback"
      :onClose="onClose"
      email="eve@mail.com"
      firstName="iwojlm;"
      lastName="kwjnww"
    >Pay now oshey</PayStack>

</template>
<style>
</style>

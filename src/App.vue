<script setup lang="ts">
const callback = (response: any) => {
  alert(response.reference);
};
const onClose = () => {
  alert("Overriden on close method");
};
</script>

<template>
    <PayStack
    :embedInModal="true"
      :amount="200"
      :callback="callback"
      :onClose="onClose"
      email="eve@mail.com"
      firstName="iwojlm;"
      lastName="kwjnww"
    />

</template>
<style>
</style>

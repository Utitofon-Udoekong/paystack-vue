<script setup lang="ts"> 
</script>
<template>
<div class="success-container">
    <div class="card">
        <h1>Success. Transaction reference: {{$route.params.ref}}</h1>
    </div>
</div>
</template>
<style>

.success-container {
  max-width: 1280px;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card{
    width: 200px;
    padding: 30px;
    border: 2px solid #828282;
}
.card h1{
    color: #22d34b;
    font-size: 20px;
}

</style>

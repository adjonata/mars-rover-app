<template>
  <div class='container'>
    <slot name='content'></slot>
  </div>
</template>

<script>
  export default {
    name: 'container',
    props: {

    }
  }
</script>

<style>
  .container {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
  }
</style>
<template>
  <button class="a-button shadow" @click="$emit('click')">
    <i v-if="icon" class="material-icons">{{ icon }}</i>
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "a-button",

  props: {
    label: {
      type: String,
      default: "Confirmar",
    },
    icon: {
      type: String,
    },
  },
}
</script>

<style>
.a-button {
  padding: 8px 12px;
  border-radius: 4px;
  background: #382db3;
  font-size: 14px;
  text-transform: uppercase;
  color: #f1f1f1;
  cursor: pointer;
  transition: filter 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;
}
.a-button:hover {
  filter: brightness(92%);
}
.a-button i {
  margin-right: 5px;
  font-size: 17px;
}
</style>

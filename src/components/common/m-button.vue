<template>
  <button
    :class="['m-button', classList, `bg-${bgColor}`]"
    @click="$emit('click', $event)"
  >
    <i class="material-icons" v-if="icon" :style="{ color: iconColor }">{{
      icon
    }}</i>
    <span v-if="label" :style="{ color: textColor }">{{ label }}</span>
    <i class="material-icons" v-if="iconRight" :style="{ color: iconColor }">{{
      iconRight
    }}</i>
  </button>
</template>

<script>
export default {
  name: "m-button",
  props: {
    label: String,
    classList: String,
    icon: String,
    iconRight: String,
    iconColor: {
      type: String,
      default: "white",
    },
    bgColor: {
      type: String,
      default: "mars",
    },
  },
};
</script>

<style scoped lang="scss">
.m-button {
  min-width: 240px;
  height: 40px;
}
</style>

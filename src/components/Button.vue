<script setup lang="ts">
interface Props {
  text: string;
}
const props = defineProps<Props>()
</script>

<script lang="ts">
export default {
  name: 'button-primary',
}
</script>

<template>
  <div>
    <button>{{ props.text }}</button>
  </div>
</template>

<style scoped>
button {
  border: none;
  width: 100%;

  background-color: #00796B;
  padding: .8rem;
  border-radius: 4px;

  color: #FFF;
  font-size: 1rem;
  transition: 300ms;
  cursor: pointer;
}

button:hover {
  background-color: #00695C;
}
</style>
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
    <button>
      <p>{{ props.text }}</p>
      <img src="../../icons/plus.png" alt="">
    </button>
  </div>
</template>

<style scoped>
button {
  border: none;

  background-color: #8284FA;
  padding: .8rem;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #FFF;
  font-size: .8rem;
  transition: 300ms;
  cursor: pointer;
}

p {
  margin-right: 1rem;
}

button:hover {
  background-color: #7779f7;
}
</style>
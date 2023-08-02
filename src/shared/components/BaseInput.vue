<script lang="ts">
export default {
  name: 'base-input',
  props: {
    id: String,
    placeholder: String,
    modelValue: String,
  },
};
</script>

<template>
  <input :id="id" :value="modelValue" :placeholder="placeholder" @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>

<style scoped> 
 input {
   background: none;
   padding: .8rem;
   border-radius: 4px;
   border: none;
   color: #bbb;
   width: 100%;
   background: var(--vt-c-divider-dark-2);
 }
</style>
<template>
  <label :for="id">{{ labelText }}</label>
  <input :id="id" :value="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>

<script lang="ts">
export default {
  name: 'base-input',
  props: {
    id: String,
    labelText: String,
    modelValue: String,
  },
};
</script>

<style scoped> 
label {
  display: block;
  margin-bottom: 6px;
  font-size: 1.2rem;
}

 input {
   background: none;
   padding: .8rem;
   border-radius: 4px;
   border: none;
   border: 1px solid #bbb;
   color: #bbb;
   width: 100%;
 }
</style>
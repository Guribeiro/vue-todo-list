<script setup lang="ts">

interface Props {
  title: String;
  subTitle: String
}
const props = defineProps<Props>()
</script>

<script lang="ts">
export default {
  name: 'empty-indicator',
}
</script>

<template>
  <article>
    <img src="../../public/icons/Clipboard.svg" alt="empty indicator">
    <strong>{{ props.title }}</strong>
    <p>{{ props.subTitle }}</p>
  </article>
</template>

<style scoped>
article {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}

strong {
  line-break: auto;
  font-weight: 600;
  font-size: 1.2rem;
}

p {
  margin-top: .4rem;
}

</style>
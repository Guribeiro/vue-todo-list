<script setup lang="ts">

interface Props {
  title: String;
  subTitle: String | undefined
  imgSrc: string | undefined
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
    <img :if="props.imgSrc" :src="props.imgSrc" alt="empty indicator">
    <strong>{{ props.title }}</strong>
    <p :if="props.subTitle" >{{ props.subTitle }}</p>
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
<script setup lang="ts">

export type Type = 'error' | 'warning' | 'success'

export type IToastProps = {
  type: Type;
  title: string;
  description?: string
}

export interface ToastProps {
  toast?: IToastProps
  onClose: () => void;
}

const props = defineProps<ToastProps>()
</script>


<script lang="ts">
export default {
  name: 'toast-component',
}
</script>

<template>
  <div class="toast-wrapper">
    <article v-if="props.toast" :class="['toast', props.toast.type]">
      <div>
        <h1>{{ props.toast.title }}</h1>
        <p>{{ props.toast.description }}</p>
      </div>
      <button :onclick="props.onClose">
        ❌
      </button>
    </article>
  </div>
</template>

<style scoped> 
   .toast-wrapper {
     position: fixed;
     width: 100%;
     bottom: 20px;
   }

   .toast {
     padding: 20px;
     color: white;
     border-radius: 1rem;
     box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
     max-width: 30rem;
     display: flex;
     align-items: start;
     justify-content: space-between;
     margin: 0 auto;
   }

   .toast.error {
    background: brown;
   }
   .toast.success {
    background: rgb(46, 133, 46);
   }
   .toast.warning {
    background: #ff9f43;
   }

   .toast > button {
    border: none;
    background: none;
    cursor: pointer;
   }
</style>
<script setup lang="ts">

interface Todo {
  id: string;
  title: string;
  finished: boolean;
}

interface Props {
  todo: Todo;
}
defineProps<Props>()
</script>

<script lang="ts">
export default {
  name: 'todo-item',

  methods: {
    onRemove() {
      this.$emit('onRemove')
    },
    onUpdateStatus() {
      this.$emit('onUpdateStatus')
    },
  }
}
</script>

<template>
  <li>
    <div class="content">
      <button @click="onUpdateStatus" data-tooltip="Click to remove" data-position="top">
        {{ todo.finished ? '✅' : '❌' }}
      </button>
      <p>
        {{ todo.title }}
      </p>
    </div>
    <button @click="onRemove" data-tooltip="Click to remove" data-position="top">
      <img src="../../icons/trash.png" alt="trash-icon">
    </button>
  </li>
</template>

<style scoped>
li {
  border: 1px solid var(--vt-c-text-dark-2);
  color: var(--vt-c-white);
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: .8rem .4rem;
  font-size: .8rem;
}

.content {
  display: flex;
  align-items: center;
  width: 100%;
}

p {
  line-break: auto;
  margin-left: .4rem;
}

li+li {
  margin-top: .4rem;
}

button {
  background: none;
  border: none;
  color: #FFF;
  cursor: pointer;
}
</style>
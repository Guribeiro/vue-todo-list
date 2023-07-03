<script lang="ts">

interface Todo {
  id: string;
  title: string;
  finished: boolean;
}

import { ref } from 'vue';
import ButtonPrimary from '../components/Button.vue';
import BaseInput from '@/components/BaseInput.vue';

export default {
  name: 'home-view',
  components: {
    ButtonPrimary,
    BaseInput,
  },
  setup() {
    const title = ref('')
    const todos = ref<Todo[]>([]);

    return {
      title,
      todos,
      handleAddTodo(event: Event) {
        event.preventDefault()

        if (!title.value.length) return;

        if(title.value.length > 60) {
          window.alert(`Todo title is too long`)
          return
        }

        const findTodoWithSameTitle = todos.value.find(todo => todo.title === title.value);

        if (findTodoWithSameTitle) {
          window.alert(`Todo with title "${title.value}" is already added`)
          return
        }

        const todo: Todo = {
          id: new Date().valueOf().toString(),
          title: title.value,
          finished: false,
        }

        todos.value = [...todos.value, todo]

        title.value = ''
      },
      handleRemoveTodo(id: string) {
        const findIndex = todos.value.findIndex(todo => todo.id === id);

        if (findIndex < 0) return

        const todosList = [...todos.value];

        todosList.splice(findIndex, 1);

        todos.value = todosList;
      },
      handleUpdateTodoStatus(id: string) {
        const findIndex = todos.value.findIndex(todo => todo.id === id);

        if (findIndex < 0) return

        const todosList = [...todos.value];

        const findTodo = todosList[findIndex];

        Object.assign<Todo, Pick<Todo, 'finished'>>(findTodo, {
          finished: !findTodo.finished
        })

        todosList[findIndex] = findTodo;

        todos.value = todosList
      }
    }
  },
  computed: {
    todosCount() {
      return this.todos.length;
    }
  },

  watch: {
    todos: {
      handler() {
        localStorage.setItem('@todos', JSON.stringify(this.todos))
      },
      deep: true
    },
  },

  mounted() {
    const storagedTodos = localStorage.getItem('@todos')

    if (storagedTodos) {
      this.todos = JSON.parse(storagedTodos);
    }
  }
}
</script>

<template>
  <main>
    <header>
      <h1>Todo list</h1>
      <span>{{ todosCount }}</span>
    </header>
    <form @submit.prevent="handleAddTodo">
      <BaseInput id="title" labelText="Todo:" v-model="title" />
      <ButtonPrimary class="submit-button" text="Add" />
    </form>

    <section v-if="todos.length > 0">
      <h3>Todos</h3>
      <li :key="todo.id" v-for="todo in todos">
        <button @click="handleUpdateTodoStatus(todo.id)" data-tooltip="Click to remove" data-position="top">
          {{ todo.finished ? '✅' : '❌'}}
        </button>
        <p>
          {{ todo.title }}
        </p>
        <button @click="handleRemoveTodo(todo.id)" data-tooltip="Click to remove" data-position="top">
          🚯
        </button>
      </li>
    </section>

  </main>
</template>

<style scoped>
main {
  max-width: 460px;
  height: 100vh;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 500;
}

section {
  margin-top: 2rem;
  border-top: 1px solid #FFF;
  padding-top: 1rem;
}

h3 {
  margin-bottom: .4rem;
  color: #FFF;
  font-size: 1.6rem;
  font-weight: 500;
}

li {
  border: 1px solid #FFF;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: .8rem;
}

p {

  line-break: auto;
}

li+li {
  margin-top: .4rem;
}

button {
  background: none;
  border: none;
  color: #FFF;
  cursor: pointer;
  font-size: 1.2rem;
}
 
.submit-button {
  margin-top: 1rem;
}
</style>
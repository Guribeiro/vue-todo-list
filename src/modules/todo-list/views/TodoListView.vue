<script lang="ts">

export interface Todo {
  id: string;
  title: string;
  finished: boolean;
}

import { TransitionGroup, ref } from 'vue';
import ButtonPrimary from '@/shared/components/Button.vue';
import BaseInput from '@/shared/components/BaseInput.vue';
import EmptyIndicator from '@/shared/components/EmptyIndicator.vue';
import TodoItem from '@/modules/todo-list/components/TodoItem.vue';
import Toast, { type IToastProps } from '@/shared/components/Toast.vue';

export default {
  name: 'todo-list-view',
  components: {
    ButtonPrimary,
    BaseInput,
    TodoItem,
    EmptyIndicator,
    TransitionGroup,
    Toast
  },
  setup() {
    const title = ref('')
    const todos = ref<Todo[]>([]);
    const toast = ref<IToastProps | undefined>()

    return {
      title,
      todos,
      toast,
      handleAddTodo(event: Event) {
        try {
          event.preventDefault()

          if (!title.value.length) {
            throw new Error('Todo title is too small')
          }

          if (title.value.length > 60) {
            throw new Error('Todo title is too long')
          }

          const findTodoWithSameTitle = todos.value.find(todo => todo.title === title.value);

          if (findTodoWithSameTitle) {
            throw new Error(`Todo with title "${title.value}" is already added`)
          }

          const todo: Todo = {
            id: new Date().valueOf().toString(),
            title: title.value,
            finished: false,
          }

          todos.value = [...todos.value, todo]

          title.value = ''
        } catch (error) {
          const err = error as { message: string }
          toast.value = {
            title: 'Error',
            type: 'error',
            description: err.message
          }

          setTimeout(() => toast.value = undefined, 1000)
        }
      },
      handleRemoveTodo(id: string) {
        const confirmed = window.confirm('You sure you want to remove this task ?')

        if (confirmed) {
          const findIndex = todos.value.findIndex(todo => todo.id === id);

          if (findIndex < 0) return

          const todosList = [...todos.value];

          todosList.splice(findIndex, 1);

          todos.value = todosList;
        }
      },
      handleUpdateTodoStatus(id: string) {
        const confirmed = window.confirm('You sure you want to update its status ?')

        if (confirmed) {
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
      },
      handleCloseToast() {
        toast.value = undefined
      }
    }
  },
  computed: {
    todosCount() {
      return this.todos.length;
    },
    todosFinished() {
      return this.todos.filter(todo => todo.finished).length
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
      <img src="../assets/Logo.svg" alt="Todo list">
    </header>

    <article class="container">
      <form @submit.prevent="handleAddTodo">
        <BaseInput id="title" placeholder="Add new todo" v-model="title" />
        <ButtonPrimary class="submit-button" text="Add" />
      </form>

      <section>
        <article v-if="todos.length > 0">
          <div class="todos-list-header">
            <p>
              all todos
              <span>{{ todosCount }}</span>
            </p>
            <p>
              done
              <span>{{ todosFinished }} / {{ todosCount }}</span>
            </p>
          </div>
          <h3>Todos</h3>
          <TransitionGroup tag="ul" name="todos-list" appear>
            <TodoItem :key="todo.id" v-for="todo in todos" :todo="todo" @onUpdateStatus="handleUpdateTodoStatus(todo.id)"
              @onRemove="handleRemoveTodo(todo.id)" />
          </TransitionGroup>
        </article>

        <Transition v-else name="empty-indicator" appear>
          <EmptyIndicator title="You haven't added tasks so far..." subTitle="Add some tasks to your todo list" />
        </Transition>
      </section>
    </article>
    <Transition name="toast">
      <Toast v-if="toast" :toast="toast" :onClose="handleCloseToast" />
    </Transition>
  </main>
</template>

<style scoped>
main {
  background-color: var(--vt-c-divider-light-2);
  min-height: 100vh;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12.5rem;
  background-color: var(--color-background);
}

article.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 1rem;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -1.5rem;
}


h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 500;
}

section {
  margin-top: 3.4rem;
}

.todos-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todos-list-header p {
  color: #8284FA;
  font-weight: 500;
}

.todos-list-header span {
  padding: .2rem .4rem;
  font-size: .8rem;
  background-color: var(--vt-c-divider-dark-1);
  border-radius: .4rem;
  color: var(--vt-c-white);
}

h3 {
  margin-bottom: .4rem;
  color: #FFF;
  font-size: 1.6rem;
  font-weight: 500;
}

ul {
  padding: 0;
  position: relative;
}

.submit-button {
  margin-left: .6rem;
}

.todos-list-enter-from {
  opacity: 0;
  transform: scale(.6);
}

.todos-list-enter-to {
  opacity: 1;
  transform: scale(1);
}

.todos-list-enter-active {
  transition: all .4s ease;
}

.todos-list-leave-from {
  opacity: 1;
  transform: scale(1);
}

.todos-list-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

.todos-list-leave-active {
  transition: all .1s ease;
  position: absolute;
}

.todos-list-move {
  transition: all .3s ease;
}

.empty-indicator-enter-from {
  opacity: 0;
  transform: scale(.6);
}

.empty-indicator-enter-to {
  opacity: 1;
  transform: scale(1);
}

.empty-indicator-enter-active {
  transition: all .4s ease;
}

.empty-indicator-leave-from {
  opacity: 1;
  transform: scale(1);
}

.empty-indicator-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

.empty-indicator-leave-active {
  transition: all .1s ease;
  position: absolute;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(4rem);
}

.toast-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.toast-enter-active {
  transition: all .3s ease;
}

.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(4rem);
}

.toast-leave-active {
  transition: all 1s ease;
}
</style>
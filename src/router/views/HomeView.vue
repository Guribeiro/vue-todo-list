<script lang="ts">
import { reactive } from 'vue';
import ButtonPrimary from '../../components/Button.vue';

interface LoginForm {
  repository: string | null;
}

export default {
  name: 'home-view',
  components: {
    ButtonPrimary,
  },
  setup() {
    const form = reactive<LoginForm>({
      repository: null,
    })

    return form
  },

  methods: {
    onSubmit() {
      console.log({
        repository: this.repository,
      })
    }
  }
}
</script>

<template>
  <main>
    <h1>Buscar repositórios</h1>
    <form @submit.prevent="onSubmit">
      <label for="repository">
        username
      </label>
      <input id="repository" v-model="repository" type="text">
      <ButtonPrimary class="submit-button" text="Enviar" />
    </form>

  </main>
</template>

<style scoped>
main {
  max-width: 460px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 500;
}


label {
  display: block;
  padding: 4px 0;
}

input {
  display: block;
  width: 100%;

  padding: 12px;
  border-radius: 4px;

  border: none;
}

.submit-button {
  margin-top: 1rem;
}
</style>
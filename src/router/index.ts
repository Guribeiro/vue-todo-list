import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/modules/todo-list/views/TodoListView.vue'),
  },
  {
    path: '/github-user-finder',
    component: () => import('@/modules/github-user-finder/views/GithubUserSearcher.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
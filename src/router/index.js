import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },


    {
      path: '/persons', // use small first letter
      name: 'persons', // use small first letter
      component: () => import('../views/PersonsPage.vue')
    },

    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsPage.vue')
    },


    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksPage.vue')

    },
    {
      path: '/project/:id',
      name: 'projectDetail',
      component: () => import('../views/ProjectDetailPage.vue')

    },
    {
      path: '/task/:id',
      name: 'taskDetail',
      component: () => import('../views/TaskDetailPage.vue')

    },
    {
      path: '/person/:id',
      name: 'personDetail',
      component: () => import('../views/PersonDetailPage.vue')

    },
    {
      path: '/personform/',
      name: 'personForm',
      component: () => import('../views/PersonForm.vue')

    },
    {
      path: '/personform/:id',
      name: 'personFormEdit',
      component: () => import('../views/PersonForm.vue')

    },
    {
      path: '/projectform',
      name: 'projectForm',
      component: () => import('../views/ProjectForm.vue')

    },
    {
      path: '/projectform/:id',
      name: 'projectFormEdit',
      component: () => import('../views/ProjectForm.vue')

    },
    {
      path: '/taskform',
      name: 'taskForm',
      component: () => import('../views/TaskForm.vue')

    },
    {
      path: '/taskform/:id',
      name: 'taskFormEdit',
      component: () => import('../views/TaskForm.vue')

    },
  ]
})


export default router
export default [
  {
    path: '/',
    redirect: {
      name: 'login',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue'),
  },

  // sgc users
  {
    path: '/users',
    name: 'sgcUsersList',
    component: () => import('@/views/users/ListUsers.vue'),
  },
  {
    path: '/users/create',
    name: 'sgcUsersCreate',
    component: () => import('@/views/users/CreateUser.vue'),
  },
  {
    path: '/users/:id',
    name: 'sgcUsersEdit',
    component: () => import('@/views/users/EditUser.vue'),
  },
  {
    path: '/Perfil',
    name: 'perfil',
    component: () => import('@/views/users/Profile.vue'),
  },
  {
    path: '/grafico',
    name:'grafico',
    component: () => import('@/views/users/graficos.vue'),
  },
  {
    path: '/Colaboradores',
    name: 'colaboradores',
    component: () => import('@/views/users/Collaborators.vue'),
  },
  {
    path: '/crearcurso',
    name:'CreateCourse',
    component: () => import('@/views/courses/Create.vue'),
  }
];

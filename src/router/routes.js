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
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/Perfil',
    name: 'perfil',
    component: () => import('@/views/users/Profile.vue'),
  },
  {
    path: '/grafico',
    name: 'grafico',
    component: () => import('@/views/users/graficos.vue'),
  },
  {
    path: '/colaboradores',
    name: 'colaboradores',
    component: () => import('@/views/users/Collaborators.vue'),
  },
  {
    path: '/Colaborador/:id/agregar-carga-familiar',
    name: 'agregarCargaFamiliar',
    component: () => import('@/views/admin/AgregarCargaFamiliar.vue'),
  },
  {
    path: '/Colaborador/:id/lista-carga-familiar',
    name: 'ListaCargaFamiliar',
    component: () => import('@/views/admin/ListaCargaFamiliar.vue'),
  },
  {
    path: '/Colaborador/:id/crear-movilidad',
    name: 'crearmovilidad',
    component: () => import('@/views/admin/Movilidad.vue'),
  },
  {
    path: '/Colaborador/:id/movilidades',
    name: 'movilidades',
    component: () => import('@/views/admin/ListaMovilidad.vue'),
  },
  {
    path: '/crear-curso',
    name: 'createcurso',
    component: () => import('@/views/courses/Create.vue'),
  },
  {
    path: '/lista-cursos',
    name: 'ListCourse',
    component: () => import('@/views/courses/List.vue'),
  },
  {
    path: '/curso/:id',
    name: 'courseEdit',
    component: () => import('@/views/courses/Edit.vue'),
  },
  {
    path: '/crea-colaborador',
    name: 'crearcolaborador',
    component: () => import('@/views/admin/FormColaborador.vue'),
  },
  {
    path: '/lista-colaboradores',
    name: 'listacolaboradores',
    component: () => import('@/views/admin/ListColaboradores.vue'),
  },
  {
    path: '/colaborador/:id',
    name: 'editcolaborador',
    component: () => import('@/views/admin/EditColaborador.vue'),
  },
  {
    path: '/lista-tags',
    name: 'listatags',
    component: () => import('@/views/tags/List.vue'),
  },
  {
    path: '/crear-tags',
    name: 'creartags',
    component: () => import('@/views/tags/Create.vue'),
  },
  {
    path: '/tag/:id',
    name: 'edittag',
    component: () => import('@/views/tags/Edit.vue'),
  },
  {
    path: '/lista-nivel-jerarquico',
    name: 'listaniveljerarquico',
    component: () => import('@/views/nivelJerarquico/List.vue'),
  },
  {
    path: '/crear-niveljerarquico',
    name: 'creaniveljerarquico',
    component: () => import('@/views/nivelJerarquico/Crear.vue'),
  },
  {
    path: '/nivel-jerarquico/:id',
    name: 'editniveljerarquico',
    component: () => import('@/views/nivelJerarquico/Edit.vue'),
  },
  {
    path: '/crear-cargo',
    name: 'crearcargo',
    component: () => import('@/views/cargos/Create.vue'),
  },
  {
    path: '/lista-cargos',
    name: 'listacargo',
    component: () => import('@/views/cargos/List.vue'),
  },
  {
    path: '/crea-tipos-area',
    name: 'creartipoarea',
    component: () => import('@/views/tiposArea/Create.vue'),
  },
  {
    path: '/lista-tipos-area',
    name: 'listatipoarea',
    component: () => import('@/views/tiposArea/List.vue'),
  },
  {
    path: '/tipo-area/:id',
    name: 'edittipoarea',
    component: () => import('@/views/tiposArea/Edit.vue'),
  },
  {
    path: '/crear-area',
    name: 'crearArea',
    component: () => import('@/views/areas/Create.vue'),
  },
  {
    path: '/lista-areas',
    name: 'listaArea',
    component: () => import('@/views/areas/List.vue'),
  },
  {
    path: '/area/:id',
    name: 'editArea',
    component: () => import('@/views/areas/Edit.vue'),
  },
];

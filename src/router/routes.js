export default [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/Login.vue'),
  },
  {
    path: '/notificaciones',
    name: 'notificaciones',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/lista-notificaciones',
    name: 'listaNotificaciones',
    component: () => import('@/views/Notificaciones.vue'),
  },
  {
    path: '/crear-administrador',
    name: 'creaAdministrador',
    component: () => import('@/views/administradores/Create.vue'),
  },
  {
    path: '/lista-administradores',
    name: 'listAdministradores',
    component: () => import('@/views/administradores/List.vue'),
  },
  {
    path: '/administrador/:id',
    name: 'editAdministrador',
    component: () => import('@/views/administradores/Edit.vue'),
  },
  {
    path: '/perfil',
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
    path: '/colaborador/:id/agregar-carga-familiar',
    name: 'agregarCargaFamiliar',
    component: () => import('@/views/admin/AgregarCargaFamiliar.vue'),
  },
  {
    path: '/colaborador/:id/lista-carga-familiar',
    name: 'ListaCargaFamiliar',
    component: () => import('@/views/admin/ListaCargaFamiliar.vue'),
  },
  {
    path: '/colaborador/:id/lista-cursos',
    name: 'ListCursosColaborador',
    component: () => import('@/views/admin/ListCursos.vue'),
  },
  {
    path: '/colaborador/:id/asignar-curso',
    name: 'asignarCurso',
    component: () => import('@/views/admin/AgregarCurso.vue'),
  },
  {
    path: '/editar-carga-familiar/:id',
    name: 'EditarCargaFamiliar',
    component: () => import('@/views/admin/EditCargaFamiliar.vue'),
  },
  {
    path: '/colaborador/:id/crear-comentario',
    name: 'crearcomentario',
    component: () => import('@/views/admin/Comentario.vue'),
  },
  {
    path: '/colaborador/:id/lista-comentarios',
    name: 'listacomentario',
    component: () => import('@/views/admin/ListComentario.vue'),
  },
  {
    path: '/comentario/:id',
    name: 'editcomentario',
    component: () => import('@/views/admin/EditComentario.vue'),
  },
  {
    path: '/colaborador/:id/crear-movilidad',
    name: 'crearmovilidad',
    component: () => import('@/views/admin/Movilidad.vue'),
  },
  {
    path: '/colaborador/:id/crear-movilidad-historica',
    name: 'movilidadHistorica',
    component: () => import('@/views/admin/MovilidadHistorica.vue'),
  },
  {
    path: '/colaborador/:id/movilidades',
    name: 'movilidades',
    component: () => import('@/views/admin/ListaMovilidad.vue'),
  },
  {
    path: '/movilidad/:id',
    name: 'editMovilidad',
    component: () => import('@/views/admin/EditMovilidad.vue'),
  },
  {
    path: '/curso-asignado/:id',
    name: 'editCursoAsignado',
    component: () => import('@/views/admin/EditCursoColaborador.vue'),
  },
  {
    path: '/crear-curso',
    name: 'crearCurso',
    component: () => import('@/views/courses/Create.vue'),
  },
  {
    path: '/lista-cursos',
    name: 'ListCourse',
    component: () => import('@/views/courses/List.vue'),
  },
  {
    path: '/consultas',
    name: 'Consultas',
    component: () => import('@/views/Consultas.vue'),
  },
  {
    path: '/curso/:id',
    name: 'courseEdit',
    component: () => import('@/views/courses/Edit.vue'),
  },
  {
    path: '/asignar-cursos',
    name: 'asignar',
    component: () => import('@/views/courses/Asignar.vue'),
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
    path: '/colaborador/:id/editar',
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
    path: '/cargo/:id',
    name: 'editcargo',
    component: () => import('@/views/cargos/Edit.vue'),
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
  { path: '*', redirect: '/login' },
];

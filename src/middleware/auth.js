import store from '@/store/index';

export default async (to, from, next) => {
  if (!store.getters['auth/check']) {
    next({ name: 'notificaciones' });
  } else {
    next({ name: 'notificaciones' });
  }
};

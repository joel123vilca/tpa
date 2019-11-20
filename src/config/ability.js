import { AbilityBuilder } from '@casl/ability'

export const ability = AbilityBuilder.define((can, cannot) => {
  can(['test'], 'Banners')
})

export function defineAbilitiesFor (user = {}) {
  const roleType = user.typeUser.title || 'guest'
  // const roleType = user.typeUser.id === 1 ? 'Registrador' : 'Administrador'

  switch (roleType) {
    case 'Administrador':
      return [
        {
          subject: 'Users',
          actions: ['list', 'create', 'update', 'delete']
        }
      ]

    case 'Bienestar':
      return [
        {
          subject: 'Users',
          actions: ['list', 'create', 'update', 'delete']
        }
      ]

    default:
      return []
  }
}

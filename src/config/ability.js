import { AbilityBuilder } from "@casl/ability";

export const ability = AbilityBuilder.define((can, cannot) => {
  can(["test"], "Users");
});

export function defineAbilitiesFor(user = {}) {
  const roleType = user.typeUser.name || "guest";
  // const roleType = user.typeUser.id === 1 ? 'Registrador' : 'Administrador'

  switch (roleType) {
    case "Administrador":
      return [
        {
          subject: "Users",
          actions: ["list", "create", "update", "delete"]
        }
      ];

    case "Usuario":
      return [
        {
          subject: "Users",
          actions: ["list", "create", "update", "delete"]
        }
      ];

    default:
      return [];
  }
}

import { RoleRoutes } from "../API/Role.routes";


export const AdminCheck = (user: any) => {
    return user.Roles? user.Roles.filter((role: any) => role.roleName === "Admin").length > 0 : false
}
export const ModCheck = async (channelId: string, checkUserId: string) => {
    const mods = await RoleRoutes.getModOfChannel(channelId);
    // console.log(mods);
    if (mods.length > 0) {
        // console.log(mods.filter((mod: any) => mod.userId == checkUserId).length > 0);
        return mods.filter((mod: any) => mod.userId == checkUserId || mod.userName == checkUserId).length > 0;
    }
    return false;
}
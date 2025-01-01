

export const AdminCheck = (user: any) => {
    return user.Roles? user.Roles.filter((role: any) => role.roleName === "Admin").length > 0 : false
}
export const ModCheck = (channelId: string, checkUserId: string) => {
    return false;
}
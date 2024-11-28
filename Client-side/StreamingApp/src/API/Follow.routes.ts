import { ApiConstants } from "./ApiConstants";

export const FollowRoutes = {
    GetFollowersByChannelId: async (channelId: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.FOLLOW.GET_FOLLOWERS_BY_ID + channelId);
            if(!response.ok) {
                throw new Error("Failed to check follow");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    Follow: async (ChannelId: string, FollowerId: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.FOLLOW.FOLLOW, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                body: JSON.stringify({ChannelId, FollowerId})
            });
            const responseText = await response.text();
            if(!response.ok) {
                throw new Error("Failed to follow");
            }
            return responseText;
        }
        catch (error) {
            console.error(error);
        }
    },
    Unfollow: async (ChannelId: string, FollowerId: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.FOLLOW.UNFOLLOW, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                body: JSON.stringify({ChannelId, FollowerId})
            });
            const responseText = await response.text();
            if(!response.ok) {
                throw new Error("Failed to unfollow");
            }
            return responseText;
        }
        catch (error) {
            console.error(error);
        }
    },
    FollowCheck: async (ChannelId: string, FollowerId: string) => {
        try{
            console.log(ChannelId, FollowerId);
            if(ChannelId === "" || FollowerId === "" || ChannelId === undefined || FollowerId === undefined) {
                return false;
            }
            const checkFetch = await FollowRoutes.GetFollowersByChannelId(ChannelId).then((data) => {
                console.log("true");
                let check = data.find((follower: any) => follower.followerId === FollowerId);
                console.log(check);
                if(check) return true;
                else return false;
            });
            return checkFetch;
        }
        catch (error) {
            console.error(error);
        }
    }
}
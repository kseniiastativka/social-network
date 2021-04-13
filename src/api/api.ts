import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "8b370f34-06e1-4d69-9fef-1c3c2f6d3945",
  },
});

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get(`/users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
};

export const followUnfollowAPI = {
  follow(userId: number) {
    return instance
      .post(`follow/${userId}`, {})
      .then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance
      .delete(`follow/${userId}`, {})
      .then((response) => response.data);
  },
};

export const profileAPI = {
  getUserProfile(userId: string) {
    return instance.get(`profile/` + userId).then((response) => response.data);
  },
};

export const authAPI = {
  getCurrentUserAuthorization() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
};

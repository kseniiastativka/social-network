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
  getUserStatus(userId: string) {
    return instance
      .get(`profile/status/` + userId)
      .then((response) => response.data);
  },
  updateUserStatus(status: string) {
    return instance
      .put(`profile/status/`, { status })
      .then((response) => response.data);
  },
  savePhoto(photo: File) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance
      .put(`profile/photo/`, formData, {
        headers: { "Content-Type": "multipart/fom-data" },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: {
    fullName: string;
    aboutMe: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    photos: { small: string; large: string };
    contacts: {
      facebook: string;
      github: string;
      instagram: string;
      mainLink: string;
      twitter: string;
      vk: string;
      website: string;
      youtube: string;
    };
  }) {
    return instance.put(`profile/`, profile).then((response) => response.data);
  },
};

export const authAPI = {
  getCurrentUserAuthorization() {
    return instance.get(`auth/me`).then((response) => response.data);
  },

  login(userData: {
    email: string;
    password: string;
    rememberMe: boolean;
    captchaUrl: string | undefined;
  }) {
    return instance
      .post(`auth/login`, userData)
      .then((response) => response.data);
  },

  logout() {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
};

export const security = {
  getCaptcha() {
    return instance
      .get(`security/get-captcha-url`)
      .then((response) => response.data);
  },
};

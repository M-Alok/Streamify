import axiosInstance from "./axios"

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get('/auth/checkAuth');
        return res.data;
    } catch (error) {
        console.log('Error in getAuthUser: ', error);
        return null;
    }
}

export const signup = async (signupData) => {
    const res = await axiosInstance.post('/auth/signup', signupData);
    return res.data;
}

export const login = async (loginData) => {
    const res = await axiosInstance.post('/auth/login', loginData);
    return res.data;
}

export const logout = async () => {
    const res = await axiosInstance.post('/auth/logout');
    return res.data;
}

export const onboardingUser = async (userData) => {
    const res = await axiosInstance.post('/auth/onboarding', userData);
    return res.data;
}

export const getRecommendedUsers = async () => {
    const res = await axiosInstance.get('/users');
    return res.data;
}

export const getMyFriends = async () => {
    const res = await axiosInstance.get('/users/friends');
    return res.data;
}

export const getOutgoingFrndReqs = async () => {
    const res = await axiosInstance.get('/users/outgoing-friend-request');
    return res.data;
}

export const sendFriendRequest = async (userId) => {
    const res = await axiosInstance.post(`/users/friend-request/${userId}`);
    return res.data;
}

export const getFriendRequests = async () => {
    const res = await axiosInstance.get('users/friend-request');
    return res.data;
}

export const acceptFriendRequest = async (requestId) => {
    const res = await axiosInstance.put(`users/friend-request/${requestId}/accept`);
    return res.data;
}
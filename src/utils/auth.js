export const tokenKey = "rgblent_token";
export const authToken = () => localStorage.getItem(tokenKey);
export const isNobody = () => !authToken();

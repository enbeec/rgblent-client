const tokenKey = "rgblent_token";
export const authToken = () => localStorage.getItem(tokenKey);
export const doLogin = () => localStorage.setItem(tokenKey);
export const doLogout = () => localStorage.removeItem(tokenKey);
export const isNobody = () => !authToken();

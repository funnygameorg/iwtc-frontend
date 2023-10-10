export const setAuthToken = (token: string) => {
  if (token) {
    window.sessionStorage.setItem('authtoken', token);
  } else {
    window.sessionStorage.setItem('authtoken', '');
  }
};

export const getAuthToken = () => {
  const authToken = window.sessionStorage.getItem('authtoken');
  if (authToken) {
    return authToken;
  } else {
    return null;
  }
};
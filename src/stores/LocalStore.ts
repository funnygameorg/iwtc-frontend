export const setAuthToken = (token: string) => {
  if (token) {
    window.localStorage.setItem('authtoken', token);
  } else {
    window.localStorage.setItem('authtoken', '');
  }
};

export const getAuthToken = () => {
  const authToken = window.localStorage.getItem('authtoken');
  if (authToken) {
    return authToken;
  } else {
    return null;
  }
};

export const localStorageClear = () => {
  // * 예시코드 : 제거가 필요없는 localstorage의 경우 아래 로직에서 처리하면 됨
  // const len = window.localStorage.length;
  // for (let i = len-1; i >= 0; i--){
  //     const currKey = window.localStorage.key(i);
  //    if(currKey !== 'authtoken') { //
  //     window.localStorage.removeItem(currKey);
  //    }
  // }
  window.localStorage.clear();
};
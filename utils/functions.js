import { store } from "@/redux/store";
import { FetchApi } from "./FetchApi";
import { setAuth } from "@/redux/slices/AuthSlice";
import { jwtDecode } from "jwt-decode";

export function capitalizeAllWords(str) {
  const words = str.split(' ');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}

export const stringToCharCode = (entityRegex) => {
  const downArrowCharCode = parseInt(entityRegex.replace(/&#(\d+);/, '$1'));
  const downArrowChar = String.fromCharCode(downArrowCharCode);
  return downArrowChar
}

export const loginUser = async (email, password, func) => {
  const res = await FetchApi({ url: '/agency/agencySignin', method: 'post', data: { email, password }, callback: func })
  console.log(res)
  if (res.status === 200) {
    store.dispatch(setAuth(res?.data.user.agency))

  }

  return res;

}

export const logoutUser = () => {
  store.dispatch(setAuth({}))
  window.location = '/login'
}


export const getAuth = () => {
  const auth = store.getState().auth?.user
  if (auth?.accessToken) {
    const data = jwtDecode(auth?.accessToken || '')
    console.log(data)
    return data.agency
  } else if (auth.role === 'AG') {
    return auth
  } else {
    return {}
  }
}
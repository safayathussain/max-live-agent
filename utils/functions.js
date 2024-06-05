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
export const getAuth = () => {
  const auth = store.getState().auth?.user
  console.log(auth)
  if (auth?.accessToken) {
    const data = jwtDecode(auth?.accessToken || '')
    return data.agency
  } else if (auth?.agency?.role === 'AG') {
    return auth.agency
  } else {
    return {}
  }
}
export const loginUser = async (email, password, func) => {
  const res = await FetchApi({ url: '/agency/agencySignin', method: 'post', data: { email, password }, callback: func })
  console.log(res)
  if (res.status === 200) {
    console.log(res?.data.user)
    store.dispatch(setAuth(res?.data.user))

  }

  return res;

}

export const logoutUser = () => {
  store.dispatch(setAuth({}))
  window.location = '/login'
}



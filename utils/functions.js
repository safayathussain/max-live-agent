import { store } from "@/redux/store";
import { FetchApi } from "./FetchApi";
import { setAuth } from "@/redux/slices/AuthSlice";

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
    store.dispatch(setAuth(res?.data.user))

  }
  
  return res;
  
}
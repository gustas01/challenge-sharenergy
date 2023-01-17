import { ITokenPayload } from "../interfaces/ITokenPayload";
import constants from "./contants";

export function getCookie(cookieName: string): string {
  let cookies: any = {};
  
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookies[key.trim()] = value;
  })

  return cookies[cookieName];
}


export async function getUserData(token: string): Promise<ITokenPayload>{   
  const data: any = await fetch(`${constants.baseURL}/user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

    if(data.status === 401)
      throw ('Unauthorized')

  const response: ITokenPayload = await data.json()
  return response
}
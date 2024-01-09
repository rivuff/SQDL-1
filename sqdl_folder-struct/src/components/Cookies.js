import jwt from "jsonwebtoken";
import { COOKIE_KEY } from "./config.js";

export function check() {
  const signed = localStorage.getItem("userInfo");
  if (signed == null) {
  }

  if (signed == null) {
    return null;
  }
  return JSON.parse(signed);
  try {
    const userData = jwt.verify(signed, COOKIE_KEY);
    return userData;
  } catch (error) {
    console.log(error);
    //const signed = localStorage.removeItem('userInfo');
    return null;
  }
}

export function set(data) {
  localStorage.setItem("userInfo", JSON.stringify(data));
  return true;
  // try{
  //     const jwt_cookie = jwt.sign(data, COOKIE_KEY, {expiresIn:'7d'})
  //     localStorage.setItem('userInfo', jwt_cookie);
  //     return true
  // }
  // catch(error){
  //     console.log(error)
  //     return false
  // }
}

export function getSessionCode() {
  return JSON.parse(localStorage.getItem("sessionCode"))
}

export function setSessionCode(code) {
  localStorage.setItem("sessionCode", JSON.stringify(code));
  return true;
}

export function getSpecificData(data) {
  return JSON.parse(localStorage.getItem(data))
}

export function setSpecificData(name, data) {
  console.log(`from setSpecificData function: ${name} ${data}`);
  localStorage.setItem(name, JSON.stringify(data))
  return true;
}

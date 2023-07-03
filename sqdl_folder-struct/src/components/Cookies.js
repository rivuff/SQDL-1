import jwt from "jsonwebtoken";
import COOKIE_KEY from './.env'
export function check(){
    const signed = localStorage.getItem('userInfo');
    try{
        const userData = jwt.verify(signed, COOKIE_KEY)
        console.log(userData)
        return userData
        }   
    catch (error){
        console.log(error)
        return null
    }
}

export function set(data){
    try{
        const jwt_cookie = jwt.sign(data, COOKIE_KEY, {expiresIn:'7d'})
        localStorage.setItem('userInfo', jwt_cookie);
        return true
    }
    catch(error){
        console.log(error)
        return false
    }
}

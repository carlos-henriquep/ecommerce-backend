import connection from "../config/pgConnect.js";

const userLogin = async(userEmail, userPassword)=>{
    const user = await connection.query("SELECT id, username, avatar FROM users WHERE email = $1 AND password = $2", [userEmail, userPassword]);

    return user.rows
}

const emailAlreadyRegistered = async(userEmail) =>{
    const user = await connection.query("SELECT id, username, avatar FROM users WHERE email = $1 ", [userEmail]);

    return user.rows
}


const userModel = {userLogin, emailAlreadyRegistered}

export default userModel
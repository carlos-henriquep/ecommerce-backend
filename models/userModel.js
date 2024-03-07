import connection from "../config/pgConnect.js";

const userLogin = async (userEmail) => {
  const user = await connection.query(
    "SELECT id, username, avatar, email,password FROM users WHERE email = $1",
    [userEmail]
  );

  return user.rows;
};

const userRegister = async (username, email, password) => {
  const client = await connection.connect();
  try {
    await client.query("BEGIN TRANSACTION");
    await client.query(
      "INSERT INTO users (username,email,password) VALUES($1,$2,$3)",
      [username, email, password]
    );
    await client.query("COMMIT");
    return {
      errorMessage: null,
      value: "User created successfully",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    return {
      errorMessage: error.message,
      value: null,
    };
  } finally {
    client.release();
  }
};

const userModel = { userLogin, userRegister };

export default userModel;

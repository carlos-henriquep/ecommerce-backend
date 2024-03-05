import connection from "../config/pgConnect.js";

const userLogin = async (userEmail) => {
  const user = await connection.query(
    "SELECT id, username, avatar, email,password FROM users WHERE email = $1",
    [userEmail]
  );

  return user.rows;
};

const userRegister = async (id, username, email, password) => {
  const pool = await connection.connect();
  try {
    await pool.query("BEGIN TRANSACTION");
    const savedUser = await pool.query(
      "INSERT INTO users (id,username,email,password) VALUES($1,$2,$3, $4)",
      [id, username, email, password]
    );
    return {
      errorMessage: null,
      value: "User created successfully",
    };
  } catch (error) {
    await pool.query("ROLLBACK");
    return {
      errorMessage: error.message,
      value: null,
    };
  } finally {
    await pool.query("COMMIT");
    pool.release();
  }
};

const userModel = { userLogin, userRegister };

export default userModel;

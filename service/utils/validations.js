const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2,}|com|br)$/;

const loginUser = (userEmail, userPassword) => {
  if (
    !userEmail ||
    typeof userEmail !== "string" ||
    !EMAIL_REGEX.test(userEmail)
  ) {
    return { errorMessage: "Invalid E-mail" };
  }
  if (!userPassword) {
    return { errorMessage: "The password field must not be empty" };
  }

  return {
    errorMessage: "",
  };
};

const userRegister = (username, userEmail, userPassword) => {
  if(!username || typeof username !== 'string'){
    return{errorMessage: "Invalid username"}
  }
  if (
    !userEmail ||
    typeof userEmail !== "string" ||
    !EMAIL_REGEX.test(userEmail)
  ) {
    return { errorMessage: "Invalid E-mail" };
  }
  if (!userPassword) {
    return { errorMessage: "Invalid password" };
  }

  return {
    errorMessage: ""
  }
};

const validations = { loginUser, userRegister };

export default validations;

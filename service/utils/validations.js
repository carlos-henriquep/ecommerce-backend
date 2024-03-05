const loginUser = (userEmail, userPassword) => {
  const emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2,}|com|br)$/;
  if(!userEmail || typeof userEmail !== 'string' || !emailRegex.test(userEmail)){
    return {errorMessage: "Email inválido!"}
  }
  if(!userPassword){
    return {errorMessage: "O campo senha não pode estar vazio"}
  }

  return {
    errorMessage: ""
  }
};

const validations = { loginUser };

export default validations;

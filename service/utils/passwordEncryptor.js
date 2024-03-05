import bcrypt from "bcrypt";

const saltRounds = bcrypt.genSaltSync(10);

const encryptPassword =async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword
};

const decryptPassword = async(password)=>{
  const decripted = await bcrypt.compare(password, hash)
  return decripted
}

const passwordEncryptor = {encryptPassword, decryptPassword}

export default passwordEncryptor;
import { Secret, sign } from "jsonwebtoken";
const JWT_KEY = process.env.JWT_KEY as Secret;

const generateToken = (id: string) => {
  return sign({ id }, JWT_KEY);
};

export default generateToken;

import jwt from "jsonwebtoken";

class JWT {
  async create(id: string): Promise<string> {
    try {
      const token = await jwt.sign({ id: id }, process.env.JWT_SECRET);
      return token;
    } catch (error) {
      return error;
    }
  }
}

export default new JWT();

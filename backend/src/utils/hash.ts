import bcrypt from "bcryptjs";

class Hash {
  async hash(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      return error;
    }
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      return error;
    }
  }
}

export default new Hash();

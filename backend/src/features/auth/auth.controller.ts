import { Request, Response } from "express";
import { HttpStatus } from "../../utils/HttpStatus";
import db from "../../config/db.config";
import { usersTable } from "../../db/userSchema";
import { eq } from "drizzle-orm";
import hash from "../../utils/hash";
import jwt from "../../utils/jwt";
import { cookieOptions } from "../../utils/cookieOptions";

const authController = {
  register: async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing required fields" });
    }

    try {
      const exists = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (exists.length != 0) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: "User already exists" });
      }

      const hashedPassword = await hash.hash(password);

      const [user] = await db
        .insert(usersTable)
        .values({
          email: email,
          fullName: fullName,
          password: hashedPassword,
        })
        .returning({ id: usersTable.id });

      const token = await jwt.create(user.id);

      res.cookie("token", token, cookieOptions);

      res.status(HttpStatus.OK).json({ message: "Registered successfully" });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing required fields" });
    }
    try {
      const exists = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (
        exists.length == 0 ||
        !(await hash.compare(password, exists[0].password))
      ) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Invalid credentials" });
      }

      const token = await jwt.create(exists[0].id);

      res.cookie("token", token, cookieOptions);

      return res.status(HttpStatus.OK).json({ message: "Login successful" });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },
};

export default authController;

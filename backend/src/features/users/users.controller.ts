import { eq } from "drizzle-orm";
import db from "../../config/db.config";
import { usersTable } from "../../db/userSchema";
import { HttpStatus } from "../../utils/HttpStatus";

const usersController = {
  exists: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }
    try {
      const user = await db
        .select({
          id: usersTable.id,
          email: usersTable.email,
          fullName: usersTable.fullName,
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId));

      if (user.length == 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No such user found" });
      }

      return res.status(HttpStatus.OK).json({ user: user[0] });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  },
};

export default usersController;

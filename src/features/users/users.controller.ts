import { eq } from "drizzle-orm";
import db from "../../config/db.config.js";
import { usersTable } from "../../db/userSchema.js";
import { HttpStatus } from "../../utils/httpStatus.js";

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

  update: async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    try {
      const {
        fullName,
        mobile,
        city,
        state,
        country,
        summary,
        gridOrTable,
        socialLinks,
        skills,
      } = req.body;

      const updateData: any = {};

      if (fullName !== undefined) updateData.fullName = fullName;
      if (mobile !== undefined) updateData.mobile = mobile;
      if (city !== undefined) updateData.city = city;
      if (state !== undefined) updateData.state = state;
      if (country !== undefined) updateData.country = country;
      if (summary !== undefined) updateData.summary = summary;
      if (gridOrTable !== undefined) updateData.gridOrTable = gridOrTable;
      if (socialLinks !== undefined) updateData.socialLinks = socialLinks;
      if (skills !== undefined) updateData.skills = skills;

      if (Object.keys(updateData).length === 0) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "No valid fields provided to update" });
      }

      const updatedUser = await db
        .update(usersTable)
        .set(updateData)
        .where(eq(usersTable.id, userId))
        .returning({
          id: usersTable.id,
          fullName: usersTable.fullName,
          email: usersTable.email,
          mobile: usersTable.mobile,
          city: usersTable.city,
          state: usersTable.state,
          country: usersTable.country,
          summary: usersTable.summary,
          gridOrTable: usersTable.gridOrTable,
          socialLinks: usersTable.socialLinks,
          skills: usersTable.skills,
        });

      if (updatedUser.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "User not found" });
      }

      return res.status(HttpStatus.OK).json({
        message: "Profile updated successfully",
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  },
};

export default usersController;

import { eq } from "drizzle-orm";
import db from "../../config/db.config.js";
import { usersTable } from "../../db/userSchema.js";
import { HttpStatus } from "../../utils/httpStatus.js";
import { Request, Response } from "express";

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
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId));

      if (user.length == 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No such user found" });
      }

      const { password, ...safeUser } = user[0];

      return res.status(HttpStatus.OK).json({ user: safeUser });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
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
        username,
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
      if (userId !== undefined) updateData.username = username;

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
          username: usersTable.username,
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
        .json({ message: "Internal Server Error", error });
    }
  },

  checkUsername: async (req: Request, res: Response) => {
    const username = req.params.username;
    if (!username) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing required fields" });
    }
    try {
      const user = await db
        .select({ username: usersTable.username })
        .from(usersTable)
        .where(eq(usersTable.username, username));

      if (user.length != 0) {
        return res.status(200).json({ success: false });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },

  getByUsername: async (req: Request, res: Response) => {
    const username = req.params.username;
    if (!username) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing required fields" });
    }
    try {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, username));

      if (user.length == 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No such user found" });
      }

      const { password, ...safeUser } = user[0];
      return res.status(HttpStatus.OK).json({ user: safeUser });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },
};

export default usersController;

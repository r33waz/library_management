import { Request } from "express";
import AppDataSource from "../../config/db.config";
import { STATUS_CODE } from "../../constant/enum";
import User from "../../entitys/user.entity";
import { pagination } from "../../utils/pegniation";

const userRepository = AppDataSource.getRepository(User);

const AdminService = {
  getAllUser: async (req: Request) => {
    const { page, limit, skip } = pagination(
      Number(req.query.page) || 1,
      Number(req.query.limit) || 10
    );

    const searchQuery = req.query.search;
    console.log("🚀 ~ getAllUser: ~ searchQuery:", searchQuery);

    // Start with the query builder
    const queryBuilder = userRepository
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.email",
        "user.last_activity_date",
        "user.created_at",
      ])
      .leftJoin("user.profile", "profile")
      .addSelect([
        "profile.id",
        "profile.fullname",
        "profile.universityId",
        "profile.status",
        "profile.role",
        "profile.last_activity_date",
        "profile.created_at",
      ])
      .leftJoin("profile.universityCard", "universityCard") // Eagerly load universityCard
      .addSelect([
        "universityCard.id",
        "universityCard.path",
        "universityCard.mediaType",
      ])
      .leftJoin("profile.profilepic", "profilepic") // Eagerly load profilepic
      .addSelect(["profilepic.id", "profilepic.path", "profilepic.mediaType"])
      .skip(skip) // Pagination
      .take(limit); // Pagination
    //   .orderBy("user.created_at AS createdAt"); // Ordering by creation date (you can change this as needed)

    if (searchQuery) {
      queryBuilder
        .where("user.email LIKE :email", { email: `%${searchQuery}%` })
        .andWhere("profile.fullname LIKE :name", { name: `%${searchQuery}%` })
        .andWhere("profile.universityId LIKE :universityId", {
          universityId: `%${searchQuery}%`,
        });
    }

    // Fetch users and count
    const [users, count] = await queryBuilder.getManyAndCount();

    // Return the result
    if (users.length > 0) {
      return {
        status: STATUS_CODE.SUCCESS,
        message: "All users fetched successfully",
        data: users,
        totalCount: count,
        page,
        limit,
      };
    } else {
      return {
        status: STATUS_CODE.NOT_FOUND,
        message: "No users found",
        data: [],
        totalCount: count,
        page,
        limit,
      };
    }
  },
};

export default AdminService;

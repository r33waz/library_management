import { Request, Response } from "express";
import AdminService from "../../service/admin/admin.service";

const AdminController = {
  getAlluser: async (req: Request, res: Response) => {
    const result = await AdminService.getAllUser(req);
    res?.status(result?.status).json({
      status: result?.status,
      message: result?.message,
      data: result?.data,
      page: result?.page,
      limit: result?.limit,
      total: result?.totalCount,
    });
  },
};

export default AdminController;

import { STATUS_CODE } from "../constant/enum";

// authService.ts
const AuthService = {
  // Login service
  loginService: async (body: any) => {
    const { email, password } = body;
    if (!email || !password) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "Invalid email or password",
      };
    }

    return {
      status: STATUS_CODE.SUCCESS,
      message: "Login successful",
      email,
    };
  },

  signUpSErvice: async (body: any) => {
    const { email, password } = body;
    if (!email || !password) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "Invalid email or password",
      };
    }

    return {
      status: STATUS_CODE.SUCCESS,
      message: "Signup successful",
      email,
    };
  },
};

export default AuthService;

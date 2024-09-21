import api from "../index";

const login = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    return res;
  } catch (err) {
    throw err;
  }
};

const register = async (registerFormData) => {
  try {
    const res = await api.post("/auth/register", registerFormData);
    return res;
  } catch (err) {
    throw err;
  }
};

const logout = async () => {
  try {
    const res = await api.get("/auth/logout");
    return res;
  } catch (err) {
    throw err;
  }
};

const authService = { login, register, logout };
export default authService;

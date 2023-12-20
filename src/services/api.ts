import axios from "axios";

const baseUrl: string | undefined = import.meta.env.VITE_BACKEND_URL; /* .env */
if (!baseUrl) throw new Error("VITE_BACKEND_URL is not defined");

const defaultClient = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
  withCredentials: true,
});
axios.defaults.headers.common["Content-Type"] = "application/json";

class TokenService {
  public token: string | null = null;
  private expireTime: Date | null = null;
  private refreshToken: string | null = null;

  verifyCurrentToken(): boolean {
    if (!this.token) return false;
    if (!this.expireTime) return false;
    const actualDate = new Date();
    return actualDate < this.expireTime;
  }

  getCurrentToken(): string | null {
    console.log(this);
    if (!this.token) return null;
    if (this.verifyCurrentToken()) return this.token;
    this.updateCurrentToken();
    let tokenIsUpdated = false;
    while (!tokenIsUpdated) {
      if (this.verifyCurrentToken()) {
        tokenIsUpdated = true;
      }
    }
    return this.token;
  }

  async getRefreshToken() {
    if (this.refreshToken) return this.refreshToken;
    const refreshToken = localStorage.getItem("refresh_token");
    this.refreshToken = refreshToken;
    return refreshToken;
  }

  async updateCurrentToken() {
    defaultClient
      .get("/api/token/refresh", {
        params: { refresh: this.getRefreshToken() },
      })
      .then((r) => {
        this.token = r.data.access;
        const actualDate = new Date();
        this.expireTime = new Date(actualDate.getTime() + 5 * 60000);
      });
  }

  setCurrentToken(token: string) {
    this.token = token;
    const actualDate = new Date();
    this.expireTime = new Date(actualDate.getTime() + 5 * 60000);
  }

  saveRefreshToken(refreshToken: string) {
    localStorage.setItem("refresh_token", refreshToken);
    this.refreshToken = refreshToken;
  }

  async setRefreshToken(email: string, password: string) {
    try {
      const { refresh, access } = await defaultClient
        .post("api/token/", { email, password })
        .then((r) => r.data);
      console.log(refresh, access);

      this.saveRefreshToken(refresh);
      this.setCurrentToken(access);
    } catch (err) {
      throw new Error("Erro de validação");
    }
  }
}

const tokenService = new TokenService();

defaultClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getCurrentToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { defaultClient, tokenService as DefaultClientTokenService };

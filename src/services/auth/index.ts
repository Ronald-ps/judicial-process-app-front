import { defaultClient } from "@services/api"

export interface LoggedUser {
  id: number
  email: string
  name: string
}
export const getLoggedUser = (): Promise<LoggedUser> => {
  return defaultClient.get("/whoami").then(r => r.data)
}

export const login = (email: string, password: string): Promise<LoggedUser> => {
  return defaultClient.post("/login", { email, password }).then(r => r.data)
}

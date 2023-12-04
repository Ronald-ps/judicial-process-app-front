import jsonServer from "json-server";
const server = jsonServer.create();
const routers = jsonServer.router("src/mock/api-mock/db.json");
const middlewares = jsonServer.defaults();
import cors from "cors";

server.use(middlewares);
server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
server.options("*", cors());

const ENDPOINTS = {
  users: "/users",
  whoami: "/whoami",
  login: "/login",
  contributions: "/contributions",
  client: "/client",
};

server.use(ENDPOINTS.users, (req, res, next) => {
  const users = routers.db.get("users").value();
  res.json(users);
});
server.use(ENDPOINTS.login, (req, res, next) => {
  const user = routers.db.get("login").value();
  res.json(user);
});
server.use(ENDPOINTS.whoami, (req, res, next) => {
  const user = routers.db.get("whoami").value();
  res.json(user);
});
server.use(ENDPOINTS.contributions, (req, res, next) => {
  const contributions = routers.db.get("contributions").value();
  res.json(contributions);
});
server.use(ENDPOINTS.client, (req, res, next) => {
  const client = routers.db.get("client").value();
  res.json(client);
});

const port = 3000;
const host = `http://localhost:${port}`;

server.listen(port, () => {
  let endpoints = [];
  for (let endpoint in ENDPOINTS) {
    endpoints.push(ENDPOINTS[endpoint]);
  }
  console.log(`Servidor JSON Server está rodando em http://localhost:${port}\n
  RECURSOS:\n`);
  endpoints.forEach((endpoint) => console.log(`- ${host}${endpoint}`));
});

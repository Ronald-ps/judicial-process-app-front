import cors from "cors";
import jsonServer from "json-server";

const server = jsonServer.create();
const routers = jsonServer.router("src/mock/api-mock/db.json");
const middlewares = jsonServer.defaults();

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
server.use(jsonServer.bodyParser);

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
server.get(ENDPOINTS.client, (req, res, next) => {
  const { name: nameForSearch } = req.query;
  const clients = routers.db.get("client").value();
  if (nameForSearch) {
    const filteredClients = clients.filter(
      (client) =>
        client.first_name.toLowerCase().includes(nameForSearch.toLowerCase()) ||
        client.last_name.toLowerCase().includes(nameForSearch.toLowerCase())
    );
    return res.json(filteredClients);
  }
  res.json(clients);
});
server.post(ENDPOINTS.client, (req, res) => {
  console.log(req.body);
  const newClient = req.body;
  const clients = routers.db.get("client");
  const maxId = clients.reduce((maxId, client) => {
    return client.id > maxId ? client.id : maxId;
  });
  newClient.id = maxId + 1;
  clients.push(newClient).write(newClient);
  res.status(201).json(clients[clients.length - 1]);
});
server.get(`${ENDPOINTS.client}/:clientId`, (req, res) => {
  const { clientId } = req.params;
  const clients = routers.db.get("client").value();
  const client = clients.find((client) => client.id === Number(clientId));

  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ message: "Client not found" });
  }
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

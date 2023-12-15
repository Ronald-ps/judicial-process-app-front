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
  legalProcess: "/legal-process",
  clientProcesses: "/client/:clientId/legal-process",
  clientSimpleProcesses: "/client/:clientId/legal-process/simple",
  evolutions: "/evolution",
  observations: "/observation",
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
  console.log("error");
  const newClient = req.body;
  const clientsWrapper = routers.db.get("client");
  const clients = clientsWrapper.value();
  const clientMaxId = clients.reduce((clientMaxId, client) => {
    return client.id > clientMaxId.id ? client : clientMaxId;
  });
  const maxId = clientMaxId.id;
  newClient.id = maxId + 1;
  console.log(newClient);
  clientsWrapper.push(newClient).write(newClient);
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
server.patch(`${ENDPOINTS.client}/:clientId`, (req, res) => {
  const { clientId } = req.params;
  const clientsWrapper = routers.db.get("client");
  const clients = clientsWrapper.value();
  const client = clients.find((client) => client.id === Number(clientId));

  if (client) {
    const updatedClient = { ...client, ...req.body };
    clientsWrapper
      .find({ id: Number(clientId) })
      .assign(updatedClient)
      .write();
    res.json(updatedClient);
  } else {
    res.status(404).json({ message: "Client not found" });
  }
});

server.use(ENDPOINTS.legalProcess, (req, res, next) => {
  const legalProcess = routers.db.get("legalProcesses").value();
  res.json(legalProcess);
});

server.use(ENDPOINTS.clientProcesses, (req, res, next) => {
  const { clientId } = req.params;
  const legalProcess = routers.db.get("legalProcesses").value();
  const clientProcesses = legalProcess.filter(
    (process) => process.client_id === Number(clientId)
  );
  res.json(clientProcesses);
});

server.get(ENDPOINTS.clientSimpleProcesses, (req, res, next) => {
  const { clientId } = req.params;
  const legalProcess = routers.db.get("simpleListLegalProcesses").value();
  const clientProcesses = legalProcess.filter(
    (process) => process.client_id === Number(clientId)
  );
  return res.json(clientProcesses);
});

server.get(ENDPOINTS.evolutions, (req, res, next) => {
  const evolutions = routers.db.get("evolutions").value();
  res.json(evolutions);
});

server.post(ENDPOINTS.evolutions, (req, res) => {
  const { process_id, description } = req.body;

  const process = routers.db.get("legalProcesses").value()[0];

  const evolutionsWrapper = routers.db.get("evolutions");
  const evolutions = evolutionsWrapper.value();
  const maxId = evolutions.reduce((maxId, evolution) => {
    return evolution.id > maxId ? evolution.id : maxId;
  }, 0);
  const newEvolution = {};
  newEvolution.id = maxId + 1;
  newEvolution.description = description;
  newEvolution.process_id = process_id;
  newEvolution.process_code = process.code;
  newEvolution.created_at = new Date().toISOString();

  evolutionsWrapper.push(newEvolution).write(newEvolution);
  res.status(201).json(evolutions[evolutions.length - 1]);
});

server.get(ENDPOINTS.observations, (req, res, next) => {
  const observations = routers.db.get("observations").value();
  res.json(observations);
});
server.post(ENDPOINTS.observations, (req, res) => {
  const { process_id, description } = req.body;

  let process = routers.db
    .get("legalProcesses")
    .value()
    .find((process) => process.id === process_id);
  if (!process) {
    process = routers.db.get("simpleListLegalProcesses").value()[0];
  }

  const observationsWrapper = routers.db.get("observations");
  const observations = observationsWrapper.value();
  const maxId = observations.reduce((maxId, observation) => {
    return observation.id > maxId ? observation.id : maxId;
  }, 0);
  const newObservation = {};
  newObservation.id = maxId + 1;
  newObservation.description = description;
  newObservation.process_id = process_id;
  newObservation.process_code = process.code;
  newObservation.created_at = new Date().toISOString();

  observationsWrapper.push(newObservation).write(newObservation);
  res.status(201).json(observations[observations.length - 1]);
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

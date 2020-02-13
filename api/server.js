const express = require("express");

const server = express();

server.use(express.json());

let projects = [];

server.get("/projects", (request, response) => {
  console.log("Chamada do projets");
  return response.status(200).json(projects)
});

server.post("/projects", (request, response) => {
  let project = {
    id : request.body.id,
    title: request.body.title,
    tasks: []
  }
  projects.push(project);
  return response.status(201).json(project);
});

server.put("/projects/:id", (request, response) => {
  projects[request.params.id].title = request.body.title

  return response.status(200).json(projects[request.params.id]);
});


server.listen(4444);
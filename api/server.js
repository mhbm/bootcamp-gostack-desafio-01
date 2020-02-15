const express = require("express");

const server = express();

server.use(express.json());

let projects = [];

function verifyProjectIdExist(request, response, next) {
  if (projects.length <= request.params.id) {
    return response.status(400).json({
      "message": "ProjectId does not exist"
    })
  }
  next();
}

function middleware(request, response, next) {
  console.time("Request");
  console.count("Request number: ")
  next();
  console.timeEnd("Request");
}

server.get("/projects", middleware, (request, response) => {
  return response.status(200).json(projects)
});

server.post("/projects", middleware, (request, response) => {
  let project = {
    id: request.body.id,
    title: request.body.title,
    tasks: []
  }
  projects.push(project);
  return response.status(201).json(project);
});

server.put("/projects/:id", middleware, verifyProjectIdExist, (request, response) => {
  projects[request.params.id].title = request.body.title

  return response.status(200).json(projects[request.params.id]);
});

server.delete("/projects/:id", middleware, verifyProjectIdExist, (request, response) => {
  projects.splice(request.params.id, 1);
  return response.status(200).json(projects);
});

server.post("/projects/:id/tasks", middleware, verifyProjectIdExist, (request, response) => {
  projects[request.params.id].tasks.push(request.body.title);
  return response.status(201).json(projects[request.params.id]);
})

server.listen(4444, () => {
  console.log("Server working at 4444 port")
});
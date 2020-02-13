const express = require("express");

const server = express();

server.use(express.json());

let projects = [];

function verifyProjectIdExist(request, response, next) {
  console.log(request.params.id);
  if (projects.length <= request.params.id) {
    return response.status(400).json({
      "message": "ProjectId does not exist"
    })
  }
  next();
}

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

server.put("/projects/:id", verifyProjectIdExist, (request, response) => {
  projects[request.params.id].title = request.body.title

  return response.status(200).json(projects[request.params.id]);
});

server.delete("/projects/:id", verifyProjectIdExist, (request, response) => {
  projects.splice(request.params.id, 1);
  return response.status(200).json(projects);
});

server.post("/projects/:id/tasks", verifyProjectIdExist, (request, response)=> {
  projects[request.params.id].tasks.push(request.body.title);
  return response.status(201).json(projects[request.params.id]);
})

server.listen(4444);
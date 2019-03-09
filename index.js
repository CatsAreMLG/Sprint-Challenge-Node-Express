const express = require('express')
const ProjectsRouter = require('./data/routers/projectsRouter.js')
const ActionsRouter = require('./data/routers/actionsRouter.js')
const server = express()
server.use(express.json())
// server.use('/api/posts', ProjectsRouter)
// server.use('/api/users', ActionsRouter)
const PORT = 8888

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to the API</h2>`)
})

server.listen(PORT, _ =>
  console.log(`SERVER RUNNING ON http://localhost:${PORT}`)
)

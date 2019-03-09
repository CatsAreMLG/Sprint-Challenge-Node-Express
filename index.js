const express = require('express')
const ProjectsRouter = require('./data/routers/projectsRouter.js')
const ActionsRouter = require('./data/routers/actionsRouter.js')
const server = express()
const cors = require('cors')

server.use(cors())
server.use(express.json())
server.use('/api/projects', ProjectsRouter)
server.use('/api/actions', ActionsRouter)
const PORT = 8888

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to the API</h2>`)
})

server.listen(PORT, _ =>
  console.log(`SERVER RUNNING ON http://localhost:${PORT}`)
)

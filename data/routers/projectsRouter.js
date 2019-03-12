const express = require('express')

const Projects = require('../helpers/projectModel')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get()
    res.status(200).json(projects)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The projects information could not be retrieved.' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const project = await Projects.get(req.params.id)
    project
      ? res.status(200).json(project)
      : res.status(404).json({
          message: 'The project with the specified ID does not exist.'
        })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The project information could not be retrieved.' })
  }
})

router.post('/', async (req, res) => {
  if (req.body && req.body.name && req.body.description)
    try {
      const project = await Projects.insert(req.body)
      res.status(201).json(project)
    } catch (error) {
      res.status(500).json({
        error: 'There was an error while saving the project to the database'
      })
    }
  else
    res.status(400).json({
      errorMessage: 'Please provide a name and description for the project.'
    })
})

router.delete('/:id', async (req, res) => {
  try {
    const project = await Projects.remove(req.params.id)
    project
      ? res.status(200).json(project)
      : res.status(404).json({
          message: 'The project with the specified ID does not exist.'
        })
  } catch (error) {
    res.status(500).json({ error: 'The project could not be removed' })
  }
})

router.put('/:id', async (req, res) => {
  if (req.body && (req.body.name || req.body.description))
    try {
      const project = await Projects.update(req.params.id, req.body)
      project
        ? res.status(200).json(project)
        : res.status(404).json({
            message: 'The project with the specified ID does not exist.'
          })
    } catch (error) {
      res
        .status(500)
        .json({ error: 'The project information could not be modified.' })
    }
  else
    res.status(400).json({
      errorMessage: 'Please provide name and/or description for the project.'
    })
})

router.get('/:id/actions', async (req, res) => {
  try {
    const project = await Projects.getProjectActions(req.params.id)
    project.length > 0
      ? res.status(200).json(project)
      : res.status(404).json({
          message: 'The project with the specified ID does not exist.'
        })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The project information could not be retrieved.' })
  }
})

module.exports = router

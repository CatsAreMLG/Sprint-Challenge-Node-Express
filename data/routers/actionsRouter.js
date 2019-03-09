const express = require('express')

const Actions = require('../helpers/actionModel.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get()
    res.status(200).json(actions)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The actions information could not be retrieved.' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const action = await Actions.get(req.params.id)
    action
      ? res.status(200).json(action)
      : res
          .status(404)
          .json({ message: 'The action with the specified ID does not exist.' })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The action information could not be retrieved.' })
  }
})

router.post('/', async (req, res) => {
  if (req.body && req.body.project_id && req.body.description && req.body.notes)
    try {
      const action = await Actions.insert(req.body)
      res.status(201).json(action)
    } catch (error) {
      res.status(500).json({
        error: 'There was an error while saving the action to the database'
      })
    }
  else
    res.status(400).json({
      errorMessage:
        'Please provide description, notes, and project id for the action.'
    })
})

router.delete('/:id', async (req, res) => {
  try {
    const action = await Actions.remove(req.params.id)
    action
      ? res.status(200).json(action)
      : res
          .status(404)
          .json({ message: 'The action with the specified ID does not exist.' })
  } catch (error) {
    res.status(500).json({ error: 'The action could not be removed' })
  }
})

router.put('/:id', async (req, res) => {
  if (req.body)
    try {
      const action = await Actions.update(req.params.id, req.body)
      action
        ? res.status(200).json(action)
        : res.status(404).json({
            message: 'The action with the specified ID does not exist.'
          })
    } catch (error) {
      res
        .status(500)
        .json({ error: 'The action information could not be modified.' })
    }
  else
    res.status(400).json({
      errorMessage: 'Please provide content for the action change.'
    })
})

module.exports = router

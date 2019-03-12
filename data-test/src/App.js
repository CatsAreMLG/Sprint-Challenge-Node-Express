import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { ReactComponent as Trash } from './images/trash-2.svg'
import { ReactComponent as Edit } from './images/edit.svg'
import { ReactComponent as Check } from './images/check.svg'
import './App.css'

export default function App() {
  const [projects, useProjects] = useState([])
  const [error, useError] = useState('')
  const [editing, useEditing] = useState(false)
  const [currentId, useCurrentId] = useState(null)
  const [currentName, useCurrentName] = useState('')
  const [currentDescription, useCurrentDescription] = useState('')
  useEffect(
    _ => {
      fetchProjects()
    },
    [projects.length < 1]
  )
  async function fetchProjects() {
    try {
      const response = await fetch('http://localhost:8888/api/projects')
      const body = await response.json()
      useProjects(body)
    } catch (e) {
      useError(e.message)
    }
  }
  async function deleteProject(id) {
    try {
      const response = await fetch('http://localhost:8888/api/projects/' + id, {
        method: 'DELETE'
      })
      const body = await response.json()
      const newProjects = projects.filter(project => project.id !== body.id)
      useProjects(newProjects)
      fetchProjects()
    } catch (e) {
      useError(e.message)
    }
  }
  async function submit() {
    try {
      const res = await axios.put(
        'http://localhost:8888/api/projects/' + currentId,
        {
          name: currentName,
          description: currentDescription
        }
      )
      const body = res.data
      const id = res.data.id
      const newProjects = projects.map(project => {
        return project.id.toString() === id ? body : project
      })
      useProjects(newProjects)
      useEditing(false)
      fetchProjects()
    } catch (err) {
      useError(err)
    }
  }
  const edit = (id, name, description) => {
    useCurrentId(id)
    useCurrentName(name)
    useCurrentDescription(description)
    useEditing(!editing)
  }
  const handleChange = e => {
    if (e.target.dataset.name === 'name') useCurrentName(e.target.value)
    else if (e.target.dataset.name === 'description')
      useCurrentDescription(e.target.value)
  }
  return (
    <div className="container">
      {error && error}
      {projects.length > 0 &&
        projects.map(({ id, name, description }) => (
          <div className="card" key={'card-' + id}>
            <h1 className="card_name">
              {editing && currentId === id ? (
                <input
                  type="text"
                  value={currentName}
                  data-name="name"
                  onChange={handleChange}
                />
              ) : (
                name
              )}
            </h1>
            <p className="card_description">
              {editing && currentId === id ? (
                <input
                  type="text"
                  value={currentDescription}
                  data-name="description"
                  onChange={handleChange}
                />
              ) : (
                description
              )}
            </p>
            <div className="card_icons">
              {editing && currentId === id ? (
                <Check className="card_check" size="16px" onClick={submit} />
              ) : (
                <Edit
                  className="card_edit"
                  size="16px"
                  onClick={_ => edit(id, name, description)}
                />
              )}
              <Trash
                className="card_delete"
                size="16px"
                onClick={_ => deleteProject(id)}
              />
            </div>
          </div>
        ))}
    </div>
  )
}

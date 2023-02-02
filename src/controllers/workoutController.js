const workoutService = require('../services/workoutService')

const getAllWorkouts = (req, res) => {
  try {
    const allWorkouts = workoutService.getAllWorkouts()
    res.send({ status: 'OK', data: allWorkouts })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getOneWorkout = (req, res) => {
  const {
    params: { workoutId }
  } = req
  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':workoutId' can not be empty" }
    })
  }
  try {
    const workout = workoutService.getOneWorkout(workoutId)
    res.send({ status: 'OK', data: workout })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createWorkout = (req, res) => {
  const { name, mode, equipment, exercises, trainerTips } = req.body

  if (!name || !mode || !equipment || !exercises || !trainerTips) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'"
      }
    })
  }
  const newWorkout = {
    name: name,
    mode: mode,
    equipment: equipment,
    exercises: exercises,
    trainerTips: trainerTips
  }
  try {
    const createdWorkout = workoutService.createWorkout(newWorkout)
    res.status(201).send({ status: 'OK', data: createdWorkout })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId }
  } = req
  if (!workoutId) {
    return
  }
  try {
    const updateWorkouts = workoutService.updateOneWorkout(workoutId, body)
    res.status(201).send({ status: 'OK', data: updateWorkouts })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId }
  } = req

  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':workoutId' can not be empty" }
    })
  }
  try {
    workoutService.deleteOneWorkout(workoutId)
    res.status(201).send({ status: 'OK', data: null })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  updateOneWorkout,
  deleteOneWorkout
}

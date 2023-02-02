const Workout = require('../database/Workout')
const { v4: uuid } = require('uuid')

const getAllWorkouts = () => {
  try {
    const allWorkouts = Workout.getAllWorkouts()
    return allWorkouts
  } catch (error) {
    throw error
  }
}

const getOneWorkout = workoutId => {
  try {
    const workout = Workout.getOneWorkout(workoutId)
    return workout
  } catch (error) {
    throw error
  }
}

const createWorkout = newWorkout => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'UTC' }),
    updateAt: new Date().toLocaleString('pt-BR', { timeZone: 'UTC' })
  }

  try {
    const createdWorkout = Workout.createWorkout(workoutToInsert)
    return createdWorkout
  } catch (error) {
    throw error
  }
}

const updateOneWorkout = (workoutId, workout) => {
  try {
    const updatedWorkout = Workout.updateOneWorkout(workoutId, workout)
    return updatedWorkout
  } catch (error) {
    throw error
  }
}

const deleteOneWorkout = workoutId => {
  try {
    Workout.deleteOneWorkout(workoutId)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  updateOneWorkout,
  deleteOneWorkout
}

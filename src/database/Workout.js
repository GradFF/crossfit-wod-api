const DB = require('./db.json')
const { saveToDatabase } = require('./utils')

const getAllWorkouts = () => {
  try {
    return DB.workouts
  } catch (error) {
    throw { status: 500, message: error }
  }
}

const getOneWorkout = workoutId => {
  try {
    const workout = DB.workouts.find(workout => workout.id === workoutId)
    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`
      }
    }
    return workout
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const createWorkout = newWorkout => {
  const isAlreadyAdded =
    DB.workouts.findIndex(workout => workout.name === newWorkout.name) > 1

  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name ${newWorkout.name} already exists`
    }
  }

  try {
    DB.workouts.push(newWorkout)
    saveToDatabase(DB)
    return newWorkout
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }
}

const updateOneWorkout = (workoutId, workout) => {
  try {
    const indexForUpdate = DB.workouts.findIndex(
      workout => workout.id === workoutId
    )

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`
      }
    }

    const updateWorkout = {
      ...DB.workouts[indexForUpdate],
      ...workout,
      updateAt: new Date().toLocaleString('pt-BR')
    }
    DB.workouts[indexForUpdate] = updateWorkout
    saveToDatabase(DB)
    return updateWorkout
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const deleteOneWorkout = workoutId => {
  try {
    const indexForDeletion = DB.workouts.findIndex(
      workout => workout.id === workoutId
    )
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`
      }
    }
    DB.workouts.splice(indexForDeletion, 1)
    saveToDatabase(DB)
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  updateOneWorkout,
  deleteOneWorkout
}

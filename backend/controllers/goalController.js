const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

//  @desc     Get Goals
//  @route    GET /api/goals
//  @access   Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })

  res.status(200).json(goals)
})

//  @desc     Get single Goal
//  @route    GET /api/goals/:id
//  @access   Private
const getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  res.status(200).json(goal)
})

//  @desc     Set Goal
//  @route    POST /api/goals
//  @access   Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a textfield')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })

  res.status(200).json(goal._id)
})

//  @desc     Update Goals
//  @route    PUT /api/goals/:id
//  @access   Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found!')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the the goald user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).json(updatedGoal)
})

//  @desc     Delete Goals
//  @route    DELETE /api/goals/:id
//  @access   Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    throw new Error('Goal not found!')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the the goald user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal
}
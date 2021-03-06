const express = require('express')
const router = express.Router()

const {
  setGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id', protect).get(protect, getGoal).delete(protect, deleteGoal).put(protect, updateGoal)


module.exports = router
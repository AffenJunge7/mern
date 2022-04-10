const express = require('express')
const router = express.Router()

// Controller Function
const {
  createChannel,
  getChannels,
  // getChannel,
  // updateChannel,
  // deleteChannel
} = require('../controllers/channelController')

const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getChannels).post(protect, createChannel)
// router.route('/:id', protect).get(protect, getChannel).delete(protect, deleteChannel).put(protect, updateChannel)


module.exports = router
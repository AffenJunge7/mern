const asyncHandler = require('express-async-handler')

const Channel = require('../models/channelModel')

//  @desc     Get Channels
//  @route    GET /api/channels
//  @access   Private
const getChannels = asyncHandler(async (req, res) => {
  const channels = await Channel.find({})

  res.status(200).json(channels)
})


//  @desc     Create Channel
//  @route    POST /api/goals
//  @access   Private
const createChannel = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Please provide a name for the Channel')
  }

  const channel = await Channel.create({
    name: req.body.name
  })

  res.status(200).json(channel._id)
})


module.exports = {
  getChannels,
  createChannel
}
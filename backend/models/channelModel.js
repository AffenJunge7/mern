const mongoose = require('mongoose')

const channelModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a Channel name']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Channel', channelModel)
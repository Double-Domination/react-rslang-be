const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Token = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: 'users'
    },
    tokenId: {
      type: String,
      required: true
    },
    expire: {
      type: Number,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    isConfirmed: { type: Boolean, default: false }
  },
  { collection: 'tokens' }
);

Token.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('tokens', Token);

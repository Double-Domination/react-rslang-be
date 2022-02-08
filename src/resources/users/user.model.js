const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { addMethods } = require('../../utils/toResponse');
const Schema = mongoose.Schema;
// const Model = mongoose.Model;

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8
    },
    isConfirmed: { type: Boolean, default: false },
    confirmationLink: { type: String }
  },
  { collection: 'users' }
);

UserSchema.pre('save', async function preSave(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.pre('findOneAndUpdate', async function preUpdate(next) {
  if (this._update.$set.password) {
    this._update.$set.password = await bcrypt.hash(
      this._update.$set.password,
      10
    );
  }

  next();
});

addMethods(UserSchema);

module.exports = mongoose.model('users', UserSchema);

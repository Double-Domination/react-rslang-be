module.exports = class UserDto {
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isConfirmed = model.isConfirmed;
  }
};

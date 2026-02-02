const UserId = require('./ValueObjects/UserId');
const UserEmail = require('./ValueObjects/UserEmail');

class User {
  constructor({ id, email, password, name }) {
    this.id = id instanceof UserId ? id : new UserId(id);
    this.email = email instanceof UserEmail ? email : new UserEmail(email);
    this.password = password; // hashed password
    this.name = name || this.email.value.split('@')[0];
    Object.freeze(this);
  }

  static create({ email, password, name }) {
    return new User({
      id: UserId.generate(),
      email: new UserEmail(email),
      password,
      name
    });
  }
}

module.exports = User;
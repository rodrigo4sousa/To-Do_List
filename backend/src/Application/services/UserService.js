const User = require('../../Domain/User');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async ensureUserExists(firebaseUser) {
    const userId = firebaseUser.uid;

    let user = await this.userRepository.findById(userId);
    if (!user) {
      user = new User({
        id: userId,
        email: firebaseUser.email
      });
      await this.userRepository.save(user);
    }

    return user;
  }
}

module.exports = UserService;

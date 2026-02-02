const bcrypt = require('bcryptjs');
const User = require('../../Domain/User/User');
const UserEmail = require('../../Domain/User/ValueObjects/UserEmail');
const UserPassword = require('../../Domain/User/ValueObjects/UserPassword');
const UserDataMapper = require('../../Infrastructure/Database/Mappers/UserDataMapper');
const { generateToken } = require('../../Infrastructure/Auth/jwt');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(email, password, name) {
    const userEmail = new UserEmail(email);
    const userPassword = new UserPassword(password);

    const existingUser = await this.userRepository.findByEmail(userEmail.value);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userPassword.value, 10);

    const user = User.create({
      email: userEmail.value,
      password: hashedPassword,
      name
    });

    await this.userRepository.save(user);

    const token = generateToken(user.id.value, user.email.value);

    return {
      token,
      user: UserDataMapper.toResponse(user)
    };
  }

  
  async login(email, password) {
    const userEmail = new UserEmail(email);

    const user = await this.userRepository.findByEmail(userEmail.value);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id.value, user.email.value);

    return {
      token,
      user: UserDataMapper.toResponse(user)
    };
  }

  async getUserById(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return UserDataMapper.toResponse(user);
  }
}

module.exports = UserService;

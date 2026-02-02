class AuthController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const result = await this.userService.register(email, password, name);
      res.status(201).json(result);
    } catch (error) {
      console.error('Register error:', error.message);
      if (error.message === 'User already exists') {
        return res.status(409).json({ error: error.message });
      }
      if (error.message.includes('required') || error.message.includes('must be') || error.message.includes('Invalid')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);
      res.json(result);
    } catch (error) {
      console.error('Login error:', error.message);
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ error: error.message });
      }
      if (error.message.includes('required') || error.message.includes('Invalid email')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async me(req, res) {
    try {
      const user = await this.userService.getUserById(req.user.uid);
      res.json(user);
    } catch (error) {
      console.error('Get user error:', error.message);
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = AuthController;


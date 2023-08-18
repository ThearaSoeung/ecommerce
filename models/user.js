const { User } = require('../Schema/user'); // Update the path accordingly

class UserService {
  static async insert(name, email) {
    try {
      const user = await User.create({ name, email });
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  static async getByPk(pk) {
    try {
      const user = await User.findById(pk);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAll() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateById(id, name, email) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteById(id) {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserService;

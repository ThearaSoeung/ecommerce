const { User } = require('../Schema/user'); // Update the path accordingly
const bcrypt = require('bcryptjs');

class UserService {
  static async insert(email, decryptedPassword) {
    try {
      const password = await bcrypt.hash(decryptedPassword, 12);
      const user = await User.create({ email, password });
      return user.save();
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

  static async getByEmailAndPassword(email, password){
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return 1;
      }
      bcrypt.compare(password, user.password).
      then((isMatch) => {
        if(isMatch){
          return user;
        }else{
          return 2;
        }
      })
      .catch((err) => {
        console.error(err);
      });
    } 
    catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;

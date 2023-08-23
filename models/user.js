const { User } = require('../Schema/user'); // Update the path accordingly
const bcrypt = require('bcryptjs');
const AuthenticationError = require('../middleware/authError');


class UserService {
  static async insert(email, decryptedPassword) {
    try {
      if (await User.findOne({ email }) == null){
        const password = await bcrypt.hash(decryptedPassword, 12);
        const user = await User.create({ email, password });
        return user.save(); 
      }else{
        throw new AuthenticationError();  
      }
    } catch (error) {
      console.error(error);
      throw Error;  
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

  static async getByEmailAndPassword(email, password)  {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        throw new AuthenticationError();
      }
    } catch (error) { 
      console.error(error);
      throw error;  
    }
  }
  
  static async generateToken(userId, token){
    try {
      const tokenValidation = Date.now() + 60 * 60 * 1000; // Token validity for 1 hour
    
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId }, // Replace `_id` with the actual field that uniquely identifies the user
        { $set: { resetPassToken: token, resetPassTokenUntil: tokenValidation } },
        { new: true } // This ensures that the updated user document is returned
      );
    
      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  }

  static async updatePasswordByToken(token, pass) {
    try {
        const password = await bcrypt.hash(pass, 12);
        const updatedUser = await User.findOneAndUpdate(
            { resetPassToken: token },
            {
                $unset: {
                    resetPassToken: 1,
                    resetPassTokenUntil: 1
                },
                $set: {
                    password: password
                }
            },
            { new: true }
        );

        return updatedUser;
    } catch (error) {
        console.error(error);
    }
}

}

module.exports = UserService;

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { emailRegexp } from '../utils/regexps';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is required',
    },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      validate: {
        validator: function (v) {
          return v === '' || emailRegexp.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: 'Password is required',
      select: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.verifyPassword = async function (password) {
  const user = await mongoose
    .model('User')
    .findOne({ email: this.email })
    .select('password')
    .exec();
  return bcrypt.compareSync(password, user.password);
};

UserSchema.methods.toPayload = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
  };
};

export default mongoose.model('User', UserSchema);

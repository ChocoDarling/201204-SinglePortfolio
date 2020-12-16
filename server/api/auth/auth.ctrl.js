const Joi = require('joi');
const User = require('../../models/user');
// 01012341234;
const register = async (ctx) => {
  const schema = Joi.object().keys({
    id: Joi.string().alphanum().min(3).max(20).required(),
    username: Joi.string().alphanum().min(2).max(20).required(),
    phone: Joi.string().min(10).max(11).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { id, username, password, phone, email } = ctx.request.body;
  try {
    const exists = await User.findByUserId(id);
    if (exists) {
      ctx.body = '이미 존재하는 아이디입니다.';
      ctx.status = 409;
      return;
    }
    const user = new User({ id, username, phone, email });

    await user.setPassword(password);
    await user.save();
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('movietrailer_access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (error) {
    ctx.throw(500, e);
  }
};
const login = async (ctx) => {
  const { id, password } = ctx.request.body;
  if (!id || !password) {
    ctx.status = 401;
    return;
  }
  try {
    const user = await User.findByUserId(id);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('movietrailer_access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (error) {
    ctx.throw(500, error);
  }
};
const check = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};
const logout = async (ctx) => {
  ctx.cookies.set('movietrailer_access_token');
  ctx.status = 204;
};

module.exports = { register, login, check, logout };

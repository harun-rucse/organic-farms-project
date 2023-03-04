const bcrypt = require('bcryptjs');
const { User } = require('../../models/user-model');

describe('user.correctPassword', () => {
  let password;

  beforeEach(() => {
    password = 'password';
  });

  it('returns true for correct password', async () => {
    const hash = await bcrypt.hash(password, 12);

    const user = new User({
      name: 'test',
      phone: '01234567890',
      address: 'test address',
      password: hash,
    });

    const isMatch = await user.correctPassword(password, user.password);
    expect(isMatch).toBe(true);
  });

  it('returns false for incorrect password', async () => {
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
      name: 'test',
      phone: '01234567890',
      address: 'test address',
      password: hash,
    });

    password = 'incorrect';
    const isMatch = await user.correctPassword(password, user.password);
    expect(isMatch).toBe(false);
  });
});

describe('user.passwordChangeAfter', () => {
  it('returns false for password not changed', async () => {
    const user = new User({
      name: 'test',
      phone: '01234567890',
      address: 'test address',
      password: 'password',
    });

    const changeAfter = user.passwordChangeAfter(new Date());
    expect(changeAfter).toBe(false);
  });

  it('returns false for password changed before token issued', async () => {
    const user = new User({
      name: 'test',
      phone: '01234567890',
      address: 'test address',
      password: 'password',
      passwordChangeAt: new Date(),
    });

    const changeAfter = user.passwordChangeAfter(Math.floor(Date.now() / 1000) + 1000);
    expect(changeAfter).toBe(false);
  });

  it('returns true for password changed', async () => {
    const user = new User({
      name: 'test',
      phone: '01234567890',
      address: 'test address',
      password: 'password',
      passwordChangeAt: new Date(),
    });

    const changeAfter = user.passwordChangeAfter(Math.floor(Date.now() / 1000) - 1000);
    expect(changeAfter).toBe(true);
  });
});

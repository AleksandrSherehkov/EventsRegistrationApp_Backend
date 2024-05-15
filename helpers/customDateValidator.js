const { dateRegex } = require('../constants/constants');

const customDateValidator = (value, helpers) => {
  if (!dateRegex.test(value)) {
    return helpers ? helpers.error('any.invalid') : false;
  }

  const [day, month, year] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getDate() !== day ||
    date.getMonth() + 1 !== month ||
    date.getFullYear() !== year
  ) {
    return helpers ? helpers.error('any.invalid') : false;
  }

  const now = new Date();
  const age =
    now.getFullYear() -
    year -
    (now.getMonth() < month - 1 ||
    (now.getMonth() === month - 1 && now.getDate() < day)
      ? 1
      : 0);

  if (age < 18 || age > 100) {
    return helpers ? helpers.error('any.invalid') : false;
  }

  return value;
};

module.exports = customDateValidator;

import LIVR from 'livr';

LIVR.Validator.defaultAutoTrim(true);

const validator = new LIVR.Validator({
  name: ['required', 'not_empty'],
  email: ['required', 'not_empty', 'email']
});

const messages = {
  WRONG_EMAIL: 'Email adress is invalid!',
  REQUIRED: 'This field is required!'
};

export default function validate({ name, email }) {
  if (!validator.validate({ name, email })) {
    const error = validator.getErrors();

    if (error.email === 'WRONG_EMAIL') ;

    for (const key in error) {
      if (error.hasOwnProperty(key)) {
        error[key] = messages[error[key]];
      }
    }

    return error;
  }
}

export const Validation = (forminput) => {
  let errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@#$%^&+=*.!-]{8,}$/;
  //password checks for at least 1 digit, a small letter and  a capital, then it should include
  // alphanumeric characters and the following symbols: @#$%^&+=*.!- and should be atk4 least 8 character length in total

  if (forminput?.name) {
    if (forminput.name === "") {
      errors.name = "Names Should Not Be Empty";
    } else if (forminput.name.length < 3 || forminput.name.length > 100) {
      errors.name = "Name must be B/W 3-100";
    } else {
      errors.name = "";
    }
  }

  if (forminput.email === "") {
    errors.email = "Email Should Not Be Empty";
  } else if (!email_pattern.test(forminput.email)) {
    errors.email = "Invalid Email";
  } else {
    errors.email = "";
  }

  if (forminput.password === "") {
    errors.password = "Password Should Not Be Empty";
  } else if (!password_pattern.test(forminput.password)) {
    errors.password =
      "password should contain at  1 number, 1 Lowercase, 1 Uppercase and at least 8 characters";
  } else {
    errors.password = "";
  }
  return errors;
};

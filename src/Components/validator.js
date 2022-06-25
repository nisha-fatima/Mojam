const email =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const isValidFirstPageRegistrationInfo = (data) => {
  const isValidFirstName = data.firstName !== "";
  const isValidLastName = data.lastName !== "";
  const isValidPhoneNumber = data.phoneNumber !== "";

  return {
    isValidFirstName,
    isValidLastName,
    isValidPhoneNumber,
    isAllValid: isValidFirstName && isValidLastName && isValidPhoneNumber,
  };
};

export const isValidLastPageRegistrationInfo = (data) => {
  const isValidEmail = email.test(data.email);
  const isValidPassword = data.password !== "";
  const isValidConfirmPassword = data.confirmPassword !== "";
  const isPasswordsMatched = data.password == data.confirmPassword;

  return {
    isValidEmail,
    isValidPassword,
    isValidConfirmPassword,
    isPasswordsMatched,
    isAllValid:
      isValidEmail &&
      isValidPassword &&
      isValidConfirmPassword &&
      isPasswordsMatched,
  };
};

export const isValidloginInfo = (data) => {
  const isValidEmail = email.test(data.email);
  const isValidPassword = data.password !== "";

  return {
    isValidEmail,
    isValidPassword,
    isAllValid: isValidEmail && isValidPassword,
  };
};

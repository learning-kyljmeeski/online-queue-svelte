export function checkUsernameForCorrectness(username) {
  if (username.length === 0) {
    return {
      isUsernameCorrect: false,
      usernameErrorText: "username cannot be empty",
    };
  }
  if (/\s/.test(username)) {
    return {
      isUsernameCorrect: false,
      usernameErrorText: "no white spaces allowed",
    };
  }

  return {
    isUsernameCorrect: true,
  };
}

export function checkPasswordForCorrectness(password) {
  if (password.length === 0) {
    return {
      isPasswordCorrect: false,
      passwordErrorText: "password cannot be empty",
    };
  }
  if (/\s/.test(password)) {
    return {
      isPasswordCorrect: false,
      passwordErrorText: "no white spaces allowed",
    };
  }

  return {
    isPasswordCorrect: true,
  };
}

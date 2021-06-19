export const passwordMatch = (formGroup) => {
  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirmPassword');

  if(password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMatch: true });
  } else {
    confirmPassword.setErrors(null);
  }
}

export const mustContainSymbol = (control) => {
  if(control.hasError('required')) return null;
  if(control.hasError('minlength') && control.errors.minlength.actualLength < 5) {
    return null;
  };

  if(control.value.indexOf('@') > -1) {
    return null;
  } else {
    return { symbol: true };
  }
}

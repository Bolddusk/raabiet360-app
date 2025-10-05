import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '@providers';
import { validateEmail } from '@shared/utils/validations';
import { LoginForm, LoginFormErrors } from '@types';

export const useLogin = () => {
  const { login } = useAuth();
  const { navigate, goBack } = useNavigation<any>();

  const [formValues, setFormValues] = useState<LoginForm>({
    // email: 'jeandupont@raabiet360.com',
    email: 'julien.moreau@raabiet360.com',
    password: '12345678',
  });

  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key: keyof LoginForm, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [key]: value,
    }));

    setFormErrors(prev => ({
      ...prev,
      [key]: '',
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSignIn = async () => {
    const errors: LoginFormErrors = {};
    if (!formValues.email) errors.email = 'Email is required';
    if (!formValues.password) errors.password = 'Password is required';

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formValues.email, formValues.password);
    } catch (err: any) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotContinue = () => {
    const isEmailValid = validateEmail(formValues.email.trim());
    if (!isEmailValid) {
      setFormErrors({ email: 'Please enter a valid e-mail' });
      return;
    }
    console.log('Email', formValues.email.trim());
  };

  const goToForgotPassword = () => {
    // navigate(SCREEN.FORGOT_PASSWORD);
  };

  const goToLogin = () => goBack();

  return {
    formValues,
    formErrors,
    showPassword,
    isSubmitting,
    handleChange,
    handleSignIn,
    togglePasswordVisibility,
    goToForgotPassword,
    goToLogin,
    handleForgotContinue,
  };
};

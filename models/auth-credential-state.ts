export type AuthCredentialState = {
  email: boolean;
  password: boolean;
  confirmEmail: boolean;
  confirmPassword: boolean;
};

export type EnteredCredentials = {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

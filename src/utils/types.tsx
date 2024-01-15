export type AuthStackParamList = {
  Auth: undefined;
  SignIn: { onAuthChange: (status: boolean) => void };
  ForgotPassword: undefined;
  SignUp: { onAuthChange: (status: boolean) => void };
};

export type BottomTabParamList = {
  Home: undefined;
  Scan: undefined;
  Plants: undefined;
};

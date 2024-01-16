import { StackNavigationProp } from "@react-navigation/stack";

export type BottomTabParamList = {
  Home: undefined;
  Scan: undefined;
  Plants: undefined;
};

export type AuthStackParamList = {
  Auth: undefined;
  SignIn: { onAuthChange: (status: boolean) => void };
  ForgotPassword: undefined;
  SignUp: { onAuthChange: (status: boolean) => void };
};

// AuthScreen
type AuthScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

export type AuthScreenProps = {
  navigation: AuthScreenNavigationProp;
};

// SignInScreen
type SignInScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "SignIn"
>;

export type SignInScreenProps = {
  navigation: SignInScreenNavigationProp;
  onAuthChange: (status: boolean) => void;
};

// ForgotPasswordScreen
type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "ForgotPassword"
>;

export type ForgotPasswordScreenProps = {
  navigation: ForgotPasswordScreenNavigationProp;
};

// SignUpScreen
type SignUpScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "SignUp"
>;

export type SignUpScreenProps = {
  navigation: SignUpScreenNavigationProp;
  onAuthChange: (status: boolean) => void;
};

// HomeScreen
export type HomeStackParamList = {
  Home: undefined;
  Settings: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

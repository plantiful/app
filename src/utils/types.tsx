import { StackNavigationProp } from "@react-navigation/stack";
import { PlantInfo } from "../firebase";

export type BottomTabParamList = {
  Homea: undefined;
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
type AuthScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Auth">;

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

// HomeStackParamList
export type HomeStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: { onAuthChange: (status: boolean) => void };
  ChangeName: undefined;
  ChangeEmail: undefined;
  ChangePassword: undefined;
  NotificationSettings: undefined;
  LanguageSettings: undefined;
  ThemeSettings: undefined;
  PlantsScreen: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, "Home">;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "Profile"
>;

export type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

type SettingsScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "Settings"
>;

export type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProp;
  onAuthChange: (status: boolean) => void;
};

type ChangeNameScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "ChangeName"
>;

export type ChangeNameScreenProps = {
  navigation: ChangeNameScreenNavigationProp;
};

type ChangeEmailScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "ChangeEmail"
>;

export type ChangeEmailScreenProps = {
  navigation: ChangeEmailScreenNavigationProp;
};

type ChangePasswordScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "ChangePassword"
>;

export type ChangePasswordScreenProps = {
  navigation: ChangePasswordScreenNavigationProp;
  onAuthChange: (status: boolean) => void;
};

type NotificationSettingsScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "NotificationSettings"
>;

export type NotificationSettingsScreenProps = {
  navigation: NotificationSettingsScreenNavigationProp;
};

type LanguageSettingsScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "LanguageSettings"
>;

export type LanguageSettingsScreenProps = {
  navigation: LanguageSettingsScreenNavigationProp;
};

// PlantsStackParamList
export type PlantsScreenParamList = {
  ScanScreen: undefined;
  PlantScanScreen: {
    plant: PlantInfo;
    onDecision: (decision: boolean) => void;
  };
  PlantsScreen: undefined;
  PlantDetailScreen: { plant: PlantInfo };
  AddPlantScreen: {
    roomId: string;
  };
};

type ScanScreenNavigationProp = StackNavigationProp<
  PlantsScreenParamList,
  "ScanScreen"
>;

export type ScanScreenProps = {
  navigation: ScanScreenNavigationProp;
};

type PlantsScrenNavigationProp = StackNavigationProp<
  PlantsScreenParamList,
  "PlantsScreen"
>;

export type PlantsScreenProps = {
  navigation: PlantsScrenNavigationProp;
};

type AddPlantScreenNavigationProp = StackNavigationProp<
  PlantsScreenParamList,
  "AddPlantScreen"
>;

export type AddPlantScreenProps = {
  navigation: AddPlantScreenNavigationProp;
  roomId: string;
};

// ScanStackParamList
export type ScanScreenParamList = {
  ScanScreen: undefined;
  PlantScanScreen: {
    plant: PlantInfo;
    onDecision: (decision: boolean) => void;
  };
};

type PlantScanScreenNavigationProp = StackNavigationProp<
  ScanScreenParamList,
  "PlantScanScreen"
>;

export type PlantScanScreenProps = {
  navigation: PlantScanScreenNavigationProp;
  plant: PlantInfo;
  onDecision: (decision: boolean) => void;
};

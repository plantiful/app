# Plantiful

[Expo Documentation](https://docs.expo.dev/)

## Setup

```sh
./setup-<platform>.sh
```

Or just install [yarn](https://classic.yarnpkg.com/lang/en/docs/install) and [Node.js](https://nodejs.org), then run `yarn install` and start the app.

### Start

```sh
yarn start
```

### Install new package

```sh
yarn add <package-name>
``

## TODO

- [x] Finish CameraScreen - [tutorial](https://www.freecodecamp.org/news/how-to-create-a-camera-app-with-expo-and-react-native/), [code](https://github.com/hayanisaid/expo-camera-tutorial/blob/master/App.tsx)
- [x] Fix CameraScreen screenratio
- [x] Fix CameraScreen reloading
- [x] Add show password on both login and register screen
- [x] Only show password on register screen on focus
- [x] Replace all SVG icons with [@expo/vector-icons](https://icons.expo.fyi)
- [x] Move login and register button up when keyboard is displayed (better UX)
- [x] Move search bar on search screen down
- [x] Add forgot password screen
- [x] Fix opening camera from search screen
- [x] Make the flash icon change based on the toggle
- [x] Add loading indicator for plant recognition - first try make it async
- [x] Add all translations (now it is only in english) - easy s chatgpt
- [x] Add recognized plants from ScanScreen to PlantScreen (there is one Example Plant always added for now)
- [ ] Finish PlantScreen
- [ ] FInish PlantDetailScreen
- [x] Create template PlantDetailScreen design with all the info
- [x] Link PlantScreen and PlantDetailScreen together
- [ ] Add dark mode support - [docs](https://docs.expo.dev/develop/user-interface/color-themes/)
- [ ] Fix splash screen image size (it shouldnt overflow the screen) - in app.json
- [ ] Fix auth screen svg icons (they are not properly exported) - figma
- [ ] Add custom SVG icons on login screen for socials - assets can be found in an old commit (~9 months ago)
- [ ] Add terms and privacy policy links on sign up screen - [docs](https://docs.expo.dev/versions/latest/sdk/webview/) - we dont have them yet
- [ ] ** Add plant recognition results into variables, more info directly in code **
  - `common (vernacular) name`
  - `scientific name`
  - `plant description`
  - `watering recommendations`
  - `representative photos`
  - ... (more info [here](https://documenter.getpostman.com/view/24599534/2s93z5A4v2) or [in this response body](https://www.postman.com/winter-shadow-932363/workspace/kindwise/example/24599534-6b255bc8-d037-49a3-852e-82ca9cf00041))
  - [ ] Add language parameter to plant recognition request (`i18n.language`)
- [x] Fix input reference on sign in and sign up screen
- [x] Add auth state persistence - [docs](https://docs.expo.dev/versions/latest/sdk/securestore/) or react-native-async-storage - [docs](https://react-native-async-storage.github.io/async-storage/docs/install)
- [x] Add translations (use `en` as a template)
- [x] Fix sendPasswordResetEmail on ForgotPasswordScreen?
- [ ] Try to optimize take picture delay on ScanScreen
- [ ] ScanScreen line 220, Plant identified alert message should be in all languages (currently in english only)
- [ ] Add settings
  - Account
    - [x] change name
    - [x] change email
    - [x] change password
    - [x] delete account
  - App
    - [x] change language
    - [ ] change theme
    - [ ] change units
  - [x] logout
- [ ] Add edit profile functionality - change name and profile picture
- [ ] Add settings for notifications
- [ ] Add calendar widget on home screen? - [dribbble](https://dribbble.com/shots/11360445-Plant-care-app/attachments/2972899?mode=media)

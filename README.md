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
```

## TODO

- [x] Finish CameraScreen - [tutorial](https://www.freecodecamp.org/news/how-to-create-a-camera-app-with-expo-and-react-native/), [code](https://github.com/hayanisaid/expo-camera-tutorial/blob/master/App.tsx)
- [ ] Fix CameraScreen screenratio
- [x] Add show password on both login and register screen
- [x] Only show password on register screen on focus
- [x] Replace all SVG icons with [@expo/vector-icons](https://icons.expo.fyi)
- [x] Move login and register button up when keyboard is displayed (better UX)
- [x] Move search bar on search screen down
- [x] Add forgot password screen
- [x] Fix opening camera from search screen
- [x] Make the flash icon change based on the toggle
- [ ] Add loading indicator for plant recognition - first try make it async
- [x] Add all translations (now it is only in english) - easy s chatgpt
- [ ] Add dark mode support - [docs](https://docs.expo.dev/develop/user-interface/color-themes/)
- [ ] Fix splash screen image size (it shouldnt overflow the screen) - in app.json
- [ ] Fix auth screen svg icons (they are not properly exported) - figma
- [ ] Add custom SVG icons on login screen for socials
- [ ] Add terms and privacy policy links on sign up screen - [docs](https://docs.expo.dev/versions/latest/sdk/webview/) - we dont have them yet
- [ ] Add plant recognition results into variables
  - `common (vernacular) name`
  - `scientific name`
  - `plant description`
  - `watering recommendations`
  - `representative photos`
  - ... (more info [here](https://documenter.getpostman.com/view/24599534/2s93z5A4v2) or [in this response body](https://www.postman.com/winter-shadow-932363/workspace/kindwise/example/24599534-6b255bc8-d037-49a3-852e-82ca9cf00041)) - Also add language parameter to the request
- [x] Fix input reference on sign in and sign up screen
- [ ] Add auth state persistence - [docs](https://docs.expo.dev/versions/latest/sdk/securestore/) or react-native-async-storage - [docs](https://react-native-async-storage.github.io/async-storage/docs/install)
- [ ] Add translations (use en as a template)
- [ ] Fix sendPasswordResetEmail on ForgotPasswordScreen?

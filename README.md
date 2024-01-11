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
- [ ] Move login and register button up when keyboard is displayed (better UX)
- [x] Move search bar on search screen down
- [ ] Implement forgot password
- [x] Fix opening camera from search screen
- [x] Make the flash icon change based on the toggle
- [ ] Add progress bar for plant recognition
- [ ] Add all translations
- [ ] Add dark mode support - [docs](https://docs.expo.dev/develop/user-interface/color-themes/)
- [ ] Fix splash screen image size (it shouldnt overflow the screen)
- [ ] Fix auth screen svg icons (they are not properly exported)
- [ ] Fix login screen social icons (they are just off)

Na auth screen mi prijde, ze neni uplne jasne, ze v login screen se da prihlasit pomoci googlu, atd.

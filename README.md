# Plantiful

## Links
- Bunch of react native examples, really useful - [link](https://reactnativeexample.com/)
- Google drive folder - [link](https://drive.google.com/drive/folders/1Sp9AiDdHx-pm55fWUR_0IheVuXPDPiJ_?usp=drive_link)
- Figma project - [link](https://www.figma.com/files/team/1223656016002077883)
- First promo video for JA EXPO - [youtube](https://youtu.be/nLVRXiDevZY)
- Second promo video for JA national finals - [youtube](https://youtu.be/zZ-SUUvdznc)

## Setup

```sh
./setup-<platform>.sh
```

Or just install [yarn](https://classic.yarnpkg.com/lang/en/docs/install) and [Node.js](https://nodejs.org)

In both cases run before start

```sh
yarn install
```

### Start

```sh
yarn start
```

### Install new package

```sh
yarn add <package-name>
```

## Database structure

```
{
  "users": {
    "userId": {
      "rooms": {
        "roomId": {
          "roomName": "string",
          "plants": {
            "plantId": {
              "photo": "string",
              "nickname": "string",
              "commonName": "string",
			        "scientificName: "string",
              "taxonomy": {
                "class": "string",
                "genus": "string",
                "order": "string",
                "family": "string",
                "phylum": "string",
                "kingdom": "string",
              },
              "rank": "string",
              "description": "string",
              "watering" : "number",
              "temperature": "string",
              "sunlight": "string",
              "lastWatered": "number",
            }
          }
        }
      }
    }
  }
}
```

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
- [ ] Fix splash screen image size (it shouldnt overflow the screen) - in app.json
- [ ] Fix auth screen svg icons (they are not properly exported) - figma
- [x] Add custom SVG icons on login screen for socials - assets can be found in an old commit (~9 months ago)
- [ ] Add terms and privacy policy links on sign up screen - [docs](https://docs.expo.dev/versions/latest/sdk/webview/) - we dont have them yet
- [x] Add plant recognition results into variables, more info directly in code
  - `common (vernacular) name`
  - `scientific name`
  - `plant description`
  - `watering recommendations`
  - `representative photos`
  - ... (more info [here](https://documenter.getpostman.com/view/24599534/2s93z5A4v2) or [in this response body](https://www.postman.com/winter-shadow-932363/workspace/kindwise/example/24599534-6b255bc8-d037-49a3-852e-82ca9cf00041))
  - [x] Add language parameter to plant recognition request (`i18n.language`)
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
    - [ ] notifications - use [switch][https://reactnative.dev/docs/switch] component
      - Watering
      - ... (more to come)
    - [x] change language
    - [ ] change theme - [docs](https://docs.expo.dev/develop/user-interface/color-themes/)
    - [ ] change units
  - [x] logout
- [ ] Add edit profile functionality - change name and profile picture
- [ ] Add calendar widget on home screen? - [dribbble](https://dribbble.com/shots/11360445-Plant-care-app/attachments/2972899?mode=media), [react-native-calendars](https://github.com/wix/react-native-calendars)
  - [x] Add progress indicator on home screen
- [ ] Change checkbox rendering on the home screen in search settings to be able to use translations
- [ ] Add watering widget on home screen
- [ ] Add plant disease recognition - health assessment
- [ ] Update database structure in readme

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl:"http://localhost:4713/sl/api/",
  loginUrl:"http://localhost:4713/sl/login",
  urlsToSkip: [
    "user/verify",
    "user/register",
    "user/send-password-reset",
    "user/reset-password-request",
    "post/findAll",
    "spotify/getReddirectUrl",
    "user/confirm-email"
  ],
  production: false,
  redTheme: [
    { attribute: "--neon-clr", value: "#1DB954"},
    { attribute: "--neon-clr2", value: "#0e5c2a"},
    { attribute: "--bckg-menu", value: "#191414"},
    { attribute: "--LogRegColor", value: "#848484"},
    { attribute: "--LogRegColorTwo", value: "rgb(114,114,114)"},
    { attribute: "--main-color-one", value: "#191414"},
    { attribute: "--main-color-two", value: "#1DB954"},
    { attribute: "--button-color-one", value: "rgb(7,149,1)"},
    { attribute: "--button-color-two", value: "#030303"},
    { attribute: "--content-bckg-color", value: "#191414"},
    { attribute: "--content-bckg-color-Back", value: "#4c4c4c"},
    { attribute: "--font-color", value: "white"},
  ],
  purpleTheme: [
    { attribute: "--neon-clr", value: "hsl(315, 100%, 50%)"},
    { attribute: "--neon-clr2", value: "#32003e"},
    { attribute: "--bckg-menu", value: "#35004e"},
    { attribute: "--LogRegColor", value: "#13d0c1"},
    { attribute: "--LogRegColorTwo", value: "#520b84"},
    { attribute: "--main-color-one", value: "#5d0980"},
    { attribute: "--main-color-two", value: "rgb(54, 220, 227)"},
    { attribute: "--button-color-one", value: "rgba(0, 241, 241, 0.79)"},
    { attribute: "--button-color-two", value: "#450068"},
    { attribute: "--content-bckg-color", value: "#f1fffc"},
    { attribute: "--content-bckg-color-Back", value: "#ccfff9"},
    { attribute: "--font-color", value: "black"},
  ],
  greenTheme: [
    { attribute: "--neon-clr", value: "hsl(80, 100%, 50%)"},
    { attribute: "--neon-clr2", value: "#005201"},
    { attribute: "--bckg-menu", value: "#18c43b"},
    { attribute: "--LogRegColor", value: "#18c43b"},
    { attribute: "--LogRegColorTwo", value: "#0b8421"},
    { attribute: "--main-color-one", value: "#000000"},
    { attribute: "--main-color-two", value: "#7BFF00FF"},
    { attribute: "--button-color-one", value: "#191414"},
    { attribute: "--button-color-two", value: "#1DB954"},
    { attribute: "--content-bckg-color", value: "#c7dbc0"},
    { attribute: "--content-bckg-color-Back", value: "#e4f3df"},
    { attribute: "--font-color", value: "black"},
  ],
  url: "http://localhost:4200/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

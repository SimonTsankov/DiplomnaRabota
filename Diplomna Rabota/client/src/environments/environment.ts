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
    "spotify/getReddirectUrl"
  ],
  production: false,
  redTheme: [
    { attribute: "--neon-clr", value: "hsl(50, 100%, 50%)"},
    { attribute: "--neon-clr2", value: "#a15f00"},
    { attribute: "--bckg-menu", value: "#630000"},
    { attribute: "--LogRegColor", value: "#b4a702"},
    { attribute: "--LogRegColorTwo", value: "rgb(175, 1, 1)"},
    { attribute: "--main-color-one", value: "#000000"},
    { attribute: "--main-color-two", value: "rgb(255, 0, 0)"},
    { attribute: "--button-color-one", value: "#191414"},
    { attribute: "--button-color-two", value: "#ff9900"},
    { attribute: "--content-bckg-color", value: "#e5e5e5"},
    { attribute: "--content-bckg-color-Back", value: "#ffffff"},
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

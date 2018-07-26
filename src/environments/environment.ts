// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCzCeAL99M7BRKyIbv0-NX0qg-FgeIH0XY",
    authDomain: "icsd-app.firebaseapp.com",
    databaseURL: "https://icsd-app.firebaseio.com",
    projectId: "icsd-app",
    storageBucket: "icsd-app.appspot.com",
    messagingSenderId: "843528895145"
  }
};

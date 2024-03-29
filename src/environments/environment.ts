// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'inen-app',
    appId: '1:890512646608:web:27a50684ae5175571319d5',
    storageBucket: 'inen-app.appspot.com',
    apiKey: 'AIzaSyAKfG_Qkz2KUgCu168PgR6WCGqzvjUSyLo',
    authDomain: 'inen-app.firebaseapp.com',
    messagingSenderId: '890512646608',
  },
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAKfG_Qkz2KUgCu168PgR6WCGqzvjUSyLo",
    authDomain: "inen-app.firebaseapp.com",
    projectId: "inen-app",
    storageBucket: "inen-app.appspot.com",
    messagingSenderId: "890512646608",
    appId: "1:890512646608:web:27a50684ae5175571319d5"
  },
  api: 'http://34.125.31.26:5000/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

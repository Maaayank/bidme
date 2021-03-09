// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: 'http:localhost:3000',
  products_api: "https://product-info-api.herokuapp.com/api",
  firebase : {
    apiKey: "AIzaSyD5BKlNvrnpzDyZXdlsxlVl8NggRVNhEL4",
    authDomain: "bidme-d3362.firebaseapp.com",
    projectId: "bidme-d3362",
    storageBucket: "bidme-d3362.appspot.com",
    messagingSenderId: "481913119137",
    appId: "1:481913119137:web:04354f73346b5595f66be0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

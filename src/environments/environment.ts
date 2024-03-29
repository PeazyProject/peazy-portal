// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loggingLevel: 0,
  authUrl: 'https://peazy-auth.onrender.com/auth',
  // authUrl: 'http://localhost:8080/auth',
  supplierApiUrl: 'https://peazy-supplier.onrender.com/supplier',
    // supplierApiUrl: 'http://localhost:8082/supplier',
  customerApiUrl: 'https://peazy-csutomer.onrender.com/csutomer',
  // customerApiUrl: 'http://localhost:8083/customer',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

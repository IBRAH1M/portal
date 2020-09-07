// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_URL = 'http://localhost:4200';

export const environment = {
  production: false,
  server_url: BASE_URL,
  base_api_url: BASE_URL + '/api',
  app_name: 'Portal',
  app_authorization_type: 'Basic',
  app_authorization_token: 'cG9zdG1hbjpwb3N0bWFu',
  storage_prefix: 'X_ABC_',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

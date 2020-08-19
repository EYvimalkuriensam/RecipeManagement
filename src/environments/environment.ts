// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  FIREBASE_API_KEY: "AIzaSyAaoDOdKw71sV9hcacTPTxbcOO1Tpi0vO4",
  FIREBASE_SIGNIN_URI:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
  FIREBASE_SIGNUP_URI:
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
  RECIPES_URI:
    "https://ng-course-recipe-book-cab0d.firebaseio.com/recipes.json",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

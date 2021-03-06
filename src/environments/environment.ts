// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const serviceUrl = "http://localhost:8080/"

export const environment = {
  production: false,


  teacher: {
    allTeacher: serviceUrl + "api/teachers/",
    checkTeacherById: serviceUrl + "api/teachers?id="
  },
  classroom: {
    getClassRoom: serviceUrl + "api/classrooms/",
    searchClasstByName: serviceUrl + "api/classrooms?className=",
    
  },
  parent: {
    allParent: serviceUrl + "api/parents/",
    checkParentById: serviceUrl + "api/parents?id="
  },
  student: {
    allStudent: serviceUrl + "api/students/"
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

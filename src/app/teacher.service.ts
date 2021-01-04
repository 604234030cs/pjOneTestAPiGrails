import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  json;

  constructor(private http: HttpClient) { }


  getTacherAll() {
    let url = environment.teacher.allTeacher;
    console.log(url);

    return this.http.get(url)
  }

  getTacherCheckById(teacher) {
    console.log(teacher.id);

    let url = environment.teacher.checkTeacherById + teacher.id;
    console.log(url);

    return this.http.get(url)
  }

  addTacher(dataPost) {
    console.log("addTacherSever()");
    console.log("datapost:", dataPost);
    let url = environment.teacher.allTeacher;
    return this.http.post(url, dataPost);
  }

  upDateTacher(teacher) {
    console.log("upDateTacherSever()");
    console.log("dataput:", teacher);
    let url = environment.teacher.allTeacher+teacher.id;
    return this.http.put(url, teacher);
  }

  deleteTeacher(teacher) {
    console.log("deleteTeacherSever");
    console.log("dataReceived", teacher);
    console.log("dataReceivedTeacherId", teacher.id);
    let url = environment.teacher.allTeacher + teacher.id;
    return this.http.delete(url)

  }
}

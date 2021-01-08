import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentAll() {
    let url = environment.student.allStudent;
    console.log(url);

    return this.http.get(url)
  }

  getParentAll() {
    let url = environment.parent.allParent;
    console.log(url);

    return this.http.get(url).pipe(map((data: any) =>
    [{
      label: '-เลือกผู้ปกครอง-', value: null
    },
    ...data.map(it => {
      return {
        label: it.parentTitle+it.parentName+' '+it.parentSName, value: it.id
      }
    })]))
  }

  getClassRoomAll() {
    let url = environment.classroom.getClassRoom;
    console.log(url);

    return this.http.get(url).pipe(map((data: any) =>
    [{
      label: '-เลือกชั้นเรียน-', value: null
    },
    ...data.map(it => {
      return {
        label: it.className+' '+it.parentSName, value: it.id
      }
    })]))
  }


  getClassRoomMedium(){
    return this.http.get<any>('')
  }

}

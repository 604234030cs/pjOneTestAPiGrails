import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient) { }



  getAllClassRoom(){
    let url = environment.classroom.allClass;
    return this.http.get(url);
  }
  getAllTeacher(){
    let url = environment.teacher.allTeacher;
    return this.http.get(url).pipe(map((data: any) =>
    [{
      label: '-เลือกคุณครูประจำชั้น-', value: null
    },
    ...data.map(it => {
      return {
        label: it.teacherTitle+it.teacherName+' '+it.teacherSname, value: it.id
      }
    })]))
  }
}

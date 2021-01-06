import { Classroom } from './class-room-filter/classroom';

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

  addClassRoom(dataPost){
    console.log("addTacherSever()");
    console.log("datapost:", dataPost);
    let url = environment.classroom.allClass;
    return this.http.post(url, dataPost);
  }

  upDateTacher(classRoom) {
    console.log("upDateTacherSever()");
    console.log("dataput:", classRoom);
    let url = environment.classroom.allClass+classRoom.id;
    return this.http.put(url, classRoom);
  }

  deleteClassRoom(classRoom){
    console.log("deleteClassRoom()");
    console.log("dataReceive:",classRoom);
    let url = environment.classroom.allClass + classRoom.id
    return this.http.delete(url)
    

  }


  loadDataClassRoomFilterClassName(value:any){
    console.log("loadDataClassRoomFilterClassName()");
    let url = environment.classroom.searchClasstByName+value
    return this.http.get(url)

  }

  loadDataClassRoomFilterId(value:any){
    console.log("loadDataClassRoomFilterId()");
    let url = environment.classroom.allClass+value
    return this.http.get(url)

  }
  

}

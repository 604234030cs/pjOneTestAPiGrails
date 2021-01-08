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



  selectClassRoom(event) {
    console.log("getAllClassRoom()");
    console.log("getAllClassRoom()",event);
    console.log("dataEventFirst", event.first);
    let SetData = JSON.stringify({
      offset: event.first,
      max: event.rows,
      sortOrder:event.sortOrder,
      sortField:event.sortField
    })
    let params = JSON.parse(SetData);
    console.log(params);
    let url = environment.classroom.getClassRoom+'?'+'max='+params.max+'&'+'offset='+params.offset+'&'+'sortOrder='+params.sortOrder+'&'+'sortField='+params.sortField;
    return this.http.get(url);
  }
  getAllTeacher() {
    console.log("getAllTeacher()");

    let url = environment.teacher.allTeacher;
    return this.http.get(url).pipe(map((data: any) =>
      [{
        label: '-เลือกคุณครูประจำชั้น-', value: null
      },
      ...data.map(it => {
        return {
          label: it.teacherTitle + it.teacherName + ' ' + it.teacherSname, value: it.id
        }
      })]))
  }

  addClassRoom(dataPost) {
    console.log("addTacherSever()");
    console.log("datapost:", dataPost);
    let url = environment.classroom.getClassRoom;
    return this.http.post(url, dataPost);
  }

  upDateTacher(classRoom) {
    console.log("upDateTacherSever()");
    console.log("dataput:", classRoom);
    let url = environment.classroom.getClassRoom + classRoom.id;
    return this.http.put(url, classRoom);
  }

  deleteClassRoom(classRoom) {
    console.log("deleteClassRoom()");
    console.log("dataReceive:", classRoom);
    let url = environment.classroom.getClassRoom + classRoom.id
    return this.http.delete(url)


  }


  loadDataClassRoomFilterClassName(value: any) {
    console.log("loadDataClassRoomFilterClassName()");
    let url = environment.classroom.searchClasstByName + value
    return this.http.get(url)

  }

  loadDataClassRoomFilterId(value: any) {
    // let setData = JSON.stringify({
    //   offset:value,
    //   max:1
    // })
    // let dataPost = JSON.parse(setData);
    // console.log("dataPostFilterId:",dataPost);
    
    console.log("loadDataClassRoomFilterId()");
    let url = environment.classroom.getClassRoom + value
    return this.http.get(url)

  }


}

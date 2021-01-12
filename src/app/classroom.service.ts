import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient) { }



  selectClassRoom(event) {
    // โหลดข้อมูลชั้นเรียนตามเงื่อนไขที่ได้รับ
    let dataFilterId = event.filters.id ? event.filters.id.value : ''
    let dataFilterclassName = event.filters.className ? event.filters.className.value : ''
    let searchParams = new HttpParams();
    searchParams = searchParams.append('offset', event.first);
    searchParams = searchParams.append('max', event.rows);
    searchParams = searchParams.append('sortOrder', event.sortOrder);
    searchParams = searchParams.append('sortField', event.sortField);
    searchParams = searchParams.append('classId', dataFilterId);
    searchParams = searchParams.append('className', dataFilterclassName);
    let url = environment.classroom.getClassRoom;
    return this.http.get<{ [key: string]: any }>(url, {
      params: searchParams
    })
  }

  getAllTeacher() {
    // โหลดข้อมูลคุณครูเพื่อใช้ในการเทียบ #ไม่ได้ใช้ #เก็บไว้เผื่อกลับมาดูตัวอย่าง
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
    // เพิ่มข้อมูลชั้นเรียน
    let url = environment.classroom.getClassRoom;
    return this.http.post(url, dataPost);
  }

  updateClassRoom(classRoom) {
    // แก้ไขข้อมูลชั้นเรียน
    let url = environment.classroom.getClassRoom + classRoom.id;
    return this.http.put(url, classRoom);
  }

  deleteClassRoom(classRoom) {
    // ลบข้อมูลชั้นเรียน
    let url = environment.classroom.getClassRoom + classRoom.id
    return this.http.delete(url)
  }

  loadDataClassRoomFilterClassName(value: any) {
    // ใช้ในการดึงข้อมูลโดยดึงข้อมูลจากรายชื่อชั้นเรียน #ไม่ได้ใช้  #เก็บไว้เผื่อกลับมาดูตัวอย่าง
    let url = environment.classroom.searchClasstByName + value
    return this.http.get(url)
  }

  loadDataClassRoomFilterId(value: any) {
    // ใช้ในการดึงข้อมูลโดยดึงข้อมูลจากลำดับชั้นเรียน #ไม่ได้ใช้  #เก็บไว้เผื่อกลับมาดูตัวอย่าง
    let url = environment.classroom.getClassRoom + value
    return this.http.get(url)
  }

}

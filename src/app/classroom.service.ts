import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient) { }



  getAllClassRoom(){
    let url = environment.classroom.allClass;
    return this.http.get(url);
  }
}

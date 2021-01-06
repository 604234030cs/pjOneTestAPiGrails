import { Component, OnInit } from '@angular/core';
import { ClassroomService } from './../classroom.service';

@Component({
  selector: 'app-class-room-filter',
  templateUrl: './class-room-filter.component.html',
  styleUrls: ['./class-room-filter.component.css']
})
export class ClassRoomFilterComponent implements OnInit {


  classRoom: any=[];
  selectedclassRoom: any;

  constructor(private apiClassRoom: ClassroomService) { 

    // this.loadDataClassRoom();
  }

  ngOnInit(): void {

    this.apiClassRoom.getAllClassRoom().subscribe((data: any) => {
      this.classRoom = data;
      console.log("dataReceiveUrl:", this.classRoom);

      console.log();
      


    })
  }

//  -----------------------------------  Test Section  ----------------------------------------------------------
  // loadDataClassRoom(){
  //   this.apiClassRoom.loadDataClassRoomFilter().subscribe((data:any)=>{
  //     console.log(data);
  //     this.classRoom = data
      
  //   })
  // }

//  -----------------------------------  Search Section  ----------------------------------------------------------

  // idFilter(ev: any){
  //   console.log("idFilter()");
  //   console.log("dataReceive:",ev);

    
  // }

}

import { ClassroomService } from './../classroom.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  selectClass;
  selectTeacher;
  allClassRoom: any = [];
  allTeacher: any = [];
  classRoomForm: FormGroup;
  items: MenuItem[];
  activeItem: MenuItem;
  isShowAddClassRoomDialog: boolean;
  isShowEditClassRoomDialog: boolean;

  first = 0;

  rows = 10;

  constructor(private apiClass: ClassroomService, private router: Router, private fb: FormBuilder) {
    this.loadDataClassRoom();
    this.loadDataTeacher();
  }

  ngOnInit(): void {


    this.items = [
      { label: 'teacher', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'classRoom', icon: 'pi pi-fw pi-calendar', routerLink: '/classroom' },
      { label: 'historyCheckName', icon: 'pi pi-fw pi-pencil' },
      { label: 'listStudent', icon: 'pi pi-fw pi-file' },
      { label: 'listParent', icon: 'pi pi-fw pi-cog' }
    ];
    this.activeItem = this.items[1];
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.allClassRoom ? this.first === (this.allClassRoom.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.allClassRoom ? this.first === 0 : true;
  }

  loadDataClassRoom() {
    console.log("loadDataClassRoom()");
    this.apiClass.getAllClassRoom().subscribe((data: any) => {
      this.allClassRoom = data;
      console.log("dataReceiveUrl:", this.allClassRoom);


    })

  }

  loadDataTeacher(){
    console.log("loadDataTeacher()");
    this.apiClass.getAllTeacher().subscribe((data:any)=>{
      this.allTeacher = data;
      console.log("dataReceiveUrl:",this.allTeacher);
      
    })
    
  }

  handleAddClassRoom() {
    console.log("handleAddClassRoom()");
    
    this.classRoomForm = this.fb.group({
      'className': new FormControl('', Validators.required),
      'teacher': new FormControl('', Validators.required),
    });
    this.selectClass = null;
    this.showDialogAddClassRoom();
    
  }

  showDialogAddClassRoom(){
    console.log("showDialogAddClassRoom");
    this.isShowAddClassRoomDialog = true
  }

}

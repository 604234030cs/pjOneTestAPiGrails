import { ClassroomService } from './../classroom.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {


  selectedclassRoom: any;
  selectClassRoom;
  selectTeacher;
  dataAddClassRoom;
  dataJsonAddClassRoom;
  allClassRoom: any = [];
  allTeacher: any = [];
  classroom;
  classRoomForm: FormGroup;
  items: MenuItem[];
  activeItem: MenuItem;
  loading: boolean;
  isShowAddClassRoomDialog: boolean;
  isShowEditClassRoomDialog: boolean;
  dataFilter;
  dataSettingTime;
  first = 0;

  rows = 10;

  constructor(private apiClassRoom: ClassroomService, private router: Router, private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.loadDataClassRoom();
    this.loadDataTeacher();
    this.loading = true;
    this.items = [
      { label: 'teacher', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'classRoom', icon: 'pi pi-fw pi-calendar', routerLink: '/classroom' },
      { label: 'historyCheckName', icon: 'pi pi-fw pi-pencil' },
      { label: 'listStudent', icon: 'pi pi-fw pi-file', routerLink: '/student' },
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

  // -------------------------------------------  Get data  -------------------------------------------------------

  loadDataClassRoom() {
    console.log("loadDataClassRoom()");
    this.apiClassRoom.getAllClassRoom().subscribe((data: any) => {
      this.allClassRoom = data;
      console.log("dataReceiveUrl:", this.allClassRoom);
      console.log("datalength:", this.allClassRoom.length);
      this.loadCustomers(this.allClassRoom);




    })

  }

  loadDataTeacher() {
    console.log("loadDataTeacher()");
    this.apiClassRoom.getAllTeacher().subscribe((data: any) => {
      this.allTeacher = data;
      console.log("dataReceiveUrl:", this.allTeacher);

    })

  }


  loadCustomers(event: any) {
    console.log("dataReceive:", event);
    setTimeout(() => {
      if (this.allClassRoom) {
        this.classroom = this.allClassRoom.slice(event.first, (event.first + event.rows));
        this.loading = false;


      }
    }, 1000);

  }

  //  --------------------------------------  Search Section  -----------------------------------------------------


  checkDataFilter(event:any) {
    this.loading = false
    console.log("checkDataFilter()");
    console.log("dataReceiveFilter:", event);
    if (event.filters.id) {
      console.log(event.filters.id.value);
      let id = event.filters.id.value
      console.log("dataId", id);

      this.apiClassRoom.loadDataClassRoomFilterId(id).subscribe((data) => {
        this.classroom = data;
        console.log("dataReceiveUrlByClassId", this.classroom);

      })

    }
    else if (event.filters.className) {
      console.log(event.filters.className.value);
      let className = event.filters.className.value
      console.log("dataClassName:", className);
      this.apiClassRoom.loadDataClassRoomFilterClassName(className).subscribe((data: any) => {
        this.classroom = data
      })
    }

  }
  
  onFilter(event: any) {
    

    var timeout = null;
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout( () =>{
      console.log("search");
      this.checkDataFilter(event);
        // doSearch(val); //this is your existing function
      }, 5000);


  }
  //  --------------------------------- Add ClassRoom -----------------------------------------------


  handleAddClassRoom() {
    console.log("handleAddClassRoom()");

    this.classRoomForm = this.fb.group({
      'className': new FormControl('', Validators.required),
      'teacher': new FormControl('', Validators.required)
    });
    this.selectClassRoom = null;
    this.showDialogAddClassRoom();

  }

  showDialogAddClassRoom() {
    console.log("showDialogAddClassRoom()");
    this.isShowAddClassRoomDialog = true
  }

  handleSaveAddClassRoom(value: any) {
    console.log("handleSaveAddClassRoom()");
    console.log("dataReceiveForm", value);
    this.dataAddClassRoom = value;
    this.selectConfirmAddClassRoom(this.dataAddClassRoom);

  }
  selectConfirmAddClassRoom(dataAddClassRoom) {
    console.log("selectConfirmAddClassRoom()");
    console.log("dataReceive:", dataAddClassRoom);
    this.confirmationService.confirm({
      message: 'Are You Confirm Add Teacher',
      icon: 'pi pi-question',
      accept: () => {
        console.log("accept");
        this.confirmAddClassRoom(dataAddClassRoom);

      },
      reject: () => {
        console.log("cencel");
      }
    });

  }

  confirmAddClassRoom(dataAddClassRoom) {
    console.log("confirmAddClassRoom()");
    this.dataJsonAddClassRoom = JSON.stringify(dataAddClassRoom)
    console.log(this.dataJsonAddClassRoom);

    this.apiClassRoom.addClassRoom(dataAddClassRoom).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        console.log("สำเร็จ");
        this.messageService.add({ severity: 'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลชั้นเรียนสำเร็จ', life: 3000 })
        this.hideDialog();
      } else {
        console.log("ไม่สำเร็จ");
        this.messageService.add({ severity: 'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลชั้นเรียนไม่สำเร็จ', life: 3000 });
      }
    })
    this.hideDialog();


  }


  // ------------------------------- Delete ClassRoom -------------------------------------------------------------------


  handleSelectDeleteClassRoom(classRoom: any) {
    console.log("handleSelectDeleteClassRoom()");
    console.log(classRoom.id);
    this.confirmationService.confirm({
      message: 'Are You Confirm Delete ClassRoom',
      icon: 'pi pi-question',
      accept: () => {
        console.log("accept");
        this.confirmDeleteClassRoom(classRoom);

      },
      reject: () => {
        console.log("cencel");
      }
    });

  }

  confirmDeleteClassRoom(classRoom) {
    console.log("confirmDeleteclassRoom");
    console.log("dataReceiveclassRoomID:", classRoom.id);
    this.apiClassRoom.deleteClassRoom(classRoom).subscribe((data: any) => {
      console.log(data);
      this.hideDialog();

    });


  }

  // ------------------------------- Edit ClassRoom -------------------------------------------------------------------


  handleEditClassRoom(ClassRoom: any) {
    console.log("handleEditClassRoom()");
    console.log("dataClassRoom", ClassRoom);
    this.selectClassRoom = ClassRoom;
    console.log("dataselectClassRoom", this.selectClassRoom);
    this.showDialogEditClassRoom();
  }
  showDialogEditClassRoom() {
    console.log("showDialogEditClassRoom()");
    this.isShowEditClassRoomDialog = true
  }

  handleSaveEditClassRoom(selectClassRoom: any) {
    console.log("handleSaveEditClassRoom()");
    console.log("dataselectClassRoom", selectClassRoom);
    this.confirmationService.confirm({
      message: 'Are You Confirm Edit ClassRoom',
      icon: 'pi pi-question',
      accept: () => {
        console.log("accept");
        this.apiClassRoom.upDateTacher(selectClassRoom).subscribe((data: any) => {
          console.log(data);
          if (data != null) {
            console.log("สำเร็จ");
            this.messageService.add({ severity: 'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลชั้นเรียนสำเร็จ', life: 3000 })
            this.hideDialog();
          } else {
            console.log("ไม่สำเร็จ");
            this.messageService.add({ severity: 'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลชั้นเรียนไม่สำเร็จ', life: 3000 });
          }
          this.hideDialog();
        })

      },
      reject: () => {
        console.log("cencel");
      }
    });



  }
  // ------------------------------- close Dialog -------------------------------------------------------------------
  hideDialog() {
    this.isShowAddClassRoomDialog = false
    this.isShowEditClassRoomDialog = false
    this.ngOnInit();
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { ClassroomService } from './../classroom.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  classRoomForm: FormGroup; //ตัวแปรในรูปแบบของฟอร์มในการเป็นตัวจัดการในการเพิ่มข้อมูลชั้นเรียน

  allTeacher: any = []; //ตัวแปรเก็บข้อมูลคุณครู ที่ได้รับจากserve 
  allClassRoom: any = [];  //ตัวแปรเก็บข้อมูลชั้นเรียน ที่ได้รับจากserve
  classRoomValueTable: any = []; //ตัวแปรเก็บค่าเฉพาะเนื้อหา ที่ดึงข้อมูลมาจาก #proprety->allClassRoom


  items: MenuItem[]; //ตัวแปรเก็บค่าตัวเลือก TabMenu
  activeItem: MenuItem; //ตัวแปรเก็บค่าลำดับของตัวเลือกที่ของ TabMenu

  loading: boolean; // ตัวแปรเก็บค่าในการทำการรีโหลดหน้า
  isShowAddClassRoomDialog: boolean; //ตัวแปรเก็บค่าในการแสดงหน้าต่างในการโชว์ฟอร์มเพิ่มข้อมูลชั้นเรียน
  isShowEditClassRoomDialog: boolean; // ตัวแปรเก็บค่าในการแสดงหน้าต่างในการโชว์ฟอร์มแก้ไขข้อมูลชั้นเรียน

  totalRecords: number; //ตัวแปรเก็บค่าจำนวนข้อมูลชั้นเรียนทั้งหมดที่ได้รับจาก server เพื่อทำการ รีโหลดหน้าตามจำนวนที่ได้รับ

  dataEvent; // ตัวแปรเก็บค่าในส่วนของค่าของevent ในการโหลดหน้า
  selectClassRoom; // ตัวแปรเก็บค่าชั้นเรียนเฉพาะชั้นเรียนที่เลือกเพื่อแก้ไข
  selectedclassRoom; // ตัวแปรเก็บค่าชั้นเรียนเฉพาะชั้นเรียนที่เลือก
  dataJsonAddClassRoom; // property หรือ ตัวแปรแปลงชุดข้อมูลให้อยู่ในรูปแบบ JSON.stringfly



  constructor(private apiClassRoom: ClassroomService, private router: Router, private fb: FormBuilder,
    private confirmationService: ConfirmationService, private messageService: MessageService, private primengConfig: PrimeNGConfig) {

    this.loadDataTeacher(); //โหลดข้อมูลคุณครู
  }

  ngOnInit(): void {


    this.items = [
      // รายการใช้ในหัวข้อของ TabMenu 
      { label: 'teacher', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'classRoom', icon: 'pi pi-fw pi-calendar', routerLink: '/classroom' },
      { label: 'historyCheckName', icon: 'pi pi-fw pi-pencil' },
      { label: 'listStudent', icon: 'pi pi-fw pi-file', routerLink: '/student' },
      { label: 'listParent', icon: 'pi pi-fw pi-cog' }
    ];
    this.activeItem = this.items[1]; //ระบุค่าลำดับของตัวเลือกที่ของ TabMenu

    this.primengConfig.ripple = true; // อันนี้ไม่รู้ 555555
  }

  // -------------------------------------------  load Data  -------------------------------------------------------

  loadClassRoom(event: LazyLoadEvent) {
    // ดึงข้อมูลชั้นเรียนตามเงือนไข
    this.apiClassRoom.selectClassRoom(event).subscribe((data) => {
      this.allClassRoom = data;
    });
    setTimeout(() => {
      // ระยะเวลาในการรีโหลดการดึงข้อมูลเมื่อได้รับการป้อนข้อมูลมา
      if (this.allClassRoom.data) {
        this.classRoomValueTable = this.allClassRoom.data // เก็บค่าเฉพาะเนื้อหา ที่ดึงข้อมูลมาจากserver
        this.totalRecords = this.allClassRoom.dataCount;  //เก็บค่าเฉพาะจำนวน ที่ดึงข้อมูลมาจาก
      }
    }, 2000);
    this.dataEvent = event
  }

  loadDataTeacher() {
    // ดึงข้อมูลคุณครู
    this.apiClassRoom.getAllTeacher().subscribe((data: any) => {
      this.allTeacher = data;
    })
  }

  //  --------------------------------------  Search Section  -----------------------------------------------------
  onFilter(event: any) {
    // ค้นหาข้อมูล #ไม่ได้ใช้
    var timeout = null;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      this.checkDataFilter(event);
    }, 2000);
  }

  checkDataFilter(event: any) {
    // ค้นหาข้อมูล ตรวจสอบเงือนไข #ไม่ได้ใช้
    var result = event.filters.id ? 'classId=' + event.filters.id.value : 'className=' + event.filters.className.value;
    this.apiClassRoom.selectClassRoom(result).subscribe((data) => {
      this.allClassRoom = data;
    })
  }

  //  --------------------------------- Add ClassRoom -----------------------------------------------

  handleAddClassRoom() {
    // กำหนดค่าในส่วนของ form เพื่อใช้เป็นตัวแปรในการเพิ่มชั้นเรียน
    this.classRoomForm = this.fb.group({
      'className': new FormControl('', Validators.required),
      'teacher': new FormControl('', Validators.required)
    });
    this.selectClassRoom = null;
    this.showDialogAddClassRoom();
  }

  showDialogAddClassRoom() {
    // กำหนดตัวแปรที่ใช้เพื่อกำหนดในการเเสดงฟอร์มเพิ่มข้อมูลชั้นเรียน
    this.isShowAddClassRoomDialog = true
  }

  handleSaveAddClassRoom(value: any) {
    // รับค่าจากฟอร์มที่ผู้ใช้กรอกมาเก็บไว้ในตัวแปร
    this.selectClassRoom = value;
    this.selectConfirmAddClassRoom(this.selectClassRoom);

  }
  selectConfirmAddClassRoom(dataAddClassRoom) {
    // ตัวเลือกเพื่อตัดสินใจในการเพิ่มข้อมูลชั้นเรียน
    this.confirmationService.confirm({
      message: 'Are You Confirm Add Classroom',
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
    // ทำการเพิ่มข้อมูลชั้นเรียนไปใน server
    this.dataJsonAddClassRoom = JSON.stringify(dataAddClassRoom)
    this.apiClassRoom.addClassRoom(dataAddClassRoom).subscribe((data: any) => {
      let detail = data ? 'เพิ่มข้อมูลชั้นเรียนสำเร็จ' : 'เพิ่มข้อมูลชั้นเรียนไม่สำเร็จ';
      this.messageService.add({ severity: 'success', summary: 'เสร็จสิ้น', detail: detail, life: 3000 });
    })
    this.hideDialog();
  }

  // ------------------------------- Delete ClassRoom -------------------------------------------------------------------

  handleSelectDeleteClassRoom(classRoom: any) {
    // ตัวเลือกเพื่อตัดสินใจในการลบข้อมูลชั้นเรียน
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
    // ทำการลบข้อมูลชั้นเรียนใน server
    this.apiClassRoom.deleteClassRoom(classRoom).subscribe((data: any) => {
      let detail = data ? 'ลบข้อมูลชั้นเรียนสำเร็จ' : 'ลบข้อมูลชั้นเรียนไม่สำเร็จ';
      this.messageService.add({ severity: 'success', summary: 'เสร็จสิ้น', detail: detail, life: 3000 });
      this.hideDialog();
    });
  }

  // ------------------------------- Edit ClassRoom -------------------------------------------------------------------

  handleEditClassRoom(ClassRoom: any) {
    // รับค่าจากฟอร์มที่ผู้ใช้กรอกมาเก็บไว้ในตัวแปร
    this.selectClassRoom = ClassRoom;
    this.showDialogEditClassRoom();
  }

  showDialogEditClassRoom() {
    // กำหนดตัวแปรที่ใช้เพื่อกำหนดในการเเสดงฟอร์มแก้ไขข้อมูลชั้นเรียน
    this.isShowEditClassRoomDialog = true
  }

  handleSaveEditClassRoom(selectClassRoom: any) {
    // ตัวเลือกเพื่อตัดสินใจในการแก้ไขข้อมูลชั้นเรียน
    this.confirmationService.confirm({
      message: 'Are You Confirm Edit ClassRoom',
      icon: 'pi pi-question',
      accept: () => {
        console.log("accept");
        this.apiClassRoom.updateClassRoom(selectClassRoom).subscribe((data: any) => {
          let detail = data ? 'แก้ไขข้อมูลชั้นเรียนสำเร็จ' : 'แก้ไขข้อมูลชั้นเรียนไม่สำเร็จ';
          this.messageService.add({ severity: 'success', summary: 'เสร็จสิ้น', detail: detail, life: 3000 });
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
    // ล้างค่าตัวแปรที่เป็นการกำหนดในการแสดงฟอร์มต่างๆ พร้อมโหลดข้อมูลใหม่
    this.isShowAddClassRoomDialog = false
    this.isShowEditClassRoomDialog = false
    this.loadClassRoom(this.dataEvent);

  }


}

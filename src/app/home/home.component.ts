import { TeacherService } from './../teacher.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teacherForm: FormGroup;
  items: MenuItem[];
  activeItem: MenuItem;
  allTeacher: any = [];
  teachers: any = [];
  title: any = [];
  totalRecords: number;
  cols: any[];
  selectTeacher;
  dataAddTeacher;
  dataJsonAddTeacher;
  loading: boolean;
  isShowEditTeacherDialog: boolean;
  isShowAddTeacherDialog: boolean;

  first = 0;

  rows = 10;

  constructor(private apiTeacher: TeacherService, private primengConfig: PrimeNGConfig, private fb: FormBuilder,
    private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) {


  }

  ngOnInit(): void {
    this.LoadDataTeacher();
    this.loading = true;
    this.primengConfig.ripple = true;
    this.title = [
      { label: '---เลือกคำนำหน้า---', value: null },
      { label: 'นางสาว', value: 'นางสาว' },
      { label: 'นาง', value: 'นาง' },
      { label: 'นาย', value: 'นาย' }
    ];

    this.items = [
      { label: 'teacher', icon: 'pi pi-fw pi-home' },
      { label: 'classRoom', icon: 'pi pi-fw pi-calendar', routerLink: '/classroom' },
      { label: 'historyCheckName', icon: 'pi pi-fw pi-pencil' },
      { label: 'listStudent', icon: 'pi pi-fw pi-file' },
      { label: 'listParent', icon: 'pi pi-fw pi-cog' }
    ];
    this.activeItem = this.items[0];



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
    return this.allTeacher ? this.first === (this.allTeacher.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.allTeacher ? this.first === 0 : true;
  }


  //  ---------------------------------------------- get Data  ----------------------------------------
  LoadDataTeacher() {

    console.log("LoadDataTeacher()");
    this.apiTeacher.getTacherAll().subscribe((data: any) => {
      console.log("getTacherAll()", data);
      this.allTeacher = data;
      this.totalRecords = data.length;
    });
    this.loading = true;
    // this.loadCustomers(this.allTeacher);
  }

  loadCustomers(event: LazyLoadEvent) {
    console.log("loadCustomers()");
    this.loading = true;
    console.log(event);

    setTimeout(() => {
      if (this.allTeacher) {
        this.teachers = this.allTeacher.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 800);
  }

  //  ---------------------------------------------- edit Teacher  ----------------------------------------

  handleEditTeacher(teacher: any) {
    console.log("handleEditTeacher()");
    console.log("datateacher", teacher);
    this.selectTeacher = teacher;
    console.log("dataSelectTeacher", this.selectTeacher);
    this.showDialogEditteacher();
  }
  showDialogEditteacher() {
    console.log("showDialogEditteacher()");
    this.isShowEditTeacherDialog = true
  }

  handleSaveEditTeacher(selectTeacher: any) {
    console.log("handleSaveEditTeacher()");
    console.log("dataselectTeacher", selectTeacher);
    this.confirmationService.confirm({
      message: 'Are You Confirm Edit Teacher',
      icon: 'pi pi-question',
      accept: () => {
        console.log("accept");
        this.apiTeacher.upDateTacher(selectTeacher).subscribe((data: any) => {
          console.log(data);

          this.hideDialog();
        })

      },
      reject: () => {
        console.log("cencel");
      }
    });



  }

  //  ---------------------------------------------- Delete Teacher  ----------------------------------------

  handleSelectDeleteTeacher(teacher: any) {
    console.log("handleSelectDeleteTeacher()");
    console.log(teacher.id);
    this.confirmationService.confirm({
      message: 'Are You Confirm Delete Teacher',
      icon: 'pi pi-question',
      accept: () => {
        console.log("accept");
        this.confirmDeleteTeacher(teacher);

      },
      reject: () => {
        console.log("cencel");
      }
    });

  }

  confirmDeleteTeacher(teacher) {
    console.log("confirmDeleteTeacher");
    console.log("dataReceiveTeacherID:", teacher.id);
    this.apiTeacher.deleteTeacher(teacher).subscribe((data: any) => {
      console.log(data);
      this.LoadDataTeacher();

    });


  }

  //  ---------------------------------------------- add Teacher  ----------------------------------------

  handleAddTeacher() {

    this.teacherForm = this.fb.group({
      'teacherUser': new FormControl('', Validators.required),
      'teacherPassword': new FormControl('', Validators.required),
      'teacherTitle': new FormControl('', Validators.required),
      'teacherName': new FormControl('', Validators.required),
      'teacherSname': new FormControl('', Validators.required),
      'teacherTel': new FormControl('', Validators.required),
      'teacherAddress': new FormControl('', Validators.required)
    });

    this.dataAddTeacher = null;
    console.log("handleAddTeacher()");
    this.selectTeacher = null;
    this.showDialogAddTeacher();
  }

  showDialogAddTeacher() {
    console.log("showDialogAddTeacher()");
    this.isShowAddTeacherDialog = true;
  }

  handleSaveAddTeacher(e, value: string) {
    e.preventDefault();

    console.log("handleSaveAddTeacher()");
    console.log("data-register", value);
    this.dataAddTeacher = value;
    console.log("dataAddTeacherInhandleSaveAddTeacher:", this.dataAddTeacher);
    this.selectConfirmAddTeacher(this.dataAddTeacher);
  }

  selectConfirmAddTeacher(dataAddTeacher: string) {
    console.log("selectConfirmAddTeacher()");
    console.log("dataAddTeacherInselectConfirmAddTeacher:", dataAddTeacher);

    this.confirmationService.confirm({
      message: 'Are You Confirm Add Teacher',
      icon: 'pi pi-question',
      accept: () => {
        console.log("accept");
        this.confirmAddTeacher(dataAddTeacher);

      },
      reject: () => {
        console.log("cencel");
      }
    });

  }
  confirmAddTeacher(dataAddTeacher) {
    console.log("confirmAddTeacher()");
    console.log("dataAddTeacherInconfirmAddTeacher:", dataAddTeacher);

    this.dataJsonAddTeacher = JSON.stringify(dataAddTeacher)

    this.apiTeacher.addTacher(dataAddTeacher).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        console.log("สำเร็จ");
        this.messageService.add({ severity: 'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลคุณครูสำเร็จ', life: 3000 })
        this.hideDialog();
      } else {
        console.log("ไม่สำเร็จ");
        this.messageService.add({ severity: 'success', summary: 'เสร็จสิ้น', detail: 'เพิ่มข้อมูลคุณครูไม่สำเร็จ', life: 3000 });
      }
    })
    this.LoadDataTeacher();

  }

  //  ---------------------------------------------- close Dialog  ----------------------------------------
  hideDialog() {
    console.log("hideDialog()");
    this.selectTeacher = null;
    this.dataAddTeacher = null;
    this.isShowEditTeacherDialog = false
    this.isShowAddTeacherDialog = false
    this.LoadDataTeacher();

  }



}

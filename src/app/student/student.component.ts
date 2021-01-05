import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentForm: FormGroup;
  items: MenuItem[];
  activeItem: MenuItem;
  allStudent: any = [];
  allParent: any = [];
  allClassRoom: any = [];
  students: any = [];
  title: any = [];
  totalRecords: number;
  cols: any[];
  selectStudent;
  dataAddStudent;
  dataJsonAddStudent;
  loading: boolean;
  isShowEditStudentDialog: boolean;
  isShowAddStudentDialog: boolean;

  first = 0;

  rows = 10;

  i = 0;
  c_length = 0;
  c_success = 0;

  constructor(private apiStudent: StudentService, private primengConfig: PrimeNGConfig, private fb: FormBuilder,
    private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.loadDataStudent();



    this.items = [
      { label: 'teacher', icon: 'pi pi-fw pi-home' },
      { label: 'classRoom', icon: 'pi pi-fw pi-calendar', routerLink: '/classroom' },
      { label: 'historyCheckName', icon: 'pi pi-fw pi-pencil' },
      { label: 'listStudent', icon: 'pi pi-fw pi-file' },
      { label: 'listParent', icon: 'pi pi-fw pi-cog' }
    ];
    this.activeItem = this.items[3];

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
    return this.allStudent ? this.first === (this.allStudent.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.allStudent ? this.first === 0 : true;
  }

  //  ---------------------------------------------- get Data  ----------------------------------------
  loadDataStudent() {

    console.log("LoadDataStudent()");
    this.apiStudent.getStudentAll().subscribe((data: any) => {
      console.log("getStudentAll()", data);
      this.allStudent = data;
      this.totalRecords = data.length;

      this.apiStudent.getParentAll().subscribe((data: any) => {
        console.log("getParentAll()", data);
        this.allParent = data;

        this.apiStudent.getClassRoomAll().subscribe((data: any) => {
          console.log("getClassRoomAll()", data);
          this.allClassRoom = data;

        });

      });
    });

  }


  // -----------------------------------------------  Add Student  ---------------------------------------------

  handleAddStudent(){
    this.studentForm = this.fb.group({
      'studentTitle': new FormControl('', Validators.required),
      'studentName': new FormControl('', Validators.required),
      'studentSname': new FormControl('', Validators.required),
      'studentNickname': new FormControl('', Validators.required),
      'studentSex': new FormControl('', Validators.required),
      'classroom': new FormControl('', Validators.required),
      'parent': new FormControl('', Validators.required)
    });
    
  }
}



import { ClassroomService } from './../classroom.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private apiClass: ClassroomService,private router: Router) { }

  ngOnInit(): void {
    
    
    this.items = [
      { label: 'teacher', icon: 'pi pi-fw pi-home',routerLink: '/home' },
      { label: 'classRoom', icon: 'pi pi-fw pi-calendar',routerLink: '/classroom' },
      { label: 'historyCheckName', icon: 'pi pi-fw pi-pencil' },
      { label: 'listStudent', icon: 'pi pi-fw pi-file' },
      { label: 'listParent', icon: 'pi pi-fw pi-cog' }
    ];
    this.activeItem = this.items[1];
  }

}

import { TeacherService } from './teacher.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ClassroomComponent } from './classroom/classroom.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClassroomComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    BrowserAnimationsModule,
    MenuModule,
    TabMenuModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ProgressBarModule,
    ConfirmPopupModule
  ],
  providers: [TeacherService,ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

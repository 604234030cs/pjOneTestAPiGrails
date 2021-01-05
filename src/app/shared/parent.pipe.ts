import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'parent'
})
export class ParentPipe implements PipeTransform {

  constructor(private http: HttpClient){}


  transform(parent: Number): string {

    let url = environment.parent.checkParentById + parent;
    console.log(url);

    return null;
  }

}

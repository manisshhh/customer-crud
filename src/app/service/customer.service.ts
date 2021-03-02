import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/cusomter.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private API_URL: string = environment.api
  studentList : Customer[] = [];

  constructor(private http: HttpClient) {
  }

  addStudent(params:any) {
    return this.http.post(`${this.API_URL}add-customer`,params)
  }

  getStudents(){
    return this.http.get(`${this.API_URL}`)
  }


  studentEdit(student: any){
    let present: Boolean = false;
    this.studentList.map((val, index)=>{
      if(val.id == student.id) {this.studentList[index] = student;present=true}
    });
    return present;
  }
}

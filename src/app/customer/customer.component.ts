import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup = this.fb.group({})
  isEdit: Boolean = false;
  msg:String = '';
  customerList: any;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.customerForm = new FormGroup({
      name: new FormControl(''),
      id: new FormControl(''),
      address: new FormControl(''),
      gender: new FormControl(''),
    })


    this.customerService.getStudents().subscribe((res: any) => {
      this.customerList = res;
    })

  }

  resetForm(){
    console.log('reset',this.customerForm)
    this.customerForm.reset();
  }

  add(){
    if(this.customerForm.valid){
      this.customerService.addStudent(this.customerForm.value).subscribe((res:any) => {
        console.log(res)
      })
      this.customerService.studentList.push(this.customerForm.value);
      this.resetForm();

    }
      else {
      this.msg = 'Please complete form'
    }
  }

  edit(id: any){
    if(id){
      let student: any;
      this.customerList.map((val: any) => {
        if(val._id == id) student = val;
      });

      if(student){
        this.customerForm.controls.id.setValue(student.id)
        this.customerForm.controls.name.setValue(student.name)
        this.customerForm.controls.gender.setValue(student.gender)
        this.customerForm.controls.address.setValue(student.address)
        this.isEdit = true;
        }
    }
  }

  update() {
    let obj = {
      name: this.customerForm.value.name,
      id: this.customerForm.value.id,
      address: this.customerForm.value.address,
      gender: this.customerForm.value.gender,
      _id: this.cus
    }
       const index = this.customerList.findIndex((x:any) => x.id == obj.id)
       this.customerList.splice(index, 1, obj);


       this.customerService.updateCustomer(obj)
       this.customerForm.reset()
       this.isEdit = false;
  }

  deleteCustomer(id:any) {
    const dataArr = this.customerList;
    const index = dataArr.findIndex((x:any) => x.id == id)
    this.customerList.splice(index, 1);
}

}

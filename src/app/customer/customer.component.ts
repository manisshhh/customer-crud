import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.customerForm = new FormGroup({
      name: new FormControl('',Validators.required),
      id: new FormControl(''),
      address: new FormControl(''),
      gender: new FormControl(''),
      _id: new FormControl('')
    })


    this.customerService.getCustomers().subscribe((res: any) => {
      this.customerList = res;
    })

  }

  resetForm(){

    this.customerForm.reset();
  }

  add(){
    if(this.customerForm.valid){
      this.customerService.addCustomers(this.customerForm.value).subscribe((res:any) => {

      })
      this.customerService.customerList.push(this.customerForm.value);
      this.customerService.getCustomers().subscribe((res: any) => {
        this.customerList = res;
      })
      this.resetForm();

    }
      else {
      this.msg = 'Please complete form'
    }
  }

  edit(id: any){
    if(id){
      let customer: any;
      this.customerList.map((val: any) => {
        if(val._id == id) customer = val;
      });


      if(customer){

        this.customerForm.patchValue(customer)
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
      _id: this.customerForm.value._id
    }
       const index = this.customerList.findIndex((x:any) => x.id == obj.id)
       this.customerList.splice(index, 1, obj);


       this.customerService.updateCustomer(obj).subscribe((res:any) => {

       })
       this.customerForm.reset()
       this.isEdit = false;
  }

  deleteCustomer(id:any) {
    const dataArr = this.customerList;
    const index = dataArr.findIndex((x:any) => x.id == id)
    this.customerList.splice(index, 1);

    this.customerService.deleteCustomer(id).subscribe((res:any) => {

    })

    this.customerService.getCustomers().subscribe((res: any) => {
      this.customerList = res;
    })
}

}

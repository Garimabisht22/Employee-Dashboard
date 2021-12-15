import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  EmployeeModelObj : EmployeeModel = new EmployeeModel();
  employeedata : any;
  showAdd : boolean = true ;
  showUpdate : boolean = false ;

  constructor(private formbuilder : FormBuilder,private api : ApiService
    ) {
   }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],  
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : [''],

    })
    this.getAllEmployeeDetails()
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.EmployeeModelObj.firstName = this.formValue.value.firstName;
    this.EmployeeModelObj.lastName = this.formValue.value.lastName;
    this.EmployeeModelObj.mobile = this.formValue.value.mobile;
    this.EmployeeModelObj.email = this.formValue.value.email;
    this.EmployeeModelObj.salary = this.formValue.value.salary;
    this.api.postEmployee(this.EmployeeModelObj).subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully")
      this.formValue.reset();
      this.getAllEmployeeDetails()
      let ref = document.getElementById("cancel")
      ref?.click()
    },
    // err=>{
    //   alert("Something Went Wrong");
    // }
    )

  }
  getAllEmployeeDetails(){
    this.api.getEmployee().subscribe(res=>{
      console.log(res);
      this.employeedata = res;

    })
  }

  deleteEmployee(row:any){
    this.api.DeleteEmployee(row.id).subscribe(res=>{
      alert("Employee deleted successfully")
      this.getAllEmployeeDetails()

    })
  }

  onEditEmployeeData(row:any){
    this.showAdd = false;
    this.showUpdate= true;
    this.EmployeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['salary'].setValue(row.salary);

  }
  updateEmployeeData(){
    this.EmployeeModelObj.firstName = this.formValue.value.firstName;
    this.EmployeeModelObj.lastName = this.formValue.value.lastName;
    this.EmployeeModelObj.mobile = this.formValue.value.mobile;
    this.EmployeeModelObj.email = this.formValue.value.email;
    this.EmployeeModelObj.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.EmployeeModelObj,this.EmployeeModelObj.id).subscribe(res=>{
    alert("Employee Data Updated Successfully")
    this.getAllEmployeeDetails()
    let ref = document.getElementById("cancel")
    ref?.click()
  })  }
}

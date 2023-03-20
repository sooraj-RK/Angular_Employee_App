import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {
  empForm: FormGroup;
  education: string[] = [
    'matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(private _fb: FormBuilder,
     private _empService:EmployeeService,
     private _dialogRef:MatDialogRef<EmpAddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any
     ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data) {
        this._empService
        .updateEmployee(this.data.id,this.empForm.value)
        .subscribe({
          next: (val: any) => {
            alert('employee details updated');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.log(err);
          
          },
         });
    
      }
      }else{
     this._empService.addEmployee(this.empForm.value).subscribe({
      next: (val: any) => {
        alert('employee added successfully');
        this._dialogRef.close(true);
      },
      error: (err:any) => {
        console.log(err);
      
      }
     })

    }
  }
}

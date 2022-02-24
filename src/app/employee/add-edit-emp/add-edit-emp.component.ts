import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.scss']
})
export class AddEditEmpComponent implements OnInit {
  @Input() emp:any;
  employeeId:number=0;
  employeeName:string='';
  department:string='';
  dateOfJoining:string='';
  photoFileName:string='';
  photoFilePath:string='';

  departmentList:any=[];
  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.loadDepartmentList();
    //console.log(this.dep);
  }

  loadDepartmentList(){
    this.service.getAllDepNames().subscribe(res=>{
      this.departmentList = res;

      this.employeeId  = this.emp.EmployeeId;
      this.employeeName = this.emp.EmployeeName;
      this.department = this.emp.Department;
      this.dateOfJoining = this.emp.DateOfJoining;
      this.photoFileName = this.emp.PhotoFileName;
      this.photoFilePath = this.service.Photourl+this.photoFileName;
    });
  }

  addEmployee(){
    let item = {
      employeeId:this.employeeId,
      employeeName:this.employeeName,
      department:this.department,
      dateOfJoining:this.dateOfJoining,
      photoFileName:this.photoFileName
    }
    this.service.addEmployee(item).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateEmployee(){
    let item = {
      employeeId:this.employeeId,
      employeeName:this.employeeName,
      department:this.department,
      dateOfJoining:this.dateOfJoining,
      photoFileName:this.photoFileName
    }
    this.service.updateEmployee(item).subscribe(res=>{
      alert(res.toString());
    });
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.uploadPhoto(formData).subscribe(res=>{
      this.photoFileName = res.toString();
      this.photoFilePath = this.service.Photourl+this.photoFileName;
    });
  }

}

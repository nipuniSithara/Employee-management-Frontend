import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.scss']
})
export class AddEditDepComponent implements OnInit {

  @Input() dep:any;
  departmentId:number=0;
  departmentName:string='';
  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.departmentId  = this.dep.DepartmentId;
    this.departmentName = this.dep.DepartmentName;
    console.log(this.dep);
  }

  addDepartment(){
    let item = {
      departmentId:this.departmentId,
      departmentName:this.departmentName
    }
    this.service.addDepartment(item).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateDepartment(){
    let item = {
      departmentId:this.departmentId,
      departmentName:this.departmentName
    }
    this.service.updateDepartment(item).subscribe(res=>{
      alert(res.toString());
    });
  }
}

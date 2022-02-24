import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.scss']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService, private modalService: NgbModal) { }

  departmentList:any=[];
  modalTitle:string='';
  activateAddEditDepCopm:boolean=false;
  dep:any;
  display = "none";

  title = 'appBootstrap';
   
  closeResult: string = '';

  departmentIdFilter:string='';
  departmentNameFilter:string='';
  departmentListWithoutFilter:any=[];

  ngOnInit(): void {
    this.loadDepList();
  }

  loadDepList(){
    this.service.getDepList().subscribe(res=>{
      this.departmentList=res;
      this.departmentListWithoutFilter = res;
    });
  }

  filter(){
    var departmentIdFilter = this.departmentIdFilter;
    var departmentNameFilter = this.departmentNameFilter;
    this.departmentList = this.departmentListWithoutFilter.filter(function (el:any){
      return el.DepartmentId.toString().toLowerCase().includes(
        departmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        departmentNameFilter.toString().trim().toLowerCase()
      );
    });
  }

  sortResult(prop:any,asc:boolean){
    this.departmentList = this.departmentListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ? -1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ? -1 :0);
      }
    });
  }

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.modalTitle="Add Department";
    this.activateAddEditDepCopm=true;
    
  }

  editClick(item:any){
    this.dep = item;
    this.modalTitle="Edit Department";
    this.activateAddEditDepCopm=true;
  }

  closeClick(){
    this.activateAddEditDepCopm=false;
    this.loadDepList();
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  deleteClick(id:number){
    this.service.deleteDepartment(id).subscribe(res=>{
      alert(res.toString());
      this.loadDepList();
    });
  }
}



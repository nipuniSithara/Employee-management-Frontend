import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.scss']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService, private modalService: NgbModal) { }

  title = 'appBootstrap';
   
  closeResult: string = '';
  emp:any;
  employeeList:any=[];

  modalTitle:string='';

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(){
    this.service.getEmpList().subscribe(res=>{
      console.log(res);
      this.employeeList=res;
    });
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
    this.modalTitle="Add Employee";
    
  }

  editClick(item:any){
    this.emp = item;
    this.modalTitle="Edit Employee";
    //this.activateAddEditDepCopm=true;
  }

  deleteClick(id:number){
    this.service.deleteEmployee(id).subscribe(res=>{
      alert(res.toString());
      this.loadEmployees();
    });
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
}

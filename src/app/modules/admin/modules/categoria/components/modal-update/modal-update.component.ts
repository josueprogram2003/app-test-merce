import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Categoria } from 'src/app/core/models/categoria';
import { StateTableService } from 'src/app/shared/services/state-table.service';
import { CategoriaService } from '../../services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.scss']
})
export class ModalUpdateComponent {
  matcher = new MyErrorStateMatcher();
  formGroup: FormGroup = new FormGroup({});
  _serviceCategories = inject(CategoriaService)
  _stateTable = inject(StateTableService);
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,private modalService: NgbModal){

  }

  ngOnInit(): void {
    this.initializeForm()
  }

  public initializeForm(){
    this._stateTable.statusUpdateTable.subscribe((data:any)=>{
      console.log(data)
      const modalRef = this.modalService.open(ModalUpdateComponent);
    // Puedes realizar algunas acciones después de que el nuevo modal se haya abierto, si es necesario
      modalRef.result.then(
        (result:any) => {
          console.log(`Nuevo modal cerrado con resultado: ${result}`);
        },
        (reason:any) => {
          console.log(`Nuevo modal cerrado con razón: ${reason}`);
        }
      );
    });
    const categoria = new Categoria(null,'');
    this.formGroup =new FormGroup({
      id: new FormControl(categoria.id),
      nombre:new FormControl(categoria.nombre,[
        Validators.required
      ])
    });
    this.formGroup.markAsUntouched();
  }

  public sendCategory(){
    Object.values(this.formGroup.controls).forEach(control => {
    control.markAsTouched();
    });
    if (this.formGroup.valid) {
       const  send = {
      status: true,
      dataSend:this.formGroup.value
    }
    this._stateTable.statusInsertTable.next(send);
    this.formGroup.reset()
    }else{
      this.showWarning()
    }
  }

  public resetForm(){
    this.formGroup.reset();
    this.formGroup.markAsUntouched();
  }

  showWarning() {
    this.toastr.warning("Te falta rellenar campos obligatorios", 'Categoria',{
      timeOut: 2000,
      disableTimeOut:false,
      progressBar:true
    });
  }

}

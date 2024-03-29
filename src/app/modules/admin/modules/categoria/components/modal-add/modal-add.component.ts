import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/core/models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { StateTableService } from 'src/app/shared/services/state-table.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent implements OnInit  {
  matcher = new MyErrorStateMatcher();
  formGroup: FormGroup = new FormGroup({});
  _serviceCategories = inject(CategoriaService)
  _stateTable = inject(StateTableService);
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.initializeForm()
  }

  public initializeForm(){
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

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from 'src/app/core/models/categoria';
import { StateTableService } from 'src/app/shared/services/state-table.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ButtonDeleteComponent } from 'src/app/shared/components/buttons/button-delete/button-delete.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit, AfterViewInit {
  @ViewChild('containerTable', { static: true }) containerTable!: ElementRef;
  heightContainer!:number;
  dataCategoria !: Categoria[]
  pageSize!:number;
  columnCategoria =[
  /*{
    nombre: '',
    class: '',
    icon:' ',
    classInput:'form-check-input',
    type:'checkbox'
  },*/
  {
    nombre: '#',
    class: '',
    icon:"",
    classInput:'',
  },
  {
    nombre: 'Categoria',
    class: 'header__column',
    icon:"fa-solid fa-sort sort-icon",
    classInput:'form-control form-control-sm',
    searchField:'nombre',
    // el pipe es para buscar si es false no busca, el aliaspipeseach es por el campo que va a filtrar
    pipe:true,
    aliasPipeSearch:'nombre',
    type:'text'
  },
  {
    nombre: 'Acciones',
    class: 'header__column',
    classInput:'',
  },
  ]
  _categoriaService = inject(CategoriaService)
  status:boolean = true;
  _statusTableService = inject(StateTableService);
  _toastService = inject(ToastrService)
  constructor(private cdr: ChangeDetectorRef){

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setContainerHeight();
      // Detener la detección de cambios manualmente
      this.cdr.detectChanges();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setContainerHeight()
  }

  setContainerHeight(): void {
    this.heightContainer = this.containerTable.nativeElement.clientHeight;
    if (this.heightContainer <= 480) {
      this.pageSize = 8;
    }else if(this.heightContainer <= 590){
      this.pageSize = 10;
    }else if(this.heightContainer <= 600){
      this.pageSize = 14;
    }else if(this.heightContainer > 601){
      this.pageSize = 18;
    }
  }

  ngOnInit(): void {
    this.getAllCategoria()
    this.deleteCategoria()
    this.insertCategoria()
  }

   public getAllCategoria(){
    this._categoriaService.getAllCategories()
      .subscribe((data: Categoria[]) => {
        this.dataCategoria = data;
        this.status = false;
      })
  }

  async keyUpStatus($event:any){
    if ($event) {
     await  this.getAllCategoria();
    }
  }

  // ACTIONS CRUD

  public deleteCategoria(){
    this._statusTableService.statusDeleteTable.subscribe((data:any) =>{
       if (data != undefined || data != null) {
        if (data.status) {
          this.sweetAlert(`¿Desea Eliminar ${data.dataSend.nombre}.?`,"Eliminado Correctamente.!", "DELETE" ,data.dataSend)
        }
      }
    })
  }

  public loadDataUpdate(){
    this.status=true;
    this.getAllCategoria();
  }

  public insertCategoria(){
    this._statusTableService.statusInsertTable.subscribe((data:any) =>{
      if (data != undefined || data != null) {
        if (data.status) {
          this.sendCategory(data.dataSend)
        }
      }
    })
  }

  public updateCategoria(){
    
  }

  public sweetAlert(question:string, textToast:string, state:string,data:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
      confirmButton: "btn btn--add mx-2",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: question,
      text: "Lea bien antes de confirmar la accion..?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        switch (state) {
          case "DELETE":
            this._categoriaService
            .deleteCategories(data.id)
            .then((res:any) => {
              if (res.status) {
                this.getAllCategoria();
                this.showToast(textToast)
                const  send = {
                status: false,
                dataSend:null
                }
                this._statusTableService.statusDeleteTable.next(send)
              }else{
                this.showToast("Ocurrio problemas en la acción")
              }
            })
            .catch(err => {
              console.log(err)
              this._toastService.error("Algo salio mal error al eliminar", 'Categoria',{
           timeOut: 2000,
           disableTimeOut:false,
           progressBar:true
          });
            }
              )
          break;

          default:
          break;
   }
  }
});
  }

  public sendCategory(data:any){
       this._categoriaService.insertCategories(data)
       .then((res:any)=> {
       if (res.status) {
          this.getAllCategoria()
          this.showSuccess(res.message)
         }
      })
      .catch(resp => {
        this.showError()

         })
  }


  showSuccess(text:string) {
    this._toastService.success(text, 'Categoria',{
      timeOut: 2000,
      disableTimeOut:false,
      progressBar:true
    });
  }

  showError() {
    this._toastService.error("Algo salio mal error al insertar", 'Categoria',{
      timeOut: 2000,
      disableTimeOut:false,
      progressBar:true
    });
  }


  public showToast(text:string){
      this._toastService.success(text, 'Categoria',{
      timeOut: 2000,
      disableTimeOut:false,
      progressBar:true
    });
  }

}

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from 'src/app/core/models/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit, AfterViewInit {
  @ViewChild('containerTable', { static: true }) containerTable!: ElementRef;
  heightContainer!:number;
  dataCategoria !: Categoria[]
  pageSize!:number;
  columnCategoria =[
  {
    nombre: '',
    class: '',
    icon:' ',
    classInput:'form-check-input',
    type:'checkbox'
  },
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
  }

   public getAllCategoria(){
    this._categoriaService.getAllCategories()
      .subscribe((data: Categoria[]) => {
        this.dataCategoria = data;
      })
  }

  async keyUpStatus($event:any){
    if ($event) {
     await  this.getAllCategoria();
    }
  }

}

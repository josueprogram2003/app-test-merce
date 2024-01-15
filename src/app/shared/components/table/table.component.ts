import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {
  Categoria
} from 'src/app/core/models/categoria';
import { OrderListPipe } from '../../pipes/order-list.pipe';
import { ToastrService } from 'ngx-toastr';
import { StateTableService } from '../../services/state-table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit  {
  selectedChecked: Categoria[] = [];
  @ViewChildren('input') inputs:QueryList<ElementRef> | undefined;
  dataCloneOfDataTable:Categoria[]=[];
  ordenPipe:string ='desc';
  dataTable: Categoria[] = [];
  height!:number;
  // pagina actual
  currentPage = 1;
  // numero total de paginas en el paginador
  paginator!:number;
  // Numero de registros por pagina
  @Input() pageSize!:number;
  @Input() columnsTable!: any[];
  @Input()
  set dataTableCategoria(value: Categoria[]) {
    this.dataTable = value;
    this.dataCloneOfDataTable = this.dataTable;
  }
  @Input()
  set heigthTable(value: number) {
    this.height = value;
  }
  @Input() checkbox :boolean = false;

  constructor(private orderListPipe: OrderListPipe, private _stateService: StateTableService){

  }

  ngOnInit(): void {
  }

  get paginatedData() {
   if (this.dataTable!=undefined) {
     const startIndex = (this.currentPage - 1) * this.pageSize;
     const endIndex = startIndex + this.pageSize;
    //  console.log(this.dataTable.slice(startIndex, endIndex))
     return this.dataTable.slice(startIndex, endIndex);
   }
    return [];
  }

  verifyChecked(data:Categoria){
      const verifyChecked = this.selectedChecked.some(objeto => objeto.id === data.id);
      return verifyChecked;
  }

  get totalPages() {
    if (this.dataTable!=undefined) {
      return Math.ceil(this.dataTable.length / this.pageSize);
    }
    return 0;
  }

  getPages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  calculateIndex(index: number): number {
    return index + (this.currentPage - 1) * this.pageSize;
  }
  // maneja el paginador
  onPageChange(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  // checked de los inputs

  checkedInput(data: Categoria,$event:Event) {
    let inputSelectedNow = $event.target as HTMLInputElement;
    if (inputSelectedNow.checked) {
      inputSelectedNow.checked = false;
      this.selectedChecked = this.selectedChecked.filter(objeto => objeto.id !== data.id)
       console.log(this.selectedChecked)
    } else {
      inputSelectedNow.checked = true;
      this.selectedChecked.push(data);
       console.log(this.selectedChecked)
    }
  }

  clickRow(data:Categoria, $event:Event){
    if (this.checkbox) {
      const element = $event.target as HTMLElement;
      const checked = element.closest('tr')?.querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (checked.checked) {
        checked.checked = false;
        this.selectedChecked = this.selectedChecked.filter(objeto => objeto.id !== data.id)
      //  console.log(this.selectedChecked)
      } else {
        checked.checked = true;
        this.selectedChecked.push(data);
      //  console.log(this.selectedChecked)
      }
    }

  }


  // checked del input general
  checkedInputAll($event:Event){
    let inputSelectedNow = $event.target as HTMLInputElement;
    if (inputSelectedNow.checked) {
      this.selectedChecked = this.dataTable;
      this.inputs?.forEach(data=>{
        let input = data.nativeElement as HTMLInputElement;
        input.checked = true;
      })
      // console.log(this.selectedChecked)
    }else{
      this.selectedChecked = []
      this.inputs?.forEach(data=>{
        let input = data.nativeElement as HTMLInputElement;
        input.checked = false;
      })
      // console.log(this.selectedChecked)
    }
  }

  // Buscar
  inputSearchText($event:Event,searchField:string){
    this.dataTable = this.dataCloneOfDataTable;
    const input = $event.target as HTMLInputElement;
    const keyVerifyByDataTable = this.dataTable.every(objeto => objeto.hasOwnProperty(searchField));
    if (keyVerifyByDataTable) {
      if (input.value == '') {
        this.dataTable = this.dataCloneOfDataTable;
      } else {
        const dataSearch = this.dataTable.filter((objeto:any) => objeto[searchField].toLowerCase().includes(input.value.toLowerCase()));
        this.dataTable=dataSearch;
        this.currentPage = 1;
      }
    } else {
      this.dataTable = this.dataCloneOfDataTable;
    }

  }
  // pipes
  changeSort(pipe:boolean, alias:string){
      // console.log(pipe, alias)
      if (pipe) {
        this.dataTable = this.orderListPipe.transform(this.dataTable, this.ordenPipe);
        this.ordenPipe = this.ordenPipe == 'asc'  ? 'desc' : 'asc'
      }
  }

  // actions

  public eliminar(data: Categoria){
    const  send = {
      status: true,
      dataSend:data
    }
      this.selectedChecked = this.selectedChecked.filter(objeto => objeto.id !== data.id)
       console.log(this.selectedChecked)
    this._stateService.statusDeleteTable.next(send);
  }

  public update(data:Categoria){
    const send = {
      status: true,
      dataSend:data
    }
    this._stateService.statusUpdateTable.next(send);
  }





}

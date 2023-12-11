import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit  {
  @ViewChildren('submenu') submenuItems: QueryList<ElementRef> | undefined
   constructor(){

   }
  ngAfterViewInit():void{
    if (this.submenuItems) {
      this.submenuItems.forEach(item => {
       let submenu = item.nativeElement as HTMLElement
       submenu.addEventListener('click', (e)=>{
        let brotherSubmenu = submenu.nextElementSibling;
        let icon = submenu.lastElementChild;
        brotherSubmenu?.classList.toggle('desplegar')
        icon?.classList.toggle('move')
       })
     });
    }
  }

  ngOnInit(): void {

  }

}

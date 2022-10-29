import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from './../shared/components/base.component';
import { MenuService } from './layoutServices/menu.service';

@Component({
  selector: 'peazy-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [MenuService]
})
export class LayoutComponent extends BaseComponent implements OnInit, OnDestroy {

  isMenuVisible: boolean;
  isShowLoader: boolean;

  constructor(
    injector: Injector,
    private menuDataService: MenuService
    ) {
    super(injector);
    this.isMenuVisible = true;
    this.isShowLoader = false;
  }

  ngOnInit(): void {
    this.menuDataService.toggleMenuBar.subscribe({
      next: (result: null) => {
        if (result && result !== null) {
          this.isMenuVisible = !this.isMenuVisible;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.menuDataService.toggleMenuBar.observers.forEach(x => x.complete());
  }
}

import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { Component, OnInit, AfterViewInit, OnDestroy, Injector } from '@angular/core';
import { SessionBaseComponent } from 'src/app/shared/components/session.base.component';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../layoutServices/menu.service';

@Component({
  selector: 'peazy-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent extends SessionBaseComponent implements OnInit, AfterViewInit, OnDestroy {

  isVisible: boolean;
  items: MenuItem[];

  // TODO 這個後面要放在SessionBaseComponent

  constructor(
    injector: Injector,
    private menuDataService: MenuService) {
    super(injector);
    this.isVisible = true;
    this.items = [];
  }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    if (window.innerWidth <= 667) {
      this.menuDataService.toggleMenuBar.next(true);
    }

    this.menuDataService.menuItems
      .subscribe({
        next: (menuItems: any[]) => {
          this.items = this.getVisibleMenus(menuItems, this.permssionCodes);
        }
      });
  }

  override ngAfterViewInit(): void {
    this.menuDataService.toggleMenuBar
      .subscribe({
        next: result => {
          if (result && result !== null) {
            this.isVisible = !this.isVisible;
          }
        }
      });
  }

  override ngOnDestroy(): void {
    this.menuDataService.toggleMenuBar.observers.forEach(el => el.complete());
    this.menuDataService.menuItems.observers.forEach(el => el.complete());
  }

  getVisibleMenus(targetMenus: any[], permissionCodes: any[]): MenuItem[] {
    const menuItems: MenuItem[] = [];
    for (const menu of targetMenus) {
      if (isNullOrEmpty(menu.items)) {
        if (isNullOrEmpty(menu.permissionCode) || this.permssionCodes.includes(menu.permissionCode)) {
          menuItems.push(menu);
        }
        continue;
      }
      menu.items = this.getVisibleMenus(menu.items as MenuItem[], permissionCodes);
      if (menu.items.length > 0) {
        menuItems.push(menu);
      }
    }

    return menuItems;
  }
}

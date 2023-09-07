import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouteStateService } from './route-state.service';
import { GlobalConstants } from 'src/app/core/constants/globalConstants';
import { PeazySettingService } from './peazy-setting.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class MenuService {

  public toggleMenuBar: BehaviorSubject<any>;
  public menuItems: BehaviorSubject<any[]>;

  constructor(
    private http: HttpClient,
    private peazySetting: PeazySettingService,
    private routeStateService: RouteStateService) {
    this.toggleMenuBar = new BehaviorSubject<any>(null);
    this.menuItems = new BehaviorSubject<any[]>([]);
    // TODO 之後做Menu再打開
    this.getMenuData().subscribe({
      next: (menus: any[]) => {
        const root = menus.find(x => x.nodeType === 'Root');
        const menuTree = this.convertToMenuItems(root, menus);
        const menuItems = isNullOrEmpty(menuTree) ? [] : menuTree.items as any[];
        this.menuItems.next(menuItems);
      }
    });
  }

  convertToMenuItems(node: any, menuRawData: any[]): any {
    const nodeItem: any = {
      label: this.getMenuLabelByLanguage(node, this.peazySetting.language),
      icon: GlobalConstants.menuIconMap.get(node.icon),
      routerLink: null,
      permissionCode: node.permissionCode,
      command: () => {
        this.routeStateService.clear();
      }
    };

    if (node.nodeType === 'Link') {
      nodeItem.routerLink = node.url;
    }
    else if (node.nodeType === 'Folder' || node.nodeType === 'Root') {
      nodeItem.items = [];
      const nextLayerNode = menuRawData.filter(x => x.parentNodeSeqNo === node.seqNo).sort((a, b) => Number(a.sortPriority) > Number(b.sortPriority) ? 1 : -1)
      for (const menu of nextLayerNode) {
        const item = this.convertToMenuItems(menu, menuRawData);
        if (!isNullOrEmpty(nodeItem)) {
          nodeItem.items.push(item);
        }
      }
    }
    return nodeItem;
  }

  private getMenuLabelByLanguage(menu: any, lang: string): string {
    switch (lang) {
      case 'en-us':
        return menu.nodeNameEN;
      case 'zh-tw':
        return menu.nodeNameTW;
      default:
        return '';
    }
  }

  private getMenuData(): Observable<any> {
    const url = `${environment.authUrl}/menu/fetchMenu`;
    return this.http.get<any>(url);
  }
}

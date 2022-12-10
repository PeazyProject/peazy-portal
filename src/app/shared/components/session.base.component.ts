import { AfterViewInit, Component, ElementRef, Injector, Input, OnDestroy, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { DataDetailTablePreference, DataTablePreference } from 'src/app/core/models/user-preference';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
// import { AuthenticationService, OnLogout } from 'src/app/core/services/authentication-service.service';
// import { OperationLogService } from 'src/app/core/services/operation-log.service';
import { SessionService } from 'src/app/core/services/session.service';
import { UserService } from 'src/app/core/services/user.service';
import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { BaseComponent } from './base.component';

@Component({
  template: ''
})
// OnLogout
export class SessionBaseComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy  {

  @Input() userProfile: any;
  permssionCodes: any[];
  dataScope: any;
  authenticationService: AuthenticationService;
  userService: UserService;
  private sessionService: SessionService;
  // operationLogService: OperationLogService;
  logoutEvtSubscribtion: Subscription;
  // renderer: Renderer2;
  // @ViewChildren('OperationLog') children: ElementRef[] = [];
  unlistenList: Function[] = [];

  constructor(injector: Injector) {
    super(injector);
    this.sessionService = injector.get(SessionService);
    this.authenticationService = injector.get(AuthenticationService);
    this.userService = injector.get(UserService);
    // this.operationLogService = injector.get(OperationLogService);
    // this.renderer = injector.get(Renderer2);
    this.permssionCodes = [];
    this.dataScope = {
      tenantCodes: [],
      forwarderCodes: [],
      customerCodes: [],
      dataScopes: []
    }

    this.logoutEvtSubscribtion = this.authenticationService.onLogout.subscribe(() => {
      this.onLogout.apply(this);
    });
  }

  async ngOnInit(): Promise<void> {
    this.logger.info(`${this.constructor.name}->SessionBaseComponent onInit.`);

    if (isNullOrEmpty(this.userProfile)) {
      this.userService.getUserProfile().subscribe({
        next: (result) => {
          this.userProfile = result.userProfile;
          console.log("userProfile", JSON.stringify(this.userProfile, null, "\t"));
        },
        error: () => {
          console.log("session error and logouting...");
          this.authenticationService.logout();
          this.routeStateService.navigateTo('/login');
          return Promise.resolve();
        }
      });
    }

    // // permission Codes
    // this.permssionCodes = (Object.values(this.userProfile.roles)
    //   .reduce((c: any, i: any) => c.concat(i.permissions), []) as any).map((x: any) => {
    //     return x.permissionCode;
    //   });
    // // data Scopes
    // this.dataScope.tenantCodes = (Object.values(this.userProfile.roles)
    //   .reduce((c: any, i: any) => c.concat(i.scopes), []) as any).map((x: any) => {
    //     return x.tenantCode;
    //   });
    // this.dataScope.forwarderCodes = (Object.values(this.userProfile.roles)
    //   .reduce((c: any, i: any) => c.concat(i.scopes), []) as any).map((x: any) => {
    //     return x.forwarderCode;
    //   });
    // this.dataScope.customerCodes = (Object.values(this.userProfile.roles)
    //   .reduce((c: any, i: any) => c.concat(i.scopes), []) as any).map((x: any) => {
    //     return x.customer;
    //   });
    // this.dataScope.dataScopes = (Object.values(this.userProfile.roles)
    //   .reduce((c: any, i: any) => c.concat(i.scopes), []) as any).map((x: any) => {
    //     return {
    //       tenant: x.tenantCode === '' ? null : x.tenantCode,
    //       dept: x.dept === '' ? null : x.dept,
    //       customer: x.customer === '' ? null : x.customer,
    //       orgId: x.orgId === '' ? null : x.orgId,
    //       brand: x.brand === '' ? null : x.brand,
    //       forwarder: x.forwarderCode === '' ? null : x.forwarderCode
    //     };
    //   });
  }

  ngAfterViewInit(): void {
  //   if (this.children.length > 0) {
  //     this.children.forEach((x: ElementRef) => {
  //       const unlisten = this.renderer.listen(x.nativeElement, 'click', e => {
  //         this.saveOperationLog(x.nativeElement);

  //         e.stopPropagation();
  //       });
  //       this.unlistenList.push(unlisten);
  //     });
  //   }
  }

  // saveOperationLog(html: HTMLElement): void {
  //   const saveObj = {
  //     useruuid: this.userProfile.uuid,
  //     userName: this.userProfile.userName,
  //     menuCode: window.location.pathname,
  //     operation: html.localName,
  //     operationDesc: html.innerText,
  //   };
  //   this.operationLogService.saveOperationLog(saveObj).subscribe();
  // }

  ngOnDestroy(): void {
    // this.logger.info(`${this.constructor.name}->SessionBaseComponent onDestroy.`);
    // this.logoutEvtSubscribtion.unsubscribe();
    // this.unlistenList.forEach(unlisten => {
    //   unlisten.call(this);
    // });
  }

  onLogout(): void {
    this.logger.info(`${this.constructor.name}->SessionBaseComponent onLogout.`);
  }

  // protected getDataTablePreference(key: string): DataTablePreference | null {
  //   return this.userService.preference.dataTablePreferences.find(x => x.tableName === key) ?? null;
  // }

  // protected mapToPreferenceColulmns(columns: any[], dataTablePreference: any): any[] {
  //   if (isNullOrEmpty(dataTablePreference)) {
  //     return columns;
  //   }
  //   const preference = dataTablePreference as DataTablePreference;
  //   return columns.filter(x => preference.state.columnOrder.indexOf(x.field) > -1);
  // }

  // protected mapToPreferenceDetailColulmns(columns: any[], dataDetailTablePreference: any): any[] {
  //   if (isNullOrEmpty(dataDetailTablePreference)) {
  //     return columns;
  //   }
  //   const detailPreference = dataDetailTablePreference as DataDetailTablePreference;
  //   return columns.filter(x => detailPreference.state.columnOrder.indexOf(x.field) > -1);
  // }

}

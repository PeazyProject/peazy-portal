// import { DropdownOptionsService } from 'src/app/core/services/dropdown-options.service';
import { Component, Injector, OnInit } from '@angular/core';
import { from, Observable, zip } from 'rxjs';
// import { CommonDataService } from 'src/app/core/services/common-data.service';
import { PeazyConstants } from 'src/app/core/constants/peazy-constants.constant';
import { SessionBaseComponent } from 'src/app/shared/components/session.base.component';
import { deepCopy, isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { UserRefreshToken } from 'src/app/core/models/user-refreshToken';
import { MenuService } from '../layoutServices/menu.service';

@Component({
  selector: 'peazy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends SessionBaseComponent implements OnInit {

  language: string;
  languageOptions: any[];
  userName: string;
  email: string;

  constructor(
    injector: Injector,
    private menuService: MenuService,
    // TODO 下面這兩個要再開啟
    // private dropdownOptionsService: DropdownOptionsService,
    // private commonDataService: CommonDataService
    ) {
    super(injector);
    this.language = '';
    this.userName = '';
    this.email = '';
    this.languageOptions = [
      { label: 'English', value: 'en-us' },
      { label: '中文(繁體)', value: 'zh-tw' }
    ];
  }

  // TODO 下面這邊要再繼續往下做

  override async ngOnInit(): Promise<void> {
    try {
      await super.ngOnInit();
      this.userName = this.userProfile.name;
      this.email = this.userProfile.email;
      this.language = this.peazySetting.language;
      this.translateService.use(this.language);

      // this.initCacheData(this.language);
      const userRefreshToken: UserRefreshToken = {
        language: this.peazySetting.language
      }
      // TODO之後開啟
      // this.authenticationService.refreshTokenBy(userRefreshToken);
    } catch (err) {
      console.log('baseSession Error');
    }
  }

  toggleSideMenu(): void {
    this.menuService.toggleMenuBar.next(true);
  }

  // languageChange(event: any): void {
  //   this.peazySetting.language = this.language;
  //   const userRefreshToken: UserRefreshToken = {
  //     language: this.peazySetting.language
  //   }
  //   this.authenticationService.refreshTokenBy(userRefreshToken).then(() => {
  //     location.reload()
  //   })
  // }

  logout(): void {
    this.authenticationService.logout();
    window.location.reload();
  }

  // private initCacheData(language: string): Observable<any> {
  //   const promise = new Promise<void>((resolve, reject) => {
  //     const tasks = [
  //       this.commonDataService.getCodeConverter(language, 'DropdownList'),
  //       this.commonDataService.getErrorCodes(language)
  //     ];
  //     zip(...tasks).subscribe({
  //       next: results => {
  //         const options = results[0] as any[];
  //         const optionGroup = options.groupBy(x => x.subCategory);
  //         this.cacheService.save(PeazyConstants.dropdownListKey, optionGroup);

  //         const errorCodes = results[1] as any[];
  //         const errorCodeGroup = errorCodes.groupBy(x => x.category);
  //         this.cacheService.save(PeazyConstants.errorCodeListKey, errorCodeGroup);

  //         resolve();
  //       },
  //       error: err => reject(err)
  //     });
  //   });
  //   return from(promise);
  // }
}

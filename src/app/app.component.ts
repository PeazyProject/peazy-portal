import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoaderService } from './layout/layoutServices/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'peazy-portal';
  isShowLoader: boolean;

  constructor(
    private primengConfig: PrimeNGConfig,
    private loader: LoaderService) {
    this.primengConfig.ripple = true;
    this.isShowLoader = false;
  }

  ngOnInit(): void {
    console.info('AppComponent init.');
    this.loader.status.subscribe((val: boolean) => {
      this.isShowLoader = val;
    });
  }

}

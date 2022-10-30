import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrEmpty } from 'src/app/core/utils/common-functions';

@Component({
  selector: 'main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.scss']
})
export class MainProductComponent implements OnInit {

  isSearchFormOpen: boolean = false;
  searchForm: FormGroup;
  searchParams: any;
  isLoading: boolean = false;
  searchResults: any[] = [];
  displayMode: string = "DETAIL";

  constructor(
    private fb: FormBuilder
  ) {
    this.searchParams = {
      productNameList: [],
      skuList: [],
      inStock: []
    };

    this.searchForm = this.fb.group({
      productNameList: [],
      skuList: [],
      inStock: []
    });

  }

  ngOnInit(): void {


  }

  accordionTabOpen(): void {
    this.isSearchFormOpen = true;
  }

  chipsAdd(event: any, fromControlName: any): void {
    const value: string = event.value;
    const parsedValues: string[] = value.split('\r\n').filter(x => isNullOrEmpty(x) === false && x !== '\r\n');
    const formControl = this.searchForm.get(fromControlName);
    formControl?.value.splice(formControl?.value.indexOf(value));
    formControl?.setValue(formControl?.value.concat(parsedValues));
  }

  resetBtnClick() {
    this.searchForm.reset();
  }

  searchBtnClick(): void {

    this.isLoading = true;
    this.isSearchFormOpen = false;
    this.searchResults = [];
    this.isLoading = false

  }

  insertProduct(): void {

  }

  changeDisplayModeToPic(): void {
    this.displayMode = "PIC";
  }

  changeDisplayModeToDetail(): void {
    this.displayMode = "DETAIL";
  }

}

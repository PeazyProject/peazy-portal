import {Component} from '@angular/core';
import { Product } from './product';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ProductService } from './main-product-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrEmpty } from 'src/app/core/utils/common-functions';

@Component({
  selector: 'main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.scss']
})
export class MainProductComponent {
[x: string]: any;
    products: Product[] = [];
    sortOptions: SelectItem[] = [];
    sortOrder!: number;
    sortField!: string;

    isSearchFormOpen: boolean = false;
    searchForm: FormGroup;
    searchParams: any;
    isLoading: boolean = false;
    searchResults: any[] = [];

    constructor(
      private productService: ProductService,
      private primengConfig: PrimeNGConfig,
      private fb: FormBuilder) {
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

    ngOnInit() {
      this.products =  this.productService.getProducts();

        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];

        this.primengConfig.ripple = true;
    }

    onSortChange(event: { value: any; }) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
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

    accordionTabOpen(): void {
      this.isSearchFormOpen = true;
    }

}

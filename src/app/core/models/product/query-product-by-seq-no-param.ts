import { ProductColorSizeBean } from "./product-color-size-bean";

export interface QueryProductBySeqNoParam {
  productName: string;
  skuList: any[];
  mpnList: any[];
  sizeList: any[];
  colorList: any[];
  cost: Number;
  price: Number;
  category: string;
  productStatus: string;
  productDesc: string;
  mainPic: string;
  picList: any[];
  productColorSizeList: ProductColorSizeBean[];

}

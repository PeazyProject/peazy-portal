import { ProductColorSizeBean } from "./product-color-size-bean";

export interface QueryProductBySeqNoParam {
  productSeqNo: string;
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
  mainPicSnCode: any;
  picSnCodeList: any[];
  productColorSizeList: ProductColorSizeBean[];
  userId: String;
  vendorSeqNo: String;
}

import { Long } from 'typeorm';

export interface SupplierProduct {
  productSeqNo: Long | null;
  productName: String | null;
  snCode: String | null;
  cost: number | null;
  price: number | null;
  productDesc: String | null;
  category: String | null;
  sku: String | null;
  colorSeqNo: Long | null;
  color: String | null;
  createDt: Date | null;
  productStatus: String | null;
  sizeSeqNo: Long | null;
  size: String | null;
  pcsmSeqNo: Long | null;
  vendorSeqNo: Long | null;
  vendor: String | null;
  notOrderCnt: number | null;
  orderedCnt: number | null;
  checkOrderCnt: number | null;
  allocatedCnt: number | null;
  readyDeliveryCnt: number | null;
  finishCnt: number | null;
}

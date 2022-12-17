import { Long } from 'typeorm';

export class SupplierProduct {
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

  constructor() {
    this.productSeqNo = null;
    this.productName = null;
    this.snCode = null;
    this.cost = null;
    this.price = null;
    this.productDesc = null;
    this.category = null;
    this.sku = null;
    this.colorSeqNo = null;
    this.color = null;
    this.createDt = null;
    this.productStatus = null;
    this.sizeSeqNo = null;
    this.size = null;
    this.pcsmSeqNo = null;
    this.vendorSeqNo = null;
    this.vendor = null;
    this.notOrderCnt = null;
    this.orderedCnt = null;
    this.checkOrderCnt = null;
    this.allocatedCnt = null;
    this.readyDeliveryCnt = null;
    this.finishCnt = null;
  }
}

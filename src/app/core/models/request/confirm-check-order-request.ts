import { SupplierProduct } from '../common/supplier-product';

export interface ConfirmCheckOrderRequest {
  supplierProductViewList: SupplierProduct[] | null;
  userId: String | null;
}

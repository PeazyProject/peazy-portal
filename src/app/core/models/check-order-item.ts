import { ColorSizeModel } from './product/color-size-model';

export interface checkOrderItem {
  productName: string | null;
  sku: string | null;
  color: string | null;
  size: string | null;
  qty: number | 0;
}

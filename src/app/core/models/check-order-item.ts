import { ColorSizeModel } from "./product/color-size-model";

export interface checkOrderItem {
    productName: string | null;
    sku: string | null;
    colorSizeModelList: ColorSizeModel[] | null;
}
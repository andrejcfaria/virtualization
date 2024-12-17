export interface SavePurchases {
  save : (purchases:Array<SavePurchasesParams>) =>  Promise<void>

}

export type SavePurchasesParams = {
  id: string;
  date: Date;
  value: number;
};
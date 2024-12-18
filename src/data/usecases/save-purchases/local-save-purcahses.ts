import { CacheStore } from "@/data/protocols/cache"
import { SavePurchases, SavePurchasesParams } from "@/domain/usecases/";

 export class LocalSavePurchases  implements SavePurchases{
  constructor(
    private readonly cacheStore:CacheStore,
     private timeStamp: Date
    ){}

  async save (purchases: Array<SavePurchasesParams>):Promise<void> {
    this.timeStamp = this.timeStamp
    this.cacheStore.replace('purchases', {
      timeStamp: this.timeStamp,
      value: purchases
    })

  }
 }
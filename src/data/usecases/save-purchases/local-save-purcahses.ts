import { CacheStore } from "@/data/protocols/cache"
import { SavePurchases, SavePurchasesParams } from "@/domain/usecases/save-purchases";

 export class LocalSavePurchases  implements SavePurchases{
  constructor(private readonly cacheStore:CacheStore) {}

  async save (purchases: Array<SavePurchasesParams>):Promise<void> {
    this.cacheStore.delete("purchases");
    this.cacheStore.insert("purchases",purchases)
  }
 }
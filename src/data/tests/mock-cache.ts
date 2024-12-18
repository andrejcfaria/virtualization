import { CacheStore } from '@/data/protocols/cache';
import { SavePurchasesParams } from "@/domain/usecases"



export class CacheStoreSpy implements CacheStore {
  actions: Array<CacheStoreAction> = []
  deleteKey:string = ""
  insertKey:string = ""
  insertValues : Array<SavePurchasesParams> = []

  delete (key:string) :void {
    this.deleteKey = key;
    this.actions.push(CacheStoreAction.delete)
  }


  insert (key:string, value: any) : void {
    this.insertKey = key
    this.insertValues = value;
    this.actions.push(CacheStoreAction.insert)

}


simulateDeleteError () : void {
     jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {
    this.actions.push(CacheStoreAction.delete)  
      throw new Error()
    })
}

simulateInsertError () : void
 {
  jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(()=>{
    this.actions.push(CacheStoreAction.insert)  
        throw new Error()})
 }  

}

export enum CacheStoreAction {
  delete,
  insert
}

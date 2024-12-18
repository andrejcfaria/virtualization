import { CacheStore } from '@/data/protocols/cache';
import { SavePurchasesParams } from "@/domain/usecases"



export class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0
  insertCallsCount = 0
  deleteKey:string = ""
  insertKey:string = ""
  InsertValues : Array<SavePurchasesParams> = []

  delete (key:string) :void {
    this.deleteCallsCount++
    this.deleteKey = key;
  }


  insert (key:string, value: any) : void {
    this.insertCallsCount++
    this.insertKey = key
    this.InsertValues = value;
}


simulateDeleteError () : void {
     jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {throw new Error()})
}

simulateInsertError () : void
 {
  jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(()=>{throw new Error()})
 }  }
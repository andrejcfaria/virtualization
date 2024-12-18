import { CacheStore } from '@/data/protocols/cache';
import { SavePurchasesParams } from "@/domain/usecases"



export class CacheStoreSpy implements CacheStore {
  messages: Array<CacheStoreMessage> = []

  deleteKey:string = ""
  insertKey:string = ""
  InsertValues : Array<SavePurchasesParams> = []

  delete (key:string) :void {
    this.deleteKey = key;
    this.messages.push(CacheStoreMessage.delete)
  }


  insert (key:string, value: any) : void {
    this.insertKey = key
    this.InsertValues = value;
    this.messages.push(CacheStoreMessage.insert)

}


simulateDeleteError () : void {
     jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {
    this.messages.push(CacheStoreMessage.delete)  
      throw new Error()
    })
}

simulateInsertError () : void
 {
  jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(()=>{
    this.messages.push(CacheStoreMessage.insert)  
        throw new Error()})
 }  

}

export enum CacheStoreMessage {
  delete,
  insert
}

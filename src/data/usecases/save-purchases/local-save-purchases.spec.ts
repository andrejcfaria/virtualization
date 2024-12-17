import { Insert } from './../../../../node_modules/@sinclair/typebox/value/delta.d';
import { CacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "./local-save-purcahses";
import {  SavePurchasesParams } from "@/domain/usecases/save-purchases";


describe('LocalSave', () => {
  test("Should not delete cache on init", () => {
const { cacheStore} = makeSut()
    expect(cacheStore.deleteCallsCount).toBe(0);
  })
  test("Should  delete old cache on save",async () => {
const {sut, cacheStore} = makeSut()
    const purchases = mockPurchases()

    await  sut.save(purchases);
    expect(cacheStore.deleteCallsCount).toBe(1);
  })
  test("Should call  delete with correct key",async () => {
    const {sut, cacheStore} = makeSut()
    const purchases = mockPurchases()

    await  sut.save(purchases);
    expect(cacheStore.deleteKey).toBe("purchases");
  })

  test("Should not insert new cache if delete fails",  () => {
    const {sut, cacheStore} = makeSut()
    cacheStore.simulateDeleteError()
    const purchases = mockPurchases()
    const promise = sut.save(purchases);
    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  })

  test("Should not insert new cache if delete fails",  async () => {
    const {sut, cacheStore} = makeSut()
    const purchases = mockPurchases()

    await sut.save(purchases);
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertCallsCount).toBe(1);
  })

  test("Should insertnew Cache if delete succeeds",  async () => {
    const {sut, cacheStore} = makeSut();
    const purchases = mockPurchases()
    await sut.save(purchases);
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertCallsCount).toBe(1);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.InsertValues).toEqual(purchases)
  })

    test("Should throw if insert throw",  () => {
    const {sut, cacheStore} = makeSut()
    cacheStore.simulateInsertError()
    const purchases = mockPurchases()
    const promise = sut.save(purchases);
    expect(promise).rejects.toThrow();
  })


 })


  class CacheStoreSpy implements CacheStore {
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

type SutTypes = {
  sut : LocalSavePurchases,
  cacheStore: CacheStoreSpy,
}
 const makeSut = ( ):SutTypes => {
      const cacheStore = new CacheStoreSpy()
    const sut = new LocalSavePurchases(cacheStore);

  return {
    cacheStore, sut
  }
 }

 const mockPurchases = () : Array<SavePurchasesParams> => [{
  id: '1',
  date: new Date(),
  value: 50
 },
{
  id: '2',
  date: new Date(),
  value: 510
 }]
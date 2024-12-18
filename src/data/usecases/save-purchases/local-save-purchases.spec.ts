import { mockPurchases , CacheStoreSpy, CacheStoreMessage} from "@/data/tests";
import { LocalSavePurchases } from "@/data/usecases"
import { timeStamp } from "console";


describe('LocalSave', () => {
  test("Should not delete or insert cache on init", () => {
const { cacheStore} = makeSut()
    expect(cacheStore.messages).toEqual([]);
  })


  test("Should not insert new cache if delete fails",  async () => {
    const {sut, cacheStore} = makeSut()
    cacheStore.simulateDeleteError()
    const promise =  sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([CacheStoreMessage.delete]);
    expect(promise).rejects.toThrow();
  })

  test("Should not insert new cache if delete fails",  async () => {
    const {sut, cacheStore} = makeSut()
    await sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([CacheStoreMessage.delete, CacheStoreMessage.insert]);

  })

  test("Should insert  new Cache if delete succeeds",  async () => {
    const timeStamp = new Date()
    const {sut, cacheStore} = makeSut(timeStamp);
    const purchases = mockPurchases()
    const promise =  sut.save(purchases);
    expect(cacheStore.messages).toEqual([CacheStoreMessage.delete, CacheStoreMessage.insert])
    expect(cacheStore.deleteKey).toBe("purchases");
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual({
      timeStamp,
      value: purchases
    })
    await expect(promise).resolves.toBeFalsy()
  })

    test("Should throw if insert throw",  () => {
    const {sut, cacheStore} = makeSut()
    cacheStore.simulateInsertError()
    const purchases = mockPurchases()
    const promise = sut.save(purchases);
    expect(promise).rejects.toThrow();
  })


 })


  

type SutTypes = {
  sut : LocalSavePurchases,
  cacheStore: CacheStoreSpy,
}
 const makeSut = ( timeStamp = new Date()):SutTypes => {
      const cacheStore = new CacheStoreSpy()
    const sut = new LocalSavePurchases(cacheStore, timeStamp);

  return {
    cacheStore, sut
  }
 }


import { mockPurchases , CacheStoreSpy} from "@/data/tests";
import { LocalSavePurchases } from "@/data/usecases"


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


describe('LocalSave', () => {
  test("Should not delete cache on init", () => {
    const cacheStore = new CacheStoreSpy()
    const sut = new LocalSavePurchases(cacheStore);
    expect(cacheStore.deleteCallsCount).toBe(0);
  })
 })


 class LocalSavePurchases {
  constructor(private readonly cacheStore:CacheStore) {}
 }



  interface CacheStore {
 }

  class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
 }
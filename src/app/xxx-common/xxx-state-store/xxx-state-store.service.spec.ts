import {TestBed} from '@angular/core/testing';

import {XxxStateStoreService} from './xxx-state-store.service';

describe('XxxStateStoreService', () => {
  let spyDeleteAll: jasmine.Spy;
  let spyDeleteItem: jasmine.Spy;
  let spyExtractItem: jasmine.Spy;
  let spyGetItem: jasmine.Spy;
  let spyPutItem: jasmine.Spy;
  let xxxStateStoreService: XxxStateStoreService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [XxxStateStoreService]
  }));

  beforeEach(() => {
    xxxStateStoreService = TestBed.get(XxxStateStoreService);
  });

  beforeEach(() => {
    spyDeleteAll = spyOn(xxxStateStoreService, 'deleteAll').and.callThrough();
    spyDeleteItem = spyOn(xxxStateStoreService, 'deleteItem').and.callThrough();
    spyExtractItem = spyOn(xxxStateStoreService, 'extractItem').and.callThrough();
    spyGetItem = spyOn(xxxStateStoreService, 'getItem').and.callThrough();
    spyPutItem = spyOn(xxxStateStoreService, 'putItem').and.callThrough();
  });

  afterEach(() => {
    xxxStateStoreService.deleteAll();
  });

  it('should be created', () => {
    expect(xxxStateStoreService).toBeDefined();
  });

  it('should run putItem', () => {
    const key = 'key1';
    const value = 'value 1';
    xxxStateStoreService.putItem(key, value);
    expect(spyPutItem).toHaveBeenCalled();
  });

  it('should run getItem', () => {
    const key = 'key2';
    xxxStateStoreService.getItem(key);
    expect(spyGetItem).toHaveBeenCalled();
  });

  it('should be getItem will return undefined if no item with key exists', () => {
    const key = 'badKey';
    let result: any;
    result = xxxStateStoreService.getItem(key);
    expect(result).toBeUndefined();
  });

  it('should be getItem will return value stored by putItem', () => {
    const key = 'key3';
    const value = 'value 3';
    xxxStateStoreService.putItem(key, value);
    let result: any;
    result = xxxStateStoreService.getItem(key);
    expect(result).toBe(value);
  });

  it('should be putItem will overwrite value stored by putItem with same key', () => {
    const key = 'key4';
    let value: any;
    value = 'value 4';
    let result: any;
    xxxStateStoreService.putItem(key, value);
    result = xxxStateStoreService.getItem(key);
    expect(result).toBe(value);
    value = 'value 4a';
    xxxStateStoreService.putItem(key, value);
    result = xxxStateStoreService.getItem(key);
    expect(result).toBe(value);
  });

  it('should be getItem will return value stored by putItem when value is string', () => {
    const key = 'key5';
    const value = 'value 5';
    let result: any;
    xxxStateStoreService.putItem(key, value);
    result = xxxStateStoreService.getItem(key);
    expect(result).toBe(value);
  });

  it('should be getItem will return value stored by putItem when value is number', () => {
    const key = 'key6';
    const value = '123.45';
    let result: any;
    xxxStateStoreService.putItem(key, value);
    result = xxxStateStoreService.getItem(key);
    expect(result).toBe(value);
  });

  it('should be getItem will return value stored by putItem when value is boolean', () => {
    const key = 'key7';
    const value = true;
    let result: any;
    xxxStateStoreService.putItem(key, value);
    result = xxxStateStoreService.getItem(key);
    expect(result).toBe(value);
  });

  it('should be getItem will return value stored by putItem when value is number', () => {
    const key = 'key8';
    const value = '123.45';
    let result: any;
    xxxStateStoreService.putItem(key, value);
    result = xxxStateStoreService.getItem(key);
    expect(result).toBe(value);
  });

  it('should be getItem will return value stored by putItem when value is array', () => {
    const key = 'key9';
    const value = [1, 2];
    let result: any;
    xxxStateStoreService.putItem(key, value);
    result = xxxStateStoreService.getItem(key);
    expect(result).toBe(value);
  });

  it('should be getItem will return value stored by putItem when value is object', () => {
    const key = 'key10';
    const value = {one: 1, two: 'two'};
    let result: any;
    xxxStateStoreService.putItem(key, value);
    result = xxxStateStoreService.getItem(key);
    expect(result).toBe(value);
  });

  it('should run deleteItem', () => {
    const key = 'key11';
    xxxStateStoreService.deleteItem(key);
    expect(spyDeleteItem).toHaveBeenCalled();
  });

  it('should be after running deleteItem then get same item will return undefined', () => {
    const key = 'key12';
    let result: any;
    xxxStateStoreService.deleteItem(key);
    result = xxxStateStoreService.getItem(key);
    expect(result).toBeUndefined();
  });

  it('should be after running deleteItem then get other item will return stored value', () => {
    let result: any;
    const key1 = 'key13';
    const value1 = 'value 13';
    const key2 = 'key14';
    const value2 = 'value 14';
    xxxStateStoreService.putItem(key1, value1);
    xxxStateStoreService.putItem(key2, value2);
    xxxStateStoreService.deleteItem(key1);
    result = xxxStateStoreService.getItem(key2);
    expect(result).toBe(value2);
  });

  it('should run extractItem', () => {
    const key = 'key15';
    let result: any;
    result = xxxStateStoreService.extractItem(key);
    expect(spyExtractItem).toHaveBeenCalled();
  });

  it('should be extractItem will return value stored by putItem and then delete it', () => {
    const key = 'key16';
    const value = 'value 16';
    let result: any;
    xxxStateStoreService.putItem(key, value);
    result = xxxStateStoreService.extractItem(key);
    expect(result).toBe(value);
    result = xxxStateStoreService.getItem(key);
    expect(result).toBeUndefined();
  });

  it('should run deleteAll', () => {
    xxxStateStoreService.deleteAll();
    expect(spyDeleteAll).toHaveBeenCalled();
  });

  it('should be after running deleteAll then get will always return undefined', () => {
    let result: any;
    const key1 = 'key17';
    const value1 = 'value 17';
    const key2 = 'key18';
    const value2 = 'value 18';
    xxxStateStoreService.putItem(key1, value1);
    xxxStateStoreService.putItem(key2, value2);
    xxxStateStoreService.deleteAll();
    result = xxxStateStoreService.getItem(key1);
    expect(result).toBeUndefined();
    result = xxxStateStoreService.getItem(key2);
    expect(result).toBeUndefined();
  });
});

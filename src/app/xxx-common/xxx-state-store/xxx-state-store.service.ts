import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class XxxStateStoreService {
  private savedItems: any = {};

  /**
   * Delete all items. Clears the state store.
   */
  deleteAll(): void {
    this.savedItems = {};
  }

  /**
   * Delete data item.
   * @param key: unique id for item
   */
  deleteItem(key: string): void {
    if (this.savedItems[key]) {
      delete this.savedItems[key];
    }
  }

  /**
   * Get data item and then delete it. For a single use of store and retrieve.
   * @param key: unique id for item
   */
  extractItem(key: string): any {
    const result = this.savedItems[key];
    if (result) {
      this.deleteItem(key);
    }
    return result;
  }

  /**
   * Get data item. Allows multiple retrieves after put.
   * @param key: unique id for item
   */
  getItem(key: string): any {
    return this.savedItems[key];
  }

  /**
   * Store data item.
   * @param key: unique id for item
   * @param value: data to be stored
   */
  putItem(key: string, value: any): void {
    this.savedItems[key] = value;
  }
}

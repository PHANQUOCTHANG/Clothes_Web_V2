/**
 * Service xử lý lưu trữ giỏ hàng (localStorage/sessionStorage)
 */
export interface StorageOptions {
  type?: "local" | "session";
  expiryTime?: number; // milliseconds
}

export class CartStorageService {
  private static readonly DEFAULT_KEY = "cart_items";
  private static readonly EXPIRY_KEY = "cart_expiry";

  /**
   * Save items to storage
   */
  static saveItems<T>(
    items: T[],
    key: string = this.DEFAULT_KEY,
    options: StorageOptions = {}
  ): boolean {
    try {
      const storage = this.getStorage(options.type);
      if (!storage) return false;

      const dataToStore = {
        items,
        timestamp: Date.now(),
        expiryTime: options.expiryTime,
      };

      storage.setItem(key, JSON.stringify(dataToStore));
      return true;
    } catch (error) {
      console.error("Failed to save items:", error);
      return false;
    }
  }

  /**
   * Load items from storage
   */
  static loadItems<T>(
    key: string = this.DEFAULT_KEY,
    options: StorageOptions = {}
  ): T[] | null {
    try {
      const storage = this.getStorage(options.type);
      if (!storage) return null;

      const data = storage.getItem(key);
      if (!data) return null;

      const parsed = JSON.parse(data);

      // Check if expired
      if (parsed.expiryTime) {
        const now = Date.now();
        const savedAt = parsed.timestamp;
        if (now - savedAt > parsed.expiryTime) {
          storage.removeItem(key);
          return null;
        }
      }

      return parsed.items;
    } catch (error) {
      console.error("Failed to load items:", error);
      return null;
    }
  }

  /**
   * Clear storage
   */
  static clearStorage(
    key: string = this.DEFAULT_KEY,
    options: StorageOptions = {}
  ): boolean {
    try {
      const storage = this.getStorage(options.type);
      if (!storage) return false;

      storage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Failed to clear storage:", error);
      return false;
    }
  }

  /**
   * Check if item exists in storage
   */
  static hasItems(
    key: string = this.DEFAULT_KEY,
    options: StorageOptions = {}
  ): boolean {
    try {
      const storage = this.getStorage(options.type);
      if (!storage) return false;

      const data = storage.getItem(key);
      if (!data) return false;

      // Check expiry
      const parsed = JSON.parse(data);
      if (parsed.expiryTime) {
        const now = Date.now();
        const savedAt = parsed.timestamp;
        return now - savedAt <= parsed.expiryTime;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get storage size
   */
  static getStorageSize(options: StorageOptions = {}): number {
    try {
      const storage = this.getStorage(options.type);
      if (!storage) return 0;

      let size = 0;
      for (let key in storage) {
        if (storage.hasOwnProperty(key)) {
          size += storage[key].length + key.length;
        }
      }
      return size; // approximate size in bytes
    } catch {
      return 0;
    }
  }

  /**
   * Backup cart to file
   */
  static backupToFile<T>(
    items: T[],
    filename: string = "cart-backup.json"
  ): void {
    try {
      const dataStr = JSON.stringify(items, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to backup cart:", error);
    }
  }

  /**
   * Restore cart from file
   */
  static async restoreFromFile<T>(): Promise<T[] | null> {
    return new Promise((resolve) => {
      try {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = (e: any) => {
          const file = e.target.files[0];
          if (!file) {
            resolve(null);
            return;
          }

          const reader = new FileReader();
          reader.onload = (event: any) => {
            try {
              const items = JSON.parse(event.target.result);
              resolve(items);
            } catch {
              resolve(null);
            }
          };
          reader.readAsText(file);
        };
        input.click();
      } catch (error) {
        console.error("Failed to restore cart:", error);
        resolve(null);
      }
    });
  }

  /**
   * Get storage instance
   */
  private static getStorage(
    type: "local" | "session" = "local"
  ): Storage | null {
    try {
      if (typeof window === "undefined") return null;

      if (type === "session") {
        return window.sessionStorage;
      }
      return window.localStorage;
    } catch {
      return null;
    }
  }

  /**
   * Sync storage across tabs
   */
  static syncCartAcrossTabs<T>(
    key: string = this.DEFAULT_KEY,
    onUpdate: (items: T[]) => void
  ): () => void {
    if (typeof window === "undefined") return () => {};

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          onUpdate(parsed.items);
        } catch (error) {
          console.error("Failed to sync cart:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Return cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }
}

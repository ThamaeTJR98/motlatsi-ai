
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { GradeRecord, ScheduleSlot, UserState } from '../types';

interface MotlatsiDB extends DBSchema {
  system: {
    key: string;
    value: any;
  };
  activity_logs: {
    key: string;
    value: GradeRecord;
    indexes: { 'by-date': string };
  };
  schedule: {
    key: string;
    value: ScheduleSlot;
  };
  sync_queue: {
    key: number;
    value: { type: string; payload: any; timestamp: number; retries: number };
    autoIncrement: true;
  };
  assets: {
    key: string;
    value: { blob: Blob; mimeType: string; timestamp: number };
  };
}

const DB_NAME = 'motlatsi_db';
const DB_VERSION = 1;

class OfflineStorageService {
  private dbPromise: Promise<IDBPDatabase<MotlatsiDB>>;

  constructor() {
    this.dbPromise = openDB<MotlatsiDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // System store for random key-values (settings, user profile cache)
        if (!db.objectStoreNames.contains('system')) {
          db.createObjectStore('system');
        }
        
        // Activity Logs (Quiz results, etc)
        if (!db.objectStoreNames.contains('activity_logs')) {
          const store = db.createObjectStore('activity_logs', { keyPath: 'id' });
          store.createIndex('by-date', 'date');
        }

        // Schedule
        if (!db.objectStoreNames.contains('schedule')) {
          db.createObjectStore('schedule', { keyPath: 'id' });
        }

        // Sync Queue (The Outbox)
        if (!db.objectStoreNames.contains('sync_queue')) {
          db.createObjectStore('sync_queue', { keyPath: 'key', autoIncrement: true });
        }

        // Assets (Images/Audio blobs)
        if (!db.objectStoreNames.contains('assets')) {
          db.createObjectStore('assets');
        }
      },
    });
  }

  // --- System/User ---
  async saveUser(user: UserState) {
    return (await this.dbPromise).put('system', user, 'user_profile');
  }

  async getUser(): Promise<UserState | undefined> {
    return (await this.dbPromise).get('system', 'user_profile');
  }

  // --- Activity Logs ---
  async logActivity(record: GradeRecord) {
    const db = await this.dbPromise;
    await db.put('activity_logs', record);
    // Add to sync queue automatically
    await this.addToSyncQueue('LOG_ACTIVITY', record);
  }

  async getRecentActivity(limit = 50): Promise<GradeRecord[]> {
    const db = await this.dbPromise;
    const all = await db.getAllFromIndex('activity_logs', 'by-date');
    return all.reverse().slice(0, limit);
  }

  // --- Schedule ---
  async saveSchedule(slots: ScheduleSlot[]) {
    const db = await this.dbPromise;
    const tx = db.transaction('schedule', 'readwrite');
    // Clear old schedule first (simple strategy)
    await tx.store.clear();
    await Promise.all(slots.map(slot => tx.store.put(slot)));
    await tx.done;
  }

  async getSchedule(): Promise<ScheduleSlot[]> {
    return (await this.dbPromise).getAll('schedule');
  }

  // --- Sync Queue (The "Outbox") ---
  async addToSyncQueue(type: string, payload: any) {
    const item = { type, payload, timestamp: Date.now(), retries: 0 };
    return (await this.dbPromise).add('sync_queue', item);
  }

  async getSyncQueue() {
    const db = await this.dbPromise;
    const tx = db.transaction('sync_queue', 'readonly');
    const store = tx.objectStore('sync_queue');
    const items = [];
    let cursor = await store.openCursor();
    while (cursor) {
      items.push({ ...cursor.value, key: cursor.key });
      cursor = await cursor.continue();
    }
    return items;
  }

  async removeFromQueue(key: number) {
    return (await this.dbPromise).delete('sync_queue', key);
  }

  // --- Assets (The "Cache") ---
  async saveAsset(id: string, blob: Blob) {
    return (await this.dbPromise).put('assets', { 
        blob, 
        mimeType: blob.type, 
        timestamp: Date.now() 
    }, id);
  }

  async getAsset(id: string): Promise<string | null> {
    const entry = await (await this.dbPromise).get('assets', id);
    if (!entry) return null;
    return URL.createObjectURL(entry.blob);
  }
}

export const OfflineDB = new OfflineStorageService();

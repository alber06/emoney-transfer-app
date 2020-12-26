import SyncStorage from 'sync-storage'

export const setItem = (name, data) => SyncStorage.set(name, data)

export const getItem = (name) => SyncStorage.get(name)

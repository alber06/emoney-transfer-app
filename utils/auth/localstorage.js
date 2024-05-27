import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = (name, data) => AsyncStorage.setItem(name, JSON.stringify(data))

export const getItem = async (name) => {
  const item = await AsyncStorage.getItem(name)
  return JSON.parse(item)
}

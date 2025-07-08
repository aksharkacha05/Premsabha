import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'PREMSABHA_USER';

export const storeUserSession = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    // handle error
    console.error('Failed to store user session', e);
  }
};

export const getUserSession = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    // handle error
    console.error('Failed to get user session', e);
    return null;
  }
};

export const removeUserSession = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (e) {
    // handle error
    console.error('Failed to remove user session', e);
  }
}; 
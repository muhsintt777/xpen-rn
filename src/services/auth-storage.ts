import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthStorage {
  private static readonly refreshTokenKey = 'refresh_token';

  public static async getRefreshToken(): Promise<string> {
    const res = await AsyncStorage.getItem(this.refreshTokenKey);
    if (!res) throw new Error('No refresh token is available');
    return res;
  }

  public static async setRefreshToken(refreshToken: string): Promise<void> {
    await AsyncStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  public static async clearTokens(): Promise<void> {
    await AsyncStorage.removeItem(this.refreshTokenKey);
  }
}

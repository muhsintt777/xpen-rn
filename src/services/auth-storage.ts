import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthStorage {
  private static readonly accessTokenKey = 'access_token';
  private static readonly refreshTokenKey = 'refresh_token';

  public static async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem(this.accessTokenKey);
  }

  public static async getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem(this.refreshTokenKey);
  }

  public static async setAccessToken(accessToken: string): Promise<void> {
    await AsyncStorage.setItem(this.accessTokenKey, accessToken);
  }

  public static async setRefreshToken(refreshToken: string): Promise<void> {
    await AsyncStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  public static async clearTokens(): Promise<void> {
    await AsyncStorage.removeMany([this.accessTokenKey, this.refreshTokenKey]);
  }
}

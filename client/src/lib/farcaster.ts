import { sdk } from '@farcaster/miniapp-sdk';

export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  bio: string;
}

export class FarcasterService {
  private isReady = false;

  async initialize(): Promise<void> {
    try {
      // Initialize the Farcaster SDK
      await sdk.actions.ready();
      this.isReady = true;
      console.log('Farcaster SDK initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Farcaster SDK:', error);
      throw error;
    }
  }

  async signIn(): Promise<FarcasterUser | null> {
    if (!this.isReady) {
      await this.initialize();
    }

    try {
      // Generate a nonce for sign-in
      const nonce = Math.random().toString(36);
      const result = await sdk.actions.signIn({ nonce });
      
      if (result && sdk.context.user) {
        return {
          fid: sdk.context.user.fid,
          username: sdk.context.user.username,
          displayName: sdk.context.user.displayName,
          pfpUrl: sdk.context.user.pfpUrl,
          bio: sdk.context.user.bio || '',
        };
      }
      return null;
    } catch (error) {
      console.error('Farcaster sign-in failed:', error);
      return null;
    }
  }

  getContext() {
    return {
      user: sdk.context.user,
      location: sdk.context.location,
      client: sdk.context.client,
    };
  }

  isInitialized(): boolean {
    return this.isReady;
  }
}

export const farcasterService = new FarcasterService();
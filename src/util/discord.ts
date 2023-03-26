export interface DiscordToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface DiscordProfile {
  id: string;
  username: string;
  global_name: null;
  display_name: null;
  avatar: string;
  avatar_decoration: null;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  banner_color: null;
  accent_color: null;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  email: string;
  verified: boolean;
  image_url: string;
}

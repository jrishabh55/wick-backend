declare module '@ioc:Adonis/Core/Env' {
  type EnvVariables = 'PORT' | 'HOST' | 'NODE_ENV' | 'APP_KEY' |
  'SPOTIFY_CLIENT_ID' | 'SPOTIFY_CLIENT_SECRET' | 'DB_CONNECTION' |
  'DB_HOST' | 'DB_USER' | 'DB_PASSWORD' | 'DB_NAME' | 'APP_FRONTEND'

  export interface EnvContract {
    process(envString: string, overwrite?: boolean): void;
    parse(
      envString: EnvVariables
    ): {
      [key: string]: string;
    };
    get(key: EnvVariables, defaultValue?: any): string | boolean | null | undefined;
    getOrFail(key: EnvVariables): string | boolean;
    set(key: EnvVariables, value: string): void;
  }
}

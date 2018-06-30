
export enum Language {
  en = 'en',
  de = 'de',
}

export enum DockerHealth {
  UNKNOWN,
  HEALTHY,
  UNHEALTHY
}

export interface ISession {
  config: {
    production: boolean;
    environment: string;
  };
  language: Language;
  dockerHealth: DockerHealth;
}

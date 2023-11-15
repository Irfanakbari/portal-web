interface Client {
  clientId: string;
  clientName: string;
  userConsentRequired: boolean;
  inUse: boolean;
  offlineAccess: boolean;
}

export interface Session {
  id: string;
  ipAddress: string;
  started: number;
  lastAccess: number;
  expires: number;
  clients: Client[];
  browser: string;
  current: boolean;
}

export interface DeviceInfo {
  os?: string;
  osVersion?: string;
  device?: string;
  lastAccess?: number;
  current?: boolean;
  sessions?: Session[];
  mobile?: boolean;
}

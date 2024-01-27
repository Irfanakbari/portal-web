interface UserProfileMetadataAttribute {
    name: string;
    displayName: string;
    required: boolean;
    readOnly: boolean;
    validators: {
        email?: {
            'ignore.empty.value': boolean;
        };
        // Tambahkan validator lain jika diperlukan
    };
}

interface UserProfileMetadata {
    attributes: UserProfileMetadataAttribute[];
    groups: string[];
}

interface UserAccount {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    userProfileMetadata: UserProfileMetadata;
    attributes: Record<string, any>; // Tipe atribut bisa disesuaikan berdasarkan kebutuhan
}

interface UserAccountApplication {
    clientId: string;
    clientName: string;
    description: string;
    userConsentRequired: boolean;
    inUse: boolean;
    offlineAccess: boolean;
    rootUrl: string;
    baseUrl: string;
    effectiveUrl: string;
}

interface UserAccountSession {
    id: string;
    ipAddress: string;
    started: number;
    lastAccess: number;
    expires: number;
    clients: Client[];
    browser: string;
    current?: boolean; // Optional property indicating if it's the current session
}
interface UserAccountSessionDevice {
    os: string;
    osVersion: string;
    device: string;
    lastAccess: number;
    sessions: UserAccountSession[];
    mobile: boolean;
    current?: boolean;
}
interface Client {
    clientId: string;
    clientName: string;
    userConsentRequired: boolean;
    inUse: boolean;
    offlineAccess: boolean;
}
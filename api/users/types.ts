// types/user.ts
export interface EmailAddress {
    id: string;
    emailAddress: string;
    verification: {
        status: string;
        strategy: string;
    };
    linkedTo: {
        type: string;
        id: string;
    }[];
}

export interface PhoneNumber {
    id: string;
    phoneNumber: string;
    verification: {
        status: string;
        strategy: string;
    };
    linkedTo: {
        type: string;
        id: string;
    }[];
}

export interface ExternalAccount {
    id: string;
    provider: string;
    username: string;
    identificationId: string;
    providerUserId: string;
    approvedScopes: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    verification: {
        status: string;
        strategy: string;
    };
}

export interface Web3Wallet {
    id: string;
    web3Wallet: string;
    verification: {
        status: string;
        strategy: string;
    };
}

export interface OrganizationMembership {
    id: string;
    organization: {
        id: string;
        name: string;
        slug: string;
        imageUrl: string;
    };
    role: string;
}

export interface UserPublicMetadata {
    [key: string]: any;
}

export interface UserPrivateMetadata {
    [key: string]: any;
}

export interface UserUnsafeMetadata {
    [key: string]: any;
}

export interface User {
    id: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    externalId: string | null;
    emailAddresses: EmailAddress[];
    phoneNumbers: PhoneNumber[];
    externalAccounts: ExternalAccount[];
    web3Wallets: Web3Wallet[];
    organizationMemberships: OrganizationMembership[];

    // Primary fields
    primaryEmailAddress: EmailAddress | null;
    primaryEmailAddressId: string | null;
    primaryPhoneNumber: PhoneNumber | null;
    primaryPhoneNumberId: string | null;
    primaryWeb3Wallet: Web3Wallet | null;
    primaryWeb3WalletId: string | null;

    // Verification status
    hasVerifiedEmailAddress: boolean;
    hasVerifiedPhoneNumber: boolean;
    verifiedExternalAccounts: ExternalAccount[];
    verifiedWeb3Wallets: Web3Wallet[];
    unverifiedExternalAccounts: ExternalAccount[];

    // Security
    passwordEnabled: boolean;
    twoFactorEnabled: boolean;
    totpEnabled: boolean;
    backupCodeEnabled: boolean;

    // Metadata
    publicMetadata: UserPublicMetadata;
    privateMetadata: UserPrivateMetadata;
    unsafeMetadata: UserUnsafeMetadata;

    // Images
    imageUrl: string;
    hasImage: boolean;

    // Dates
    createdAt: Date;
    updatedAt: Date;
    lastSignInAt: Date;
    legalAcceptedAt: Date | null;
    lastActiveAt: Date;

    // Organization settings
    createOrganizationEnabled: boolean;
    createOrganizationsLimit: number | null;
    deleteSelfEnabled: boolean;

    // Deprecated
    samlAccounts?: any[]; // Deprecated in favor of enterpriseAccounts
}

export interface SetPasswordData {
    password: string;
    skip_password_checks: boolean;
    sign_out_of_other_sessions: boolean;
}

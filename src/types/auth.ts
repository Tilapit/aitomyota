export const USER_ROLES = ["client", "therapist"] as const;

export type UserRole = (typeof USER_ROLES)[number];

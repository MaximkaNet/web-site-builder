import type { AuthUser } from "~/types/AuthUser";

export const useAuthUser = () => useState<AuthUser | null>('authUser', () => null)
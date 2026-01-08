import { useMe } from "./useMe";

export function useHasRole(role: string) {
  const { data: user } = useMe();
  return user?.role === role;
}

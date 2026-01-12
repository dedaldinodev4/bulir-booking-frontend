
export const convertUserRole = (role: "CLIENT" | "ADMIN" | "PROVIDER"): string => {
  return role === 'CLIENT' ? 'Cliente' : role === 'ADMIN' ? 'Admin' : 'Prestador';
} 
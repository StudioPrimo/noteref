import { Health } from '@/app/api/health/route';

export const isHealth = (arg: any): arg is Health => {
  return (
    arg !== null && typeof arg === 'object' && typeof arg.health === 'string'
  );
};

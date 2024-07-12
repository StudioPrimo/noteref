import { api } from '@/utils/api';
import { isHealth } from '@/utils/TypeGuard';

import { NextRequest, NextResponse } from 'next/server';

export type Health = {
  health: string;
  status: string;
};

export async function GET(req: NextRequest) {
  const response = await api.get('/health');

  if (!isHealth(response.data)) {
    throw new Error('API type error');
  }
  console.log(response.data.health);
  console.log(response.data);
  return NextResponse.json(response.data);
}

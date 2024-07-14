import 'dotenv/config';
export const Config = {
  BUCKET_NAME: process.env.NEXT_PUBLIC_BUCKET_NAME ?? '',
  S3_ENDPOINT: process.env.NEXT_PUBLIC_S3_ENDPOINT ?? '',
  AWS_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? '',
  AWS_SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? '',
  CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID ?? '',
  CLIENT_SECRET: process.env.NEXT_GOOGLE_CLIENT_SECRET ?? '',
};

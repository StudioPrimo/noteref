import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Config } from './Config';

export class S3 {
  private client: S3Client;
  private bucketName = Config.BUCKET_NAME;
  constructor() {
    this.client = new S3Client({
      credentials: {
        accessKeyId: Config.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: Config.AWS_SECRET_ACCESS_KEY ?? '',
      },
      endpoint: Config.S3_ENDPOINT,
      forcePathStyle: true,
      region: 'us-west-2',
    });
  }
  async uploadFile(file: File) {
    const upload = new Upload({
      client: this.client,
      params: {
        Bucket: this.bucketName,
        Key: file.name,
        Body: file,
      },
    });
    await upload
      .done()
      .then(() => {
        console.log('Successfully uploade');
      })
      .catch((e) => {
        console.log('Error uploading', e);
      });
  }
}

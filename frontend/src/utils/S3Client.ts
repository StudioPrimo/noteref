import {
  GetObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
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
  async getListFilesName() {
    const commandInput: ListObjectsV2CommandInput = {
      Bucket: this.bucketName,
    };
    const command = new ListObjectsV2Command(commandInput);

    let content = '';

    const data = await this.client.send(command);
    const contentList = (data.Contents || []).map((c) => `${c.Key}`).join('\n');
    content += contentList + '\n';
    if (content == null) {
      return;
    }
    commandInput.ContinuationToken = data.NextContinuationToken;

    console.log(content);
    return content;
  }
  async getFile(path: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: path,
    });

    const response = await this.client.send(command);

    if (!response.Body) {
      return;
    }
    const str = await response.Body.transformToString();
    return new File([str], 'test');
  }
}

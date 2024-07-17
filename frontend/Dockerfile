FROM node:22.4.1

WORKDIR /app/src

EXPOSE 3000

RUN apt-get update && apt-get install -y awscli
RUN aws configure --profile minio set aws_access_key_id miniominio \
    && aws configure --profile minio set aws_secret_access_key miniominio \
    && aws configure --profile minio set region us-east-1 \
    && aws configure --profile minio set s3.signature_version s3v4 \
    && aws configure --profile minio set s3.endpoint_url http://127.0.0.1:9000

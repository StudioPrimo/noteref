FROM node:22.4.1
WORKDIR /app/src
COPY src/package.json /app/src/package.json
RUN npm install yarn 

COPY entrypoint.sh /app

ENTRYPOINT ["/app/entrypoint.sh"]

EXPOSE 3000

WORKDIR /app/src

EXPOSE 3000

RUN apt-get update && apt-get install -y awscli libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG REGION
ARG S3_SIGNATURE_VERSION
ARG S3_ENDPOINT_URL

RUN aws configure --profile minio set aws_access_key_id ${AWS_ACCESS_KEY_ID} \
    && aws configure --profile minio set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY} \
    && aws configure --profile minio set region ${REGION} \
    && aws configure --profile minio set s3.signature_version ${S3_SIGNATURE_VERSION} \
    && aws configure --profile minio set s3.endpoint_url ${S3_ENDPOINT_URL}


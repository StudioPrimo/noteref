'use client';
import React, { useRef, useState } from 'react';
import { Button, IconButton } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { S3 } from '@/utils/S3Client';

const AttachFile = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputImage = event.target.files;
    if (inputImage != null) {
      const inputArray = Array.from(inputImage);
      setImages(inputArray);
    }
  };

  const uploadFiles = async () => {
    const services = new S3();
    images.forEach(async (image) => {
      await services.uploadFile(image);
    });
  };

  return (
    <>
      <input type="file" ref={inputRef} hidden onChange={onChangeImage} />
      <IconButton
        aria-label="Input-image"
        icon={<AttachmentIcon />}
        onClick={onButtonClick}
      />
      {images?.map((image, index) => <p key={index}>{image.name}</p>)}
      {images.length > 0 && <Button onClick={uploadFiles}>Upload</Button>}
    </>
  );
};

export default AttachFile;
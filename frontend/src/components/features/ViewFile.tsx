'use client';

import React, { useEffect, useState } from 'react';
import { S3 } from '@/utils/S3Client';
import { Box } from '@chakra-ui/react';

import PDFViewer from '@/components/features/PDFViewer';
import { useAppDispatch, useAppSelector } from '@/app/stores';
import { RootState } from '@/app/stores/index';

const ViewFile = () => {
  let [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const activeFileKey = useAppSelector(
    (state: RootState) => state.file.activeFileKey,
  );

  useEffect(() => {
    const viewPDFfromS3 = async () => {
      const s3 = new S3();

      if (activeFileKey === null) {
        console.log('No active file key');
        return;
      }

      const fileStream = await s3.getFile(activeFileKey);
      if (fileStream) {
        setSelectedFile(fileStream);
      }
    };

    viewPDFfromS3();
  }, [dispatch, activeFileKey]);

  const isPDF = (key: string): boolean => {
    return key.toLowerCase().endsWith('.pdf');
  };

  // ファイルが画像（PNG、JPG、JPEG、GIF）かどうかを判断する関数
  const isImage = (key: string): boolean => {
    return /\.(png|jpg|jpeg|gif)$/i.test(key.toLowerCase());
  };

  return (
    <Box>
      {selectedFile ? (
        isPDF(selectedFile.name) ? (
          <PDFViewer key={selectedFile.name} fileUrl={selectedFile} />
        ) : isImage(selectedFile.name) ? (
          <img src={URL.createObjectURL(selectedFile)} />
        ) : (
          <p>Unsupported file type</p>
        )
      ) : (
        <p>not set file</p>
      )}
    </Box>
  );
};

export default ViewFile;

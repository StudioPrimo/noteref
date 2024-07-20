'use client';
import React, { useEffect, useState } from 'react';
import { S3 } from '@/utils/S3Client';
import { Box } from '@chakra-ui/react';

import PDFViewer from '@/components/features/PDFViewer';

const ViewFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const viewPDFfromS3 = async () => {
      const s3 = new S3();

      const fileStream = await s3.getFile('sample.pdf');
      if (fileStream) {
        setSelectedFile(fileStream);
      }
    };

    viewPDFfromS3();
  }, []);

  return (
    <Box>
      {selectedFile ? <PDFViewer fileUrl={selectedFile} /> : <p>Loading...</p>}
    </Box>
  );
};

export default ViewFile;

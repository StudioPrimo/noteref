'use client';
import React, { useEffect, useState } from 'react';
import { S3 } from '@/utils/S3Client';
import { Box, List, ListItem, Spinner, Text } from '@chakra-ui/react';

import PDFViewer from '@/components/features/PDFViewer';

interface S3File {
  Key: string;
}

const GetFileList = () => {
  const [fileList, setFileList] = useState<S3File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchFileList = async () => {
      const s3 = new S3();
      try {
        const data = await s3.getListFilesName();
        if (data) {
          const fileArray = data
            .split('\n')
            .filter((file: string) => file.trim() !== '')
            .map((file: string) => ({ Key: file.trim() }));
          setFileList(fileArray);
        } else {
          console.error('No data returned from S3');
        }
      } catch (error) {
        console.error('Error fetching file list', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileList();
  }, []);

  const getFile = async (key: string) => {
    const s3 = new S3();

    const fileStream = await s3.getFile(key);
    if (fileStream) {
      setSelectedFile(fileStream);
    }
  };

  const isPDF = (key: string): boolean => {
    return key.toLowerCase().endsWith('.pdf');
  };

  getFile('sample.pdf');
  console.log(selectedFile);

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : (
        <List spacing={3}>
          {fileList.length > 0 ? (
            fileList.map((file, index) => (
              <ListItem key={index}>
                {isPDF(file.Key) ? (
                  <PDFViewer fileUrl={selectedFile} />
                ) : (
                  <Text>{file.Key}</Text>
                )}
              </ListItem>
            ))
          ) : (
            <Text>No files found</Text>
          )}
        </List>
      )}
    </Box>
  );
};

export default GetFileList;

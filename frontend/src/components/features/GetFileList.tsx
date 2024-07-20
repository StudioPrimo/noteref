'use client';
import React, { useEffect, useState } from 'react';
import { S3 } from '@/utils/S3Client';
import { Box, List, ListItem, Spinner, Text } from '@chakra-ui/react';

interface S3File {
  Key: string;
}

const GetFileList = () => {
  const [fileList, setFileList] = useState<S3File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFileList = async () => {
      const s3 = new S3();
      try {
        const data = await s3.getListFilesName();
        console.log('Data:', data);
        if (data) {
          const fileArray = data
            .split('\n')
            .filter((file: string) => file.trim() !== '')
            .map((file: string) => ({ Key: file.trim() }));
          setFileList(fileArray);
          console.log('File list:', fileArray);
        } else {
          console.log('No data returned from S3');
        }
      } catch (error) {
        console.error('Error fetching file list', error);
      } finally {
        console.log('Finished fetching file list');
        setLoading(false);
      }
    };

    fetchFileList();
  }, []);

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : (
        <List spacing={3}>
          {fileList.length > 0 ? (
            fileList.map((file, index) => (
              <ListItem key={index}>
                <Text>{file.Key}</Text>
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

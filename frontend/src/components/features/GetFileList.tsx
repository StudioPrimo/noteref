'use client';

import React, { useEffect, useState } from 'react';
import { S3 } from '@/utils/S3Client';
import { Box, List, ListItem, Spinner, Text, Button } from '@chakra-ui/react';
import { setActiveFileKey } from '@/app/stores/fileReducer';
import { useDispatch } from 'react-redux';

interface S3File {
  Key: string;
}

const GetFileList = () => {
  const [fileList, setFileList] = useState<S3File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFile, setActiveFile] = useState<string | null>(null); // 追加: アクティブなファイルの状態
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveFileKey(''));

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

  const handleFileClick = (key: string) => {
    console.log(`${key} clicked`);
    dispatch(setActiveFileKey(key));
    setActiveFile(key); // クリックされたファイルをアクティブに設定
  };

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : (
        <List spacing={3}>
          {fileList.length > 0 ? (
            fileList.map((file, index) => (
              <ListItem key={index}>
                <Button
                  onClick={() => handleFileClick(file.Key)}
                  bg="transparent" // 背景色を透明に設定
                  border="none" // ボーダーを削除
                  _hover={{ bg: 'gray.100', color: 'blue.500' }} // ホバー時の背景色とテキスト色を設定
                  _focus={{ boxShadow: 'outline' }} // フォーカス時のスタイルを設定
                  _active={{ bg: 'blue.500', color: 'white' }} // アクティブ時の背景色を設定
                >
                  {file.Key}
                </Button>
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

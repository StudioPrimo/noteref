'use client';

import React, { useState, ChangeEvent } from 'react';
import { Center, Flex, Image, Link, Text, Input, Box } from '@chakra-ui/react';

export default function Header() {
  const pages = ['home', 'about', 'upload'];
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Flex align="center" justify="space-between" gap="4" w="full" pr={4}>
      <Flex align="center" gap="4">
        <Image
          src="icon.svg"
          alt="icon"
          boxSize="80px"
          borderRadius="full"
          mt={1.5}
        />
        <Center>
          <Text fontSize="3xl">NoteRef</Text>
        </Center>
      </Flex>
      <Flex align="center" gap="4">
        {pages.map((page) => {
          if (page === 'home') {
            return (
              <Link key={page} href="/" pr={2}>
                <Text fontSize="xl" _hover={{ cursor: 'pointer' }}>
                  {page}
                </Text>
              </Link>
            );
          }
          return (
            <Link key={page} href={`/${page}`} pr={2}>
              <Text fontSize="xl" _hover={{ cursor: 'pointer' }}>
                {page}
              </Text>
            </Link>
          );
        })}
        <Input
          placeholder="Search pages"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Flex>
    </Flex>
  );
}

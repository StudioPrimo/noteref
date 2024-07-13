'use client';

import React, { useState, ChangeEvent } from 'react';
import { Center, Flex, Image, Link, Text, Input } from '@chakra-ui/react';

export default function Header() {
  const pages = ['home', 'about', 'upload'];
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Flex direction={'row'} gap={5} justify={'space-around'}>
        <Image
          src="icon.svg"
          alt="icon"
          boxSize={'80px'}
          borderRadius="full"
          mt={2}
        />
        <Center>
          <Text fontSize="3xl" as="i">
            note refugee
          </Text>
        </Center>
        <Center>
          {pages.map((page) => {
            if (page === 'home') {
              return (
                <Link key={page} href="/" pr={2}>
                  <Text fontSize="xl" as="i" _hover={{ cursor: 'pointer' }}>
                    {page}
                  </Text>
                </Link>
              );
            }
            return (
              <Link key={page} href={`/${page}`} pr={2}>
                <Text fontSize="xl" as="i" _hover={{ cursor: 'pointer' }}>
                  {page}
                </Text>
              </Link>
            );
          })}
          <Input
            placeholder="Search pages"
            value={searchTerm}
            onChange={handleSearchChange}
            ml={4}
          />
        </Center>
      </Flex>
    </>
  );
}

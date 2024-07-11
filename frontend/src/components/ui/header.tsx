import { Center, Flex, Image, Text, Link, Box } from '@chakra-ui/react';

export default function Header() {
  return (
    <>
      <Flex direction={'row'} align="center" gap={5} px={4}>
        <Image
          mt={1.5}
          src="icon.svg"
          alt="icon"
          boxSize={'80px'}
          borderRadius="full"
        />
        <Center>
          <Text fontSize="3xl">
            <Text as="i"> note refugee</Text>
          </Text>
        </Center>
        <Box ml="auto" />
        <Flex direction={'row'} gap={5}>
          <Link href="/" fontSize="xl">
            Home
          </Link>
          <Link href="/about" fontSize="xl">
            About
          </Link>
          <Link href="/want" fontSize="xl">
            Want
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

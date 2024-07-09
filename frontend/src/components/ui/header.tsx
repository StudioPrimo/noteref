import { Center, Flex, Image, Text } from '@chakra-ui/react';

export default function Header() {
  return (
    <>
      <Flex direction={'row'} gap={5}>
        <Image src="icon.svg" alt="icon" boxSize={'80px'} borderRadius="full" />
        <Center>
          <Text fontSize="3xl">
            <Text as="i"> note refugee</Text>
          </Text>
        </Center>
      </Flex>
    </>
  );
}

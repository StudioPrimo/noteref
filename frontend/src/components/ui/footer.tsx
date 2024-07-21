import { Flex, Image, Link, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <>
      <Flex direction={'row'} gap={5} alignItems="center">
        <Link href="https://github.com/StudioPrimo/noteref">
          <Image
            mt={1}
            src="github.svg"
            alt="icon"
            boxSize={'40px'}
            borderRadius="full"
          />
        </Link>
        <Link href="https://x.com/note_ref">
          <Image mt={1} src="X_logo.svg" alt="icon" boxSize={'40px'} />
        </Link>
        <Text>{'Gopher by Renée French CC BY 4.0'}</Text>
      </Flex>
    </>
  );
}

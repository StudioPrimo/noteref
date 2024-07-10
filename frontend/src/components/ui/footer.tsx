import { Flex, Image, Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <>
      <Flex direction={'row'} gap={5}>
        <Link href="https://github.com/StudioPrimo/noteref">
          <Image
            mt={1}
            src="github.svg"
            alt="icon"
            boxSize={'40px'}
            borderRadius="full"
          />
        </Link>
      </Flex>
    </>
  );
}
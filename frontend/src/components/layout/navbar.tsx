import {
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as Nav,
  Image,
} from '@nextui-org/react';

export default function Navbar() {
  return (
    <Nav>
      <NavbarBrand>
        <Image src="/icon.svg" width={48} height={48} alt="logo" />
        <p className="text-lg font-extrabold font-mono">note refugee</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Nav>
  );
}

import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  if (fetching) {
    // fetching user, not logged in yet
  } else if (!data?.me) {
    body = (
      <>
        <Link as={NextLink} href="/login" color="white" mr={2}>
          {" "}
          Login
        </Link>

        <Link as={NextLink} href="/register" color="white">
          {" "}
          Register
        </Link>
      </>
    );
  } else {
    body = (
      <Flex>
        {" "}
        <Box mr={2}> {"Hello "}{data.me.username.toLocaleUpperCase()}</Box>
        <Button variant={"link"}> Logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default Navbar;

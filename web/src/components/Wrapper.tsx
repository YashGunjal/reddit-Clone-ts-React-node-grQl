import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt={8}
      maxW={variant === "regular" ? "800px" : "400px"}
      mx="auto"
      w="100%"
    >
      <>{children}</>
    </Box>
  );
};

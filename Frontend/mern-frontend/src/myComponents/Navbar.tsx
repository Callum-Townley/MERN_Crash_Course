import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22px", sm: "30px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, red.400, blue.400)"}
          bgClip="text"
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack alignItems={"center"}>
          <Link to={"/create"}>
            <Button variant="subtle">
              <BsPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode} variant="subtle">
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;

import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./myComponents/Navbar";
function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.200", "brown.600")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}
//navbar is outside of the routes so it will be displayed on every page
export default App;

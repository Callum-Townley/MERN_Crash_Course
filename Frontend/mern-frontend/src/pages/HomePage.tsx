import { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product";
import ProductCard from "../myComponents/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      const { success, message } = await fetchProducts();
      if (!success) {
        console.error("Failed to fetch products:", message);
      }
    };

    fetchData();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack padding={8}>
        <Text
          fontSize={{ base: "22px", sm: "25px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, red.400, blue.400)"}
          bgClip="text"
        >
          Current Products 🚀
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          padding={10}
          w="full"
        >
          {products.map((product) =>
            product && product._id ? (
              <ProductCard key={product._id} product={product} />
            ) : null
          )}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;

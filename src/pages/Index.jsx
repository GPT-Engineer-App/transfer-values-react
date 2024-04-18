import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, Button, Text, Heading } from "@chakra-ui/react";
import { FaArrowRight, FaSave } from "react-icons/fa";

const PageOne = ({ onNavigate }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    localStorage.setItem("userInput", inputValue);
    onNavigate(2); // Navigate to Page Two
  };

  return (
    <VStack spacing={4}>
      <Heading>Page One</Heading>
      <Text>Enter something to save to localStorage:</Text>
      <Input placeholder="Type here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button rightIcon={<FaSave />} colorScheme="blue" onClick={handleSave}>
        Save and Go to Page Two
      </Button>
    </VStack>
  );
};

const PageTwo = ({ onNavigate }) => {
  const [storedValue, setStoredValue] = useState("");

  React.useEffect(() => {
    const data = localStorage.getItem("userInput");
    if (data) {
      setStoredValue(data);
    }
  }, []);

  return (
    <VStack spacing={4}>
      <Heading>Page Two</Heading>
      <Text>The value from Page One is:</Text>
      <Text fontWeight="bold">{storedValue}</Text>
      <Button leftIcon={<FaArrowRight />} colorScheme="teal" onClick={() => onNavigate(1)}>
        Go Back to Page One
      </Button>
    </VStack>
  );
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <ChakraProvider>
      <Box p={5} maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {currentPage === 1 ? <PageOne onNavigate={handleNavigate} /> : <PageTwo onNavigate={handleNavigate} />}
      </Box>
    </ChakraProvider>
  );
};

export default Index;

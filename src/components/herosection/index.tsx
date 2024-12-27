'use client'  

import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react'  

export default function WithBackgroundVideo() {  
  return (  
    <Flex  
      w={'full'}  
      h={'100vh'}  
      position="relative"  
      overflow="hidden"  
    >  
      <video  
        autoPlay  
        loop  
        muted  
        style={{  
          position: 'absolute',  
          top: 0,  
          left: 0,  
          width: '100%',  
          height: '100%',  
          objectFit: 'cover',  
          zIndex: 0,  
        }}  
      >  
        <source src="your-video-url.mp4" type="video/mp4" />  
        Your browser does not support the video tag.  
      </video>  
      <VStack  
        w={'full'}  
        justify={'center'}  
        px={useBreakpointValue({ base: 4, md: 8 })}  
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}  
        zIndex={1} // Ensures content is above the video  
      >  
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>  
          <Text  
            color={'white'}  
            fontWeight={700}  
            lineHeight={1.2}  
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}  
          >  
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor  
          </Text>  
          <Stack direction={'row'}>  
            <Button  
              bg={'blue.400'}  
              rounded={'full'}  
              color={'white'}  
              _hover={{ bg: 'blue.500' }}>  
              Show me more  
            </Button>  
            <Button  
              bg={'whiteAlpha.300'}  
              rounded={'full'}  
              color={'white'}  
              _hover={{ bg: 'whiteAlpha.500' }}>  
              Show me more  
            </Button>  
          </Stack>  
        </Stack>  
      </VStack>  
    </Flex>  
  )  
}
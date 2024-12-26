'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Center,
  Heading,
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { verifyEmail } from '../../../lib/cognito'

export default function VerifyEmailForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const emailParam = searchParams.get('email')
    console.log('Email from query:', emailParam) // Debug
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleVerify = async () => {
    setError('')
    setSuccess('')
    try {
      const result = await verifyEmail(email, verificationCode)
      setSuccess('Your email has been verified successfully!')
      console.log('Verification Result:', result)
    } catch (err:any) {
      setError(err)
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Verify your Email
          </Heading>
        </Center>
        <FormControl id="email" isRequired>
          <Input
            placeholder="Enter your email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
            isDisabled={!email}
          />
        </FormControl>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Enter the code sent to your email:
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput
                onChange={(value) => setVerificationCode(value)}
                autoFocus
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {success && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            {success}
          </Alert>
        )}
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleVerify}>
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

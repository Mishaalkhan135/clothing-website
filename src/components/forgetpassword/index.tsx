'use client'

import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { forgotPassword } from '../../lib/cognito'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleForgotPassword = async () => {
    setError('')
    setSuccess('')
    try {
      await forgotPassword(email)
      setSuccess('Password reset code sent to your email!')
      // Redirect to the reset password screen after success
      setTimeout(() => {
        router.push(`/resetpassword?email=${encodeURIComponent(email)}`)
      }, 2000)
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
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You'll get an email with a reset code
        </Text>
        <FormControl id="email" isRequired>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            onClick={handleForgotPassword}>
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { confirmPassword } from '../../lib/cognito'

export default function ResetPasswordForm() {
  const [email, setEmail] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const router = useRouter()
  const searchParams = useSearchParams()

  // Prefill email from query parameters if available
  useEffect(() => {
    const emailParam = searchParams?.get('email') || ''
    if (typeof emailParam === 'string') {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleResetPassword = async () => {
    setError('')
    setSuccess('')
    try {
      await confirmPassword(email, verificationCode, newPassword)
      setSuccess('Password has been reset successfully!')

      // Redirect to login after success
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred.')
      }
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
          Enter new password
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="verificationCode" isRequired>
          <FormLabel>Verification Code</FormLabel>
          <Input
            placeholder="Enter the code sent to your email"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            onClick={handleResetPassword}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

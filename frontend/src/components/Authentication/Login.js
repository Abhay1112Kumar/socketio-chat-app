
// import React, { useState } from 'react'
// import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack ,Button, useToast} from '@chakra-ui/react'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// const Login = () => {
//    const [show,setShow]=useState(false);
//     const [name,setName]=useState();
//     const [email,setEmail]=useState();   
//     const [password,setPassword]=useState();
//    const [loading,setLoading]=useState(false);
//    const toast=useToast();
//    const navigate=useNavigate();
//      const handleClick=()=>
//       setShow(!show);  
//    const submitHandler=async()=>{
//      setLoading(true);
   
//      if ( !email || !password ) {
//        toast({
//          title: "Please fill all the fields",
//          status: "warning",
//          duration: 5000,
//          isClosable: true,
//          position: "bottom",
//        });
//        setLoading(false);
//        return;
//      } 
 
//      try {
//        const config = {
//          headers: {
//            "Content-type": "application/json",
//          },
//        };
 
//        const { data } = await axios.post(
//          "/api/user/login",
//          {
         
//            email,
//            password,
        
//          },
//          config
//        );
 
//        toast({
//          title: "Login Successful",
//          status: "success",
//          duration: 5000,
//          isClosable: true,
//          position: "bottom",
//        });
 
//        localStorage.setItem("userInfo", JSON.stringify(data));
//        setLoading(false);
//        navigate("/chats");
//      } catch (error) {
//        toast({
//          title: "Error occurred!",
//          description: error.response?.data?.message || error.message,
//          status: "error",
//          duration: 5000,
//          isClosable: true,
//          position: "bottom",
//        });
//        setLoading(false);
//      }
//    };
//     return (
//    <VStack spacing='5px' >
      
//        <FormControl id="email" isRequired>
//         <FormLabel>Email
  
//         </FormLabel>
//          <Input
//               placeholder="Enter Your Email"
//               value={email}
//               onChange={(e)=>setEmail(e.target.value)}
//          />
//        </FormControl>
  
//        <FormControl id="password" isRequired>
//         <FormLabel>Password
  
//         </FormLabel>
//         <InputGroup >
//         <Input
//          type={show?"text":"password"}
//               placeholder="Enter Your Password"
//               value={password}
//               onChange={(e)=>setPassword(e.target.value)}
//          />
//         <InputRightElement width="4.5rem">     
//          <Button h="1.75rem" size="sm" onClick={handleClick}>
//           {show?"Hide":"Show"}
//          </Button>    
//         </InputRightElement>
//         </InputGroup>      
//        </FormControl>    
//   <Button colourSchema="blue"
//   width="100%"
//   style={{marginTop:15}}
//   onClick={submitHandler}
//   isLoading={loading}> 
//  LogIn
//   </Button>
//  <Button variant="solid"
//   colorScheme="red"
//   width="100%"
//   onClick={()=>{
//     setEmail("guest@example.com");
//     setPassword("123456");
//   }}
//  >
//   Get Guest User Credentials
//  </Button>
//    </VStack>
//     )
// }

// export default Login


import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      );

      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      window.dispatchEvent(new Event('storage')); // Notify ChatProvider
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      toast({
        title: 'Error occurred!',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        mt={2}
        onClick={submitHandler}
        isLoading={loading}
      >
        Log In
      </Button>

      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail('guest@example.com');
          setPassword('123456');
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;

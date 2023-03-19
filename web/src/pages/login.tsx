import {
    Button,
    Box,
  } from "@chakra-ui/react";
  import { Field, Form, Formik } from "formik";
  import { useRouter } from "next/router";
  import React from "react";
  import { InputField } from "../components/InputField";
  import { Wrapper } from "../components/Wrapper";
  import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
  import { toErrorMap } from "../utils/toErrorMap";
  

  
  
  export const Login: React.FC<{}> = ({}) => {
    const [, login] = useLoginMutation();
    const router= useRouter();
  
    return (
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={ async (values, { setErrors }) => {
            // console.log(values);
             const response = await login({loginOptions:values });
            console.log(" actial", response)
            if (response?.data?.login?.errors){
              console.log(" set error")
              console.log( "error list", response.data.login.errors)
              console.log(toErrorMap(response.data.login.errors));
               setErrors(toErrorMap(response.data.login.errors))
            }
            else if ( response.data?.login?.user)
            {
              router.push('/')
            }
            console.log(response)
            return response
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="User Name"
                label="User Name"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                color={"teal"}
              >
                {" "}
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
  };
  
  export default Login;
  
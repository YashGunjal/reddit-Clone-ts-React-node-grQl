import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}


export const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router= useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={ async (values, { setErrors }) => {
          // console.log(values);
           const response = await register({
            // options: { username: values.username, password: values.password },
            options:values
          });
          console.log(" actial", response)
          if (response?.data?.register?.errors){
            console.log(" set error")
            console.log( "error list", response.data.register.errors)
            console.log(toErrorMap(response.data.register.errors));
             setErrors(toErrorMap(response.data.register.errors))
          }
          else if ( response.data?.register?.user)
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;

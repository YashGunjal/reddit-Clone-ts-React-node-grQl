import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";

interface registerProps {}

const REGISTER_MUT = `mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
       field
       message
     }
     user {
       username
       id
     }
    }
  }`;

export const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={ async (values) => {
          console.log(values);
           const response = await register({
            // options: { username: values.username, password: values.password },
            options:values
          });
          console.log(response)
          return response
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="User Name"
              label=" User Name"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label=" Password"
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

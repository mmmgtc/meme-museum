import { Flex, Button, Stack } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

import CenteredFrame from "../../components/layout/CenteredFrame";
import CreateMemePage from "../../views/CreateMemePage";
import Card from "components/custom/Card";

function CreateMeme() {
  const methods = useForm();

  function onSubmit() {
    const values = methods.getValues();
    console.log({ values });
  }

  return (
    <FormProvider {...methods}>
      <CenteredFrame>
        <Card h="full" w="2xl">
          <Stack w="full" as="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <CreateMemePage />
            <Flex w="full" justify="center">
              <Button
                ml="0.5rem"
                mt={4}
                colorScheme="aqua"
                isLoading={methods.formState.isSubmitting}
                type="submit"
                onClick={() => onSubmit()}
                px="1.25rem"
                fontSize="md"
              >
                Submit
              </Button>
            </Flex>
          </Stack>
        </Card>
      </CenteredFrame>
    </FormProvider>
  );
}

export default CreateMeme;

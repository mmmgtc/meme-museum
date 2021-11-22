import { Flex, Button, Stack } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

import CenteredFrame from "../../components/layout/CenteredFrame";
import CreateMemePage from "../../views/CreateMemePage";
import TagsField from "../../views/TagsField";
import Card from "components/custom/Card";

function CreateMeme() {
  const methods = useForm();

  async function onSubmit() {
    const values = methods.getValues();
    console.log({ values });
    const formData = new FormData();
    if (values.image) {
      formData.append("image", values.image[0]);
    }
    const cidsRes = await fetch("/api/image-storage", {
      method: "POST",
      body: formData,
    });
    const { cids } = await cidsRes.json();
    const authHeaderKey = "Authorization";
    const createMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/memes/`,
      {
        method: "POST",
        body: JSON.stringify({
          ...values,
          image: cids.image,
        }),
        headers: {
          [authHeaderKey]: localStorage.getItem("Authorization") || "",
        },
      }
    );
    const createdMeme = await createMemeResponse.json();
    console.log({ createdMeme });
  }

  return (
    <FormProvider {...methods}>
      <CenteredFrame>
        <Card h="full" w="2xl">
          <Stack w="full" as="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <CreateMemePage />
            <TagsField />
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

import {
  HStack,
  Box,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

import CreateMemePage from "../views/CreateMemePage";
import TagsField from "../views/TagsField";
import Card from "components/custom/Card";

import CenteredFrame from "./layout/CenteredFrame";

function CreateMemeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) {
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
    const headers = localStorage
      ? {
        [authHeaderKey]: localStorage.getItem("Authorization") || "",
      }
      : {};
    const createMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/memes/`,
      {
        method: "POST",
        body: JSON.stringify({
          ...values,
          image: cids.image,
        }),
        headers,
      }
    );
    const createdMeme = await createMemeResponse.json();
    console.log({ createdMeme });
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color="pink.300" mt="6" mr="4" />
        <ModalBody pb={6}>
          <FormProvider {...methods}>
            <CenteredFrame>
              <Card h="full" w="2xl">
                <Stack
                  w="full"
                  as="form"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <CreateMemePage />
                  <TagsField />
                </Stack>
              </Card>
            </CenteredFrame>
          </FormProvider>
        </ModalBody>

        <ModalFooter>
          <HStack justifyContent="center" alignItems="center">
            <Button
              mr="0.5rem"
              _hover={{
                background: "purple.700",
              }}
              color="white"
              bg="purple.200"
              isLoading={methods.formState.isSubmitting}
              type="submit"
              onClick={() => onSubmit()}
              px="1.25rem"
              fontSize="md"
            >
              SUBMIT
            </Button>
            <Button
              _hover={{
                background: "pink.700",
              }}
              color="white"
              bg="pink.300"
              rounded="full"
              onClick={onClose}
            >
              CANCEL
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateMemeModal;

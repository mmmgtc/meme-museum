import {
  HStack,
  Heading,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Web3Context } from "../contexts/Web3Provider";
import CreateMemePage from "../views/CreateMemePage";
import TagsField from "../views/TagsField";
import Card from "components/custom/Card";

import CenteredFrame from "./layout/CenteredFrame";

function CreateMemeModal({
  isOpen,
  onClose,
  addMeme,
}: {
  isOpen: boolean;
  onClose: any;
  addMeme: any;
}) {
  const { account } = useContext(Web3Context);
  const [isSubmitting, setIsSumbitting] = useState(false);
  const methods = useForm();
  const [headers, setHeaders] = useState<{
    Authorization: string;
    [key: string]: string;
  }>();

  useEffect(() => {
    // Perform localStorage action
    const token = localStorage.getItem("Authorization");
    console.log({ token });
    if (token) {
      setHeaders({
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      });
    }
  }, [account]);

  async function onSubmit() {
    setIsSumbitting(true);
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

    try {
      const createMemeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/museum/memes/`,
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            image: `https://ipfs.io/ipfs/${cids.image}`,
          }),
          headers,
        }
      );
      const createdMeme = await createMemeResponse.json();
      console.log({ createdMeme });
      setIsSumbitting(false);
      addMeme(createdMeme);
    } catch (error) {
      console.log(error);
      setIsSumbitting(false);
    }
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent rounded="3xl" bg="white">
        <ModalHeader display="flex">
          <Heading color="purple.200">JUST MEME IT!</Heading>
          <ModalCloseButton
            border="solid 1px #8C65F7"
            color="purple.200"
            mt="4"
            mr="4"
            cursor="pointer"
          />
        </ModalHeader>
        <ModalBody>
          <FormProvider {...methods}>
            <Stack as="form" onSubmit={methods.handleSubmit(onSubmit)}>
              <CreateMemePage />
              <TagsField />
            </Stack>
            <HStack
              w="full"
              justifyContent="flex-end"
              alignItems="center"
              py="4"
            >
              <Button
                mr="0.5rem"
                _hover={{
                  background: "white",
                  color: "purple.200",
                }}
                color="white"
                bg="purple.200"
                isLoading={methods.formState.isSubmitting}
                onClick={() => onSubmit()}
                fontSize="md"
                size="md"
              >
                SUBMIT
              </Button>
              <Button
                variant="outline"
                _hover={{
                  background: "white",
                  color: "purple.200",
                }}
                outlineColor="purple.200"
                color="purple.200"
                rounded="full"
                px="1.25rem"
                onClick={onClose}
                fontSize="md"
                size="sm"
              >
                CANCEL
              </Button>
            </HStack>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreateMemeModal;

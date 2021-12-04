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
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Web3Context } from "../contexts/Web3Provider";
import { brandColors } from "../helpers";

import CreateMemeForm from "./CreateMemeForm";

function CreateMemeModal({
  isOpen,
  onClose,
  addMeme,
  handleNotConnected,
}: {
  isOpen: boolean;
  onClose: any;
  addMeme: any;
  handleNotConnected: any;
}) {
  const { account, headers } = useContext(Web3Context);
  const [isSubmitting, setIsSumbitting] = useState(false);
  const methods = useForm();

  async function onSubmit() {
    if (!account) {
      return handleNotConnected();
    }
    setIsSumbitting(true);
    const values = methods.getValues();
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
            tags: values.tags.filter(
              (tag: { name: string }) => tag.name && tag.name !== ""
            ),
            image: `https://ipfs.io/ipfs/${cids.image}`,
          }),
          headers,
        }
      );
      const createdMeme = await createMemeResponse.json();
      setIsSumbitting(false);
      addMeme(createdMeme);
      methods.reset();
      return onClose();
    } catch (error) {
      console.log(error);
      return setIsSumbitting(false);
    }
  }

  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const borderColor = useColorModeValue("#8C65F7", "white");

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent
        rounded="3xl"
        color={color}
        bg={bg}
        border={`solid 5px ${borderColor}`}
      >
        <ModalHeader display="flex">
          <Heading color={color}>JUST MEME IT!</Heading>
          <ModalCloseButton
            border={`solid 5px ${borderColor}`}
            color={color}
            mt="4"
            mr="4"
            cursor="pointer"
          />
        </ModalHeader>
        <ModalBody>
          <FormProvider {...methods}>
            <Stack as="form" onSubmit={methods.handleSubmit(onSubmit)}>
              <CreateMemeForm />
              <HStack
                w="full"
                justifyContent="flex-end"
                alignItems="center"
                py="4"
              >
                <Button
                  isLoading={isSubmitting || methods.formState.isSubmitting}
                  mr="0.5rem"
                  rounded="full"
                  bg={brandColors.mainPurple}
                  color="white"
                  border={`solid 5px ${borderColor}`}
                  _hover={{
                    background: brandColors.darkPurple,
                    color: "white",
                  }}
                  type="submit"
                  fontSize="md"
                  size="md"
                >
                  SUBMIT
                </Button>
                <Button
                  rounded="full"
                  bg={bg}
                  color={color}
                  border={`solid 5px ${borderColor}`}
                  _hover={{
                    background: brandColors.darkPurple,
                    color: "white",
                  }}
                  onClick={onClose}
                  fontSize="md"
                  size="md"
                >
                  CANCEL
                </Button>
              </HStack>
            </Stack>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreateMemeModal;

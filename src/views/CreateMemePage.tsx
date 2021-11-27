import {
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Image,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import IconWithState from "../components/custom/IconWithState";

import ImageDropzone from "./ImageDropzone";

const CreateMemePage: React.FunctionComponent = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const requiredText = "This is required";

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  function goBack() {
    router.back();
  }
  return (
    <>
      <Heading color="purple.200">JUST MEME IT! ᕕ༼ ຈل͜ຈ༽ ᕗ </Heading>
      <ImageDropzone />
      <FormControl isInvalid={errors.memelord}>
        <FormLabel htmlFor="memelord" fontWeight="bold">
          MEME LORD
        </FormLabel>
        <Input
          borderColor="purple.300"
          _hover={{
            borderColor: "purple.300",
          }}
          _focus={{
            borderColor: "purple.700",
            boxShadow: `0 0 0 1px purple.700`,
          }}
          placeholder="Meme lord"
          {...register("memelord", {
            required: requiredText,
            maxLength: {
              value: 150,
              message: "Maximum length should be 150",
            },
          })}
        />
        <FormErrorMessage>
          {errors.memelord && errors.memelord.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.description}>
        <FormLabel htmlFor="description" fontWeight="bold">
          DESCRIPTION
        </FormLabel>
        <Textarea
          borderColor="purple.300"
          _hover={{
            borderColor: "purple.300",
          }}
          _focus={{
            borderColor: "purple.700",
            boxShadow: `0 0 0 1px purple.700`,
          }}
          placeholder="Meme description"
          {...register("description", {
            required: requiredText,
            maxLength: {
              value: 1200,
              message: "Maximum length should be 1200",
            },
          })}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default CreateMemePage;

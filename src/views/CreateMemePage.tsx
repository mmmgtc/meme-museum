import {
  Center,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Image,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import IconWithState from "../components/custom/IconWithState";
import { brandColors } from "../helpers";

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
  const purple = "purple.300";
  const purpleDark = "purple.700";

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

  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  // const altColor = useColorModeValue("white", brandColors.darkPurple);
  const altColor = useColorModeValue("white", brandColors.darkPurple);
  const borderColor = useColorModeValue("#8C65F7", "white");

  return (
    <Box color="purple.200">
      <ImageDropzone />
      <FormControl py="2" isInvalid={errors.title}>
        <FormLabel color={color} htmlFor="title" fontWeight="bold">
          TITLE
        </FormLabel>
        <Input
          borderColor={purple}
          bg={bg}
          border={`solid 5px ${borderColor}`}
          color={color}
          _hover={{
            bg: brandColors.darkPurple,
            color: "white",
          }}
          fontWeight="bold"
          style={{
            textTransform: "uppercase",
          }}
          _focus={{
            borderColor,
            boxShadow: `0 0 0 1px ${purpleDark}`,
          }}
          placeholder="Meme title"
          {...register("title", {
            required: requiredText,
            maxLength: {
              value: 150,
              message: "Maximum length should be 150",
            },
          })}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl py="2" isInvalid={errors.meme_lord}>
        <FormLabel color={color} htmlFor="meme_lord" fontWeight="bold">
          MEMELORD
        </FormLabel>
        <Input
          borderColor={purple}
          bg={bg}
          border={`solid 5px ${borderColor}`}
          color={color}
          _hover={{
            bg: brandColors.darkPurple,
            color: "white",
          }}
          fontWeight="bold"
          style={{
            textTransform: "uppercase",
          }}
          _focus={{
            borderColor,
            boxShadow: `0 0 0 1px ${purpleDark}`,
          }}
          placeholder="Memelord"
          {...register("meme_lord", {
            required: requiredText,
            maxLength: {
              value: 150,
              message: "Maximum length should be 150",
            },
          })}
        />
        <FormErrorMessage>
          {errors.meme_lord && errors.meme_lord.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl py="2" isInvalid={errors.description}>
        <FormLabel color={color} htmlFor="description" fontWeight="bold">
          DESCRIPTION
        </FormLabel>
        <Textarea
          borderColor={purple}
          bg={bg}
          border={`solid 5px ${borderColor}`}
          color={color}
          _hover={{
            bg: brandColors.darkPurple,
            color: "white",
          }}
          fontWeight="bold"
          style={{
            textTransform: "uppercase",
          }}
          _focus={{
            borderColor,
            boxShadow: `0 0 0 1px ${purpleDark}`,
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
    </Box>
  );
};

export default CreateMemePage;

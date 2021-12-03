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
import TagsField from "./TagsField";

const CreateMemeForm: React.FunctionComponent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const requiredText = "This is required";
  const purple = "purple.300";
  const purpleDark = "purple.700";
  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const borderColor = useColorModeValue("#8C65F7", "white");

  return (
    <Box color="purple.200">
      <ImageDropzone />
      <FormControl py="2" isInvalid={errors.title}>
        <FormLabel color={color} htmlFor="title" fontWeight="bold">
          TITLE
        </FormLabel>
        <Input
          _placeholder={{
            color: useColorModeValue("spacelightpurple", "purple.200"),
          }}
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
              value: 200,
              message: "Maximum length should be 150 characters",
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
            maxLength: {
              value: 200,
              message: "Maximum length should be 150 characters",
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
          minH="230px"
          borderColor={purple}
          bg={bg}
          border={`solid 5px ${borderColor}`}
          color={color}
          _hover={{
            bg: brandColors.darkPurple,
            color: "white",
          }}
          fontWeight="bold"
          _focus={{
            borderColor,
            boxShadow: `0 0 0 1px ${purpleDark}`,
          }}
          placeholder="Meme description"
          {...register("description", {
            maxLength: {
              value: 500,
              message: "Maximum length should be 500 characters",
            },
          })}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>
      <TagsField />
    </Box>
  );
};

export default CreateMemeForm;

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

const CreateMemePage: React.FunctionComponent = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles, e) => {
      if (acceptedFiles) {
        const { name } = e.target;
        setValue(name, e.target.files);
        setFiles(
          acceptedFiles.map((file: File) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <Image src={file.preview} />
    </div>
  ));

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
      <Heading>Create meme</Heading>
      <FormControl isInvalid={errors.logo} {...getRootProps()}>
        <FormLabel htmlFor="logo">Logo</FormLabel>
        {/* <input
            type="file"
            accept={acceptedFileTypes}
            style={{ display: "none" }}
          /> */}
        <Input
          {...register("logo", {
            required: "This is required",
          })}
          {...getInputProps()}
          placeholder="Logo"
        />
        {thumbs}
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <Center h="150px" bg="aqua.300" color="space" borderRadius="4">
            Drag something here or select
          </Center>
        )}
        <FormErrorMessage>
          {errors.logo && errors.logo.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.title}>
        <FormLabel htmlFor="title">Meme title</FormLabel>
        <Input
          placeholder="Meme title"
          {...register("title", {
            required: "This is required",
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

      <FormControl isInvalid={errors.description}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          placeholder="Meme description"
          {...register("description", {
            required: "This is required",
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

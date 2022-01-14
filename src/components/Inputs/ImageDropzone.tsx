import { CloseIcon } from "@chakra-ui/icons";
import {
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Image,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Compressor from "compressorjs";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import { brandColors } from "../../helpers";

const ImageDropzone = () => {
  const [files, setFiles] = useState([]);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles, e) => {
      if (acceptedFiles) {
        const { name } = e.target;
        console.log(e.target.files[0]);
        console.log("before compressing", e.target.files[0].size);
        // eslint-disable-next-line no-new
        new Compressor(e.target.files[0], {
          quality: 0.5,
          success(result) {
            console.log("after compressing", result.size);
            setValue(name, result);
            setValue("title", e.target.files[0].name);
            setFiles(
              acceptedFiles.map((file: File) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )
            );
          },
        });
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const thumbs = files.map((file: any) => (
    <Flex key={file.name}>
      <Image
        borderRadius="2"
        objectFit="cover"
        boxSize="150px"
        src={file.preview}
      />
      <Flex pl="4" d="column" v="full" alignSelf="center">
        <IconButton
          colorScheme="red"
          onClick={() => setFiles([])}
          aria-label="Remove Image"
          icon={<CloseIcon />}
        />
        <Text>{file.path}</Text>
      </Flex>
    </Flex>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <FormControl py="2" isInvalid={errors.image} {...getRootProps()}>
      <FormLabel color={color} htmlFor="image" fontWeight="bold">
        MEME IMAGE
      </FormLabel>
      {files && thumbs}
      {files.length === 0 && isDragActive && (
        <Center
          h="150px"
          borderColor="purple.700"
          bg={bg}
          border={`solid 5px ${brandColors.darkPurple}`}
          color={color}
          fontWeight="bold"
          style={{
            textTransform: "uppercase",
          }}
          _hover={{
            bg: brandColors.darkPurple,
            color: "white",
            cursor: "pointer",
          }}
          borderRadius="4"
        >
          DROP THE FILES HERE ...
          <Input
            type="file"
            placeholder="Meme image"
            {...register("image", {
              required: "This is required",
            })}
            {...getInputProps()}
            size="md"
          />
        </Center>
      )}

      {files.length === 0 && !isDragActive && (
        <Center
          h="150px"
          bg={bg}
          border={`solid 5px ${brandColors.darkPurple}`}
          color={color}
          fontWeight="bold"
          style={{
            textTransform: "uppercase",
          }}
          _hover={{
            bg: brandColors.darkPurple,
            color: "white",
            cursor: "pointer",
          }}
          borderRadius="4"
        >
          DRAG &amp; DROP YOUR MEME HERE OR CLICK TO SELECT
          <Input
            type="file"
            placeholder="Meme image"
            {...register("image", {
              required: "This is required",
            })}
            {...getInputProps()}
            size="md"
          />
        </Center>
      )}

      <FormErrorMessage>{errors.logo && errors.logo.message}</FormErrorMessage>
    </FormControl>
  );
};

export default ImageDropzone;

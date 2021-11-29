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
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

const ImageDropzone = () => {
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
    <Flex key={file.name}>
      <Image
        borderRadius="2"
        objectFit="cover"
        boxSize="150px"
        src={file.preview}
      />
      <Flex pl="4" d="column" v="full" alignSelf="center">
        <IconButton
          colorScheme="pink"
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
    <FormControl isInvalid={errors.image} {...getRootProps()}>
      <FormLabel htmlFor="image" fontWeight="bold">
        MEME IMAGE
      </FormLabel>
      {files && thumbs}
      {files.length === 0 && isDragActive && (
        <Center
          _hover={{ cursor: "pointer" }}
          h="150px"
          bg="white"
          border="solid 1px #8C65F7"
          color="purple.200"
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
          w="full"
          _hover={{ cursor: "pointer" }}
          h="150px"
          bg="white"
          border="solid 1px #8C65F7"
          color="purple.200"
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

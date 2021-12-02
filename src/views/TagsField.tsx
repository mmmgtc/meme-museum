import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Tag,
  TagLabel,
  SimpleGrid,
  TagCloseButton,
  HStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";

import { brandColors, W_FIT_CONTENT } from "../helpers";

const TagsField = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    control,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "tags", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const color = useColorModeValue(brandColors.mainPurple, "white");
  const bg = useColorModeValue("white", brandColors.mainPurple);
  const borderColor = useColorModeValue("#8C65F7", "white");

  return (
    <FormControl isInvalid={errors.tags} py="4">
      <HStack justifyContent="space-between">
        <FormLabel htmlFor="tags" color={color} fontWeight="bold">
          TAGS:
        </FormLabel>
        <Button
          leftIcon={<AddIcon />}
          my="5"
          size="sm"
          rounded="full"
          bg={brandColors.mainPurple}
          color="white"
          border={`solid 5px ${borderColor}`}
          _hover={{
            background: "white",
            color: brandColors.mainPurple,
          }}
          onClick={() => append({ name: "" })}
        >
          ADD TAG
        </Button>
      </HStack>
      <SimpleGrid minChildWidth="120px" spacing="10px" mt="4">
        {fields.map((item, index) => (
          <Tag
            key={item.id}
            borderRadius="xl"
            bg={brandColors.darkPurple}
            size="sm"
            maxW="180px"
            variant="solid"
          >
            <TagLabel fontWeight="bold" color={bg} alt={item.id} py="1">
              <Input
                placeholder="web3"
                _placeholder={{
                  color,
                }}
                rounded="xl"
                variant="solid"
                bg={bg}
                color={color}
                fontWeight="bold"
                size="sm"
                style={{
                  textTransform: "uppercase",
                }}
                {...register(`tags.${index}.name`, {
                  maxLength: {
                    value: 150,
                    message: "Maximum length should be 150",
                  },
                })}
              />
            </TagLabel>
            <TagCloseButton color={bg} onClick={() => remove(index)} />
          </Tag>
        ))}
      </SimpleGrid>
      <FormErrorMessage>{errors.tags && errors.tags.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TagsField;

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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";

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

  useEffect(() => {
    append({ name: "" });
    return () => {
      remove();
    };
  }, [append, remove]);

  return (
    <FormControl isInvalid={errors.tags}>
      <HStack justifyContent="space-between">
        <FormLabel htmlFor="tags" fontWeight="bold">
          TAGS:
        </FormLabel>
        <Button
          leftIcon={<AddIcon />}
          my="5"
          size="sm"
          color="white"
          bg="purple.200"
          onClick={() => append({ name: "" })}
        >
          ADD TAG
        </Button>
      </HStack>
      <SimpleGrid columns={4} spacing={4} mt="5">
        {fields.map((item, index) => (
          <Tag
            key={item.id}
            borderRadius="full"
            bg="purple.200"
            variant="solid"
          >
            <TagLabel>
              <Input
                placeholder="web3"
                border="none"
                size="sm"
                fontWeight="bold"
                style={{
                  textTransform: "uppercase",
                }}
                _focus={{
                  border: "none",
                }}
                {...register(`tags.${index}.name`, {
                  maxLength: {
                    value: 150,
                    message: "Maximum length should be 150",
                  },
                })}
              />
            </TagLabel>
            <TagCloseButton onClick={() => remove(index)} />
          </Tag>
        ))}
      </SimpleGrid>
      <FormErrorMessage>{errors.tags && errors.tags.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TagsField;

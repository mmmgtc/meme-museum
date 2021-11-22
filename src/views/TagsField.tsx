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
    append("");
    return () => {
      remove();
    };
  }, [append, remove]);

  return (
    <FormControl isInvalid={errors.tags}>
      <HStack justifyContent="space-between">
        <FormLabel htmlFor="tags" fontWeight="bold">
          Tags:
        </FormLabel>
        <Button my="5" onClick={() => append("")}>
          + Add new tag
        </Button>
      </HStack>
      <SimpleGrid columns={4} spacing={4} mt="5">
        {fields.map((item, index) => (
          <Tag
            size="sm"
            key={item.id}
            borderRadius="full"
            bg="purple.700"
            variant="solid"
          >
            <TagLabel>
              <Input
                placeholder="web3"
                border="none"
                _focus={{
                  border: "none",
                }}
                {...register(`tags.${index}.value`, {
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

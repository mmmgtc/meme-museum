const TagsSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "TagsList",
  type: "object",
  properties: {
    tags: {
      type: "array",
      title: "tags",
      items: {
        type: "object",
        title: "tagItem",
        properties: {
          id: {
            $ref: "#/definitions/CeramicStreamId",
          },
          name: {
            type: "string",
            title: "name",
            maxLength: 100,
          },
          createdAt: {
            type: "string",
            format: "date-time",
            maxLength: 30,
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            maxLength: 30,
          },
          description: {
            type: "string",
          },
          color: {
            type: "string",
          },
        },
      },
    },
  },
  definitions: {
    CeramicStreamId: {
      type: "string",
      pattern: "^ceramic://.+(\\\\?version=.+)?",
      maxLength: 150,
    },
  },
};
module.exports = TagsSchema;

const MemesSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "MemesList",
  type: "object",
  properties: {
    memes: {
      type: "array",
      title: "memes",
      items: {
        type: "object",
        title: "MemeItem",
        properties: {
          id: {
            $ref: "#/definitions/CeramicStreamId",
          },
          name: {
            type: "string",
            title: "name",
            maxLength: 100,
          },
          description: {
            type: "string",
          },
          image: {
            type: "string",
          },
          peers: {
            type: "array",
            items: {
              $ref: "#/definitions/CeramicStreamId",
            },
          },
          peerMemes: {
            type: "array",
            items: {
              $ref: "#/definitions/CeramicStreamId",
            },
          },
          tags: {
            type: "array",
            title: "tags",
            items: {
              type: "object",
              title: "TagItem",
              properties: {
                id: {
                  $ref: "#/definitions/CeramicStreamId",
                },
              },
            },
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

module.exports = MemesSchema;

const MemesSchema = require("./memes/memes-schema");
const TagsSchema = require("./tags/tags-schema");

module.exports = {
  schemas: {
    memes: MemesSchema,
    tags: TagsSchema,
  },
};

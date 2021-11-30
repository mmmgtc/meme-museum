export const getSlicedAddress = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(-3)}`;

export const brandColors = {
  mainPurple: "purple.200",
  darkPurple: "#6F3FF5",
};

export const W_FIT_CONTENT = "fit-content";

export type MemeType = {
  id: number;
  title: string;
  image: string;
  upvotes: number;
  downvotes: number;
  description: string;
  source: string;
  meme_lord: null;
  tags: {
    name: string;
  }[];
  poaster: {
    username: string;
    userprofile: Record<string, any>;
  };
  created_at: string;
};

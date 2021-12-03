/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "MEMES.PARTY",
  titleTemplate: "%s | MEMES.PARTY",
  defaultTitle: "MEMES.PARTY",
  description: "Upload, upvote and downvote your best memes!",
  canonical: "https://memes.party",
  openGraph: {
    url: "https://memes.party",
    title: "MEMES.PARTY",
    description: "Upload, upvote and downvote your best memes!",
    images: [
      {
        url: "https://bafybeicejjr2sgursyasjphtzf4s63pq4gswx7qwv6lumxv6myunoe4nyi.ipfs.dweb.link/memes-party.png",
        alt: "MEMES.PARTY og-image",
      },
    ],
    site_name: "MEMES.PARTY",
  },
  twitter: {
    handle: "@gitcoindao",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;

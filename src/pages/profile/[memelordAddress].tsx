import { useColorModeValue } from "@chakra-ui/color-mode";
import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  useDisclosure,
  VStack,
  useToast,
  Link,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useState, useCallback } from "react";
import Blockies from "react-blockies";
import { FaArrowLeft } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

import { Web3Context } from "../../contexts/Web3Provider";
import { MemeType, brandColors } from "../../helpers";
import MemeCard from "../../views/MemeCard";
import MemeModal from "../../views/MemeModal";
import { getMemes, getProfileData } from "../api/profile-data";

interface ProfileProps {
  profileName: string | null;
  userKarma: number | null;
  userMemes: any | null;
}

function Profile({ profileName, userKarma, userMemes }: ProfileProps) {
  const [memes, setMemes] = useState<MemeType[]>([]);
  const [currentMeme, setCurrentMeme] = useState<MemeType>();

  const { account, connectWeb3, headers } = useContext(Web3Context);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenMeme,
    onOpen: onOpenMeme,
    onClose: onCloseMeme,
  } = useDisclosure();
  const toast = useToast();

  const color = useColorModeValue(brandColors.mainPurple, "white");
  const altColor = useColorModeValue("white", brandColors.darkPurple);
  const bg = useColorModeValue("white", brandColors.mainPurple);
  const borderColor = useColorModeValue("#8c65f7", "white");

  const handleNotConnected = useCallback(() => {
    if (!toast.isActive("not-connected-toast")) {
      toast({
        id: "not-connected-toast",
        position: "bottom",
        variant: "solid",
        title: "Please connect your wallet first.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      connectWeb3();
    }
  }, [toast, connectWeb3]);

  const handleOpenMeme = useCallback(
    (meme: MemeType) => {
      setCurrentMeme(meme);
      onOpenMeme();
    },
    [onOpenMeme]
  );

  const handleUpvote = async (memeId: number) => {
    if (!account) {
      return handleNotConnected();
    }
    const upvoteMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/upvote/`,
      {
        method: "POST",
        body: JSON.stringify({
          id: memeId,
        }),
        headers,
      }
    );
    const upvotedMeme = await upvoteMemeResponse.json();
    setMemes((previousMemes) => [
      ...previousMemes.filter((m) => m.id !== memeId),
      upvotedMeme,
    ]);
    if (isOpenMeme) {
      setCurrentMeme(upvotedMeme);
    }
    return upvotedMeme;
  };

  const handleDownvote = async (memeId: number) => {
    const downvoteMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/downvote/`,
      {
        method: "POST",
        body: JSON.stringify({
          id: memeId,
        }),
        headers,
      }
    );
    const downvotedMeme = await downvoteMemeResponse.json();
    setMemes((previousMemes) => [
      ...previousMemes.filter((m) => m.id !== memeId),
      downvotedMeme,
    ]);
    if (isOpenMeme) {
      setCurrentMeme(downvotedMeme);
    }
    return downvotedMeme;
  };
  console.log("userMemes", userMemes);

  const renderMemes = (selectedMemes: MemeType[]) =>
    selectedMemes &&
    selectedMemes.map((m) => (
      <Box key={m.id} cursor="pointer" onClick={() => handleOpenMeme(m)}>
        <Tilt
          glareEnable
          glareMaxOpacity={0.05}
          scale={1.03}
          tiltMaxAngleX={7}
          tiltMaxAngleY={7}
        >
          <MemeCard
            handleDownvote={handleDownvote}
            handleUpvote={handleUpvote}
            meme={m}
          />
        </Tilt>
      </Box>
    ));
  if (profileName === null || userMemes?.detail === "Not Found") {
    return (
      <Stack>
        <Box textAlign="left" py="10">
          <Link href="/" passHref>
            <Button
              size="lg"
              rounded="full"
              variant="solid"
              bg="purple.200"
              border={`solid 5px ${borderColor}`}
              color="white"
              _hover={{
                bg: altColor,
                color,
              }}
              fontSize="xl"
              leftIcon={<FaArrowLeft />}
            >
              GO BACK!!
            </Button>
          </Link>
        </Box>
        <Heading>Data not found</Heading>
      </Stack>
    );
  }

  const allMemes = userMemes && renderMemes(userMemes);

  return (
    <Stack>
      <Box textAlign="left" py="10">
        <Link href="/" passHref>
          <Button
            size="lg"
            rounded="full"
            variant="solid"
            bg="purple.200"
            border={`solid 5px ${borderColor}`}
            color="white"
            _hover={{
              bg: altColor,
              color,
            }}
            fontSize="xl"
            leftIcon={<FaArrowLeft />}
          >
            GO BACK!!
          </Button>
        </Link>
      </Box>
      <HStack
        backgroundColor={bg}
        border={`5px solid ${borderColor}`}
        borderRadius="10px"
        padding="2rem"
        spacing="2rem"
      >
        <Blockies
          className="blockies"
          size={10}
          seed={profileName.toLowerCase()}
          scale={6}
        />

        <Stack>
          <Heading color="purple.200" size="lg">
            name: {profileName}
          </Heading>
          <Heading color="purple.200" size="md">
            karma: {userKarma}
          </Heading>
        </Stack>
      </HStack>
      <Heading>Memes</Heading>
      <SimpleGrid mt={6} columns={{ sm: 1, md: 4 }} spacing={10}>
        {userMemes !== null ? (
          allMemes
        ) : (
          <Heading size="sm">No memes found</Heading>
        )}
      </SimpleGrid>
      {currentMeme && (
        <MemeModal
          isOpen={isOpenMeme}
          onClose={onCloseMeme}
          meme={currentMeme}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
        />
      )}
    </Stack>
  );
}

export async function getServerSideProps({ params }) {
  let profileMemes: any;
  let profileData: any;
  const { memelordAddress } = params;

  try {
    profileData = await getProfileData(memelordAddress);
    profileMemes = await getMemes(memelordAddress);
    return {
      props: {
        profileName: profileData.displayName,
        userKarma: profileData.karma,
        userMemes: profileMemes.memes,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        profileName: null,
        userKarma: null,
        userMemes: null,
      },
    };
  }
}

export default Profile;

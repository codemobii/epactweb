import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Avatar, Center, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  BsAwardFill,
  BsInfoCircleFill,
  BsPlus,
  BsQuestionCircleFill,
  BsShieldFill,
} from "react-icons/bs";
import UserinfoAddon from "../../addons/userinfo.addon";
import AccountLayout from "../../components/layouts/account.layout";
import { getStrapiMedia } from "../../utils/media.util";

export default function AccountSettings(props) {
  const [user, setUser] = useState({});
  const [uploading, setUploading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const cookies = JSON.parse(props.session);

  const toast = useToast();

  const getItem = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${cookies && cookies.jwt}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((er) => console.log(er));
  };

  const upload = (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("files", file);
    setUploading(true);
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      data: formData,
      headers: {
        Authorization: `Bearer ${cookies && cookies.jwt}`,
      },
    })
      .then(({ data }) => {
        axios
          .put(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${
              cookies && cookies.user && cookies.user.id
            }`,
            {
              profileImage: data,
            },
            {
              headers: {
                Authorization: `Bearer ${cookies && cookies.jwt}`,
              },
            }
          )
          .then(() => {
            getItem();
            toast({
              title: "Success",
              description: "Update successful!",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          });
      })
      .catch((error) => {
        console.log("Error: ", error.message);

        toast({
          title: "Error",
          description: "Something went wrong, try again!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => setUploading(false));
  };

  useEffect(() => {
    if (cookies) {
      getItem();
    }
  }, [cookies]);

  const USER_DATA = [
    { label: "Username", value: user.username, type: "text", update: false },
    { label: "Email address", value: user.email, type: "email", update: false },
    {
      label: "Phone number",
      value: user.phone || "080**********",
      type: "phone",
      update: true,
    },
    // { label: "Password", value: "***********", type: "password", update: true },
  ];

  return (
    <AccountLayout title="Account details">
      <Stack spacing="30px">
        <Center>
          <Avatar
            name={user.username}
            src={user.profileImage && getStrapiMedia(user.profileImage)}
            pos="relative"
            size="2xl"
            cursor="pointer"
            onMouseOver={() => setShowInput(true)}
            onMouseOut={() => setShowInput(false)}
          >
            <Center
              pos="absolute"
              w="100%"
              h="100%"
              bg="rgba(0,0,0,0.8)"
              rounded="full"
              cursor="pointer"
              overflow="hidden"
              opacity={showInput ? "1" : uploading ? "1" : "0"}
              transition="all 0.3s ease"
            >
              {uploading ? (
                <Spinner color="white" />
              ) : (
                <BsPlus
                  size="38px"
                  color="white"
                  style={{ position: "absolute" }}
                />
              )}
              <input
                id="imageFile"
                type="file"
                onChange={upload}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "300px",
                  opacity: 1,
                  cursor: "pointer",
                  bottom: 0,
                }}
              />
            </Center>
          </Avatar>
        </Center>
        <Stack spacing="10px">
          {USER_DATA.map((data, key) => (
            <UserinfoAddon
              isEdit
              label={data.label}
              value={data.value}
              key={key}
              type={data.type}
              update={data.update}
              id={
                cookies.session &&
                cookies.session.user &&
                cookies.session.user.id
              }
              jwt={cookies.session && cookies.session.jwt}
              onEnd={getItem}
            />
          ))}
        </Stack>

        <Stack spacing="10px">
          {O_DATA.map((data, key) => (
            <UserinfoAddon value={data.value} icon={data.icon} key={key} />
          ))}
        </Stack>
      </Stack>
    </AccountLayout>
  );
}

const O_DATA = [
  { value: "Status", icon: <BsAwardFill /> },
  { value: "Help & Support", icon: <BsQuestionCircleFill /> },
  { value: "Privacy and Policy", icon: <BsShieldFill /> },
  { value: "About us", icon: <BsInfoCircleFill /> },
];

export async function getServerSideProps({ req, res }) {
  const { cookies: session } = req;

  if (req && session) {
    if (!session.session) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    }
  }

  return {
    props: { session: session.session },
  };
}

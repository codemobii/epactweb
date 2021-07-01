import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  BsAwardFill,
  BsInfoCircleFill,
  BsQuestionCircleFill,
  BsShieldFill,
} from "react-icons/bs";
import AccountInvestmentsAddon from "../../addons/acount_investments.addon";
import AdAddon from "../../addons/ad.addon";
import BalanceAddon from "../../addons/balance.addon";
import TableAddon from "../../addons/table.addon";
import UserinfoAddon from "../../addons/userinfo.addon";
import OutlineButton from "../../components/buttons/outline.button";
import AccountLayout from "../../components/layouts/account.layout";
import CardLayout from "../../components/layouts/card.layout";
import ListLayout from "../../components/layouts/list.layout";

export default function AccountSettings() {
  const [user, setUser] = useState({});
  const [cookies, setCookie] = useCookies(["session"]);

  const getItem = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${cookies.session && cookies.session.jwt}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    if (cookies) {
      getItem();
    }
  }, [cookies]);

  const USER_DATA = [
    { label: "Username", value: user.username, type: "text" },
    { label: "Email address", value: user.email, type: "email" },
    {
      label: "Phone number",
      value: user.phone || "080**********",
      type: "phone",
    },
    { label: "Password", value: "***********", type: "password" },
  ];

  return (
    <AccountLayout title="Account details">
      <Stack spacing="30px">
        <Stack spacing="10px">
          {USER_DATA.map((data, key) => (
            <UserinfoAddon
              isEdit
              label={data.label}
              value={data.value}
              key={key}
              type={data.type}
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

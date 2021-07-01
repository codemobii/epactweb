import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {
  FaTwitter,
  FaYoutube,
  FaInstagramSquare,
  FaFacebookSquare,
} from "react-icons/fa";
import { GlobalContext } from "../../pages/_app";
import { fetchAPI } from "../../utils/api.util";
import { getStrapiMedia } from "../../utils/media.util";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      target="_blank"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function FooterLayout() {
  const global = useContext(GlobalContext);

  const [pages, setPages] = useState([]);
  const [about, setAbout] = useState("");

  useEffect(async () => {
    fetchAPI("/about-us-card-one").then((res) => {
      setAbout(res.description);
    });
    fetchAPI("/pages").then((res) => {
      setPages(res);
    });
  }, []);

  return (
    <Box
      width="100%"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      marginBottom={{ base: "75px", md: 0 }}
    >
      <Container as={Stack} maxW={"container.lg"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>
              <Image
                cursor="pointer"
                src={getStrapiMedia(global.logo)}
                w="100px"
              />
            </ListHeader>
            <Text fontSize="sm">{about}</Text>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            {NAV_ITEMS.map((e, i) => (
              <Link key={i} href={e.href}>
                {e.label}
              </Link>
            ))}
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Page</ListHeader>
            {pages.map((e, i) => (
              <Link href={`/pages/${e.slug}`} key={i}>
                {e.title}
              </Link>
            ))}
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Install App</ListHeader>
            <Image
              src="https://www.reservamesa.cl/wp-content/uploads/2018/01/google-play-badge-e1515710938414-300x95.png"
              w="150px"
            />
            <Image
              src="https://www.reservamesa.cl/wp-content/uploads/2018/01/appstore_badge.png"
              w="150px"
            />
          </Stack>
        </SimpleGrid>
      </Container>
      <Image
        src="https://static.wixstatic.com/media/3db22c_f389411affe442c28fe600a606a71656~mv2.png/v1/fill/w_1583,h_142,al_c,q_85,usm_0.66_1.00_0.01/3db22c_f389411affe442c28fe600a606a71656~mv2.webp"
        w="100%"
        h="auto"
        opacity="0.2"
      />
      <Box color="white" bg="green.400">
        <Container
          as={Stack}
          maxW={"container.lg"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>{global.footer_text}</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={global.twitter}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href={global.facebook}>
              <FaFacebookSquare />
            </SocialButton>
            <SocialButton label={"Instagram"} href={global.instagram}>
              <FaInstagramSquare />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

const NAV_ITEMS = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "FAQs",
    href: "/faqs",
  },
  {
    label: "Feedback",
    href: "/contact",
  },
];

import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, Tooltip } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  
  const getChatPic = (chat) => {
    if(chat.isGroupChat) {
      return "https://icon-library.com/images/group-chat-icon/group-chat-icon-13.jpg"
    } else {
        const otherUser = chat.users.find((chatUser) => chatUser.name !== user.name)
        return otherUser.pic;
    }
  }

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      bg="teal"
      w={{ base: "100%", md: "21%" }}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "15px", md: "20px" }}
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color="white"
      >
        My Chats
        <GroupChatModal>
          <Button bg="teal" _hover={{ bg: "teal"}} _focus={{border: "none"}}>
            <Tooltip label={"create chat group"} placement="top-end" bg="white" color="black" hasArrow>
              <i class="fa fa-users" aria-hidden="true"></i>
            </Tooltip>
          </Button>
          
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        bg="teal"
        w="100%"
        h="100%"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Flex
                direction="row"
                align="center"
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#6bb5b5" : "teal"}
                _hover={{
                  bg: "#6bb5b5",
                }}
                color="white"
                px={3}
                py={2}
                key={chat._id}
              >
                <Avatar
                  mr={3}
                  size="sm"
                  cursor="pointer"
                  src={getChatPic(chat)}
                />
                <Box>
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box> 
              </Flex>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;

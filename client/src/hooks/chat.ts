import { useMemo } from "react";
import { Author } from "../types/index";
import ChatService from "../services/chat";

export const useChatService = async (author: Author): Promise<ChatService> => {
  const service = new ChatService(author);

  await service.init();

  return useMemo<ChatService>(() => {
    return service;
  }, [service]);
};

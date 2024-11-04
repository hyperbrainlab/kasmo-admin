import { AxiosPromise } from "axios";
import { client } from "./index";

export const sendNotificationMulticast = async (request: {
  title: string;
  body: string;
}): AxiosPromise<void> => {
  return client.post("/notification/all", request);
};

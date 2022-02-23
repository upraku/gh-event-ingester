import { EventPayload } from "./EventPayload";

export type ReleaseEventPayload = EventPayload & {
  payload: Release;
};

export type Release = {
  id: string;
  tagName: string;
  body: string;
  createdAt: Date;
  publshedAt: Date;
};

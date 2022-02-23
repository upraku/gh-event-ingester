export type EventPayload = {
  actionType: string;
  repoName: string;
  repoId: string;
  actorLogin: string;
  actorId: string;
  payload?: any;
  //Organisation details can be added too
};

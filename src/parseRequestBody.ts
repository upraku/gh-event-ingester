import { EventPayload } from "./types/EventPayload";

export type ParsedGithubEvent = {
  payload?: EventPayload;
  errorMessage?: String;
  isParsed: boolean;
};

export const parseRequestBody = (body: string): ParsedGithubEvent => {
  try {
    const githubPayload = JSON.parse(body);
    return {
      isParsed: true,
      payload: {
        actionType: githubPayload.action,
        repoName: githubPayload.repository.full_name,
        repoId: githubPayload.repository.id,
        actorLogin: githubPayload.sender.login,
        actorId: githubPayload.sender.Id,
        payload: githubPayload.release, //This has been to harcoded, need to refactor further to make it generic
      },
    };
  } catch (err) {
    return {
      isParsed: false,
      errorMessage: "Invalid body",
    };
  }
};

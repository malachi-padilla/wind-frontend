import { PersonalUserInfo } from "./models";

export interface UserContext {
  user: PersonalUserInfo | null | undefined;
  setFetchNew: any;
}

export interface UserContextNotNull {
  user: PersonalUserInfo;
  setFetchNew: any;
}

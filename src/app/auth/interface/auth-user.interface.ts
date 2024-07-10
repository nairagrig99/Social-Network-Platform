export interface AuthUserInterface {
  id: string;
  userID: string;
  name: string;
  surname: string;
  birthOfDate: string;
  gender: string;
  country: string;
  email: string;
  password: string;
  rePassword: string;
  headerImage?: string;
  allUserImage?: [];
  messages?: any;
  notifications?: any[];
  friendList?: [];
}

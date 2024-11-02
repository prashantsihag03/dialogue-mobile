import { RootState } from "..";

export const getLoggedIn = (state: RootState) => state.auth.loggedIn;

import {Profile} from "next-auth"

declare module "next-auth" {
    interface Profile extends Profile {
        picture? : string;
    }
}
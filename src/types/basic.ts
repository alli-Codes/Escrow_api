import { Request } from "express";

export interface Req extends Request {
  auth: {
    id: string;
  };
}

import { CoolConfig } from "@cool-midway/core";

export interface ExtendConfig extends CoolConfig {
  wxapi: {
    appid: string,
    secret: string,
    grant_type: string
  };
}

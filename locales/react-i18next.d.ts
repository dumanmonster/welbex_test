import { resources } from "./index";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: (typeof resources)["en"];
  }
}

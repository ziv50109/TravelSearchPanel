import React from "react";
import { storiesOf } from "@storybook/react";
import Mobile from "../src/activity/mobile";
import Pc from "../src/activity/pc";

storiesOf("當地遊", module)
  .add("Mobile", () => <Mobile />)
  .add("PC", () => <Pc />);

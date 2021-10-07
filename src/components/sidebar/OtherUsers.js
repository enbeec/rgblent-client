import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardHeader,
  Accordion as ACCORDION,
  AccordionGroup,
} from "@bootstrap-styled/v4";
import { useQuery } from "react-query";
import { MiniPalette } from "./MiniPalette.js";
import { AuthContext } from "../auth/AuthProvider.js";
import { authFetch } from "../../utils/fetch.js";
import { RainbowBackground } from "../../utils/animation.js";

export const OtherUsers = (props) => {
  const { profile } = useContext(AuthContext);
  const users = useQuery(
    "users",
    () => authFetch("/users").then((res) => res.json()),
    { noAuth: true, keepPreviousData: true }
  );

  const [currentAccordion, setCurrentAccordion] = useState("");

  return (
    <Card>
      {users.data.map((u) => {
        if (!u.colors.length || !u.palettes.length) return null;
        if (u.id === profile?.data.id) return null;
        return (
          <AccordionGroup activeAccordionName={currentAccordion}>
            <Card>
              <Accordion
                showRainbow={users.isLoading}
                name={u?.id || "...loading..."}
                onClick={() => setCurrentAccordion(u.id)}
                heading={<CardHeader>{u.name}</CardHeader>}
              >
                {u.palettes.map((p) => (
                  <MiniPalette palette={p} />
                ))}
              </Accordion>
            </Card>
          </AccordionGroup>
        );
      })}
    </Card>
  );
};

const Accordion = styled(ACCORDION)`
  ${({ showRainbow }) => showRainbow && RainbowBackground()}
  padding: 1rem;
  margin: 0;
`;

import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import {
  Card as CARD,
  CardHeader,
  Accordion as ACCORDION,
  AccordionGroup,
} from "@bootstrap-styled/v4";
import { useQuery } from "react-query";
import { MiniPalette } from "./MiniPalette.js";
import { Faves } from "./Faves.js";
import { AuthContext } from "../auth/AuthProvider.js";
import { authFetch } from "../../utils/fetch.js";
import { RainbowBackground } from "../../utils/animation.js";

export const OtherUsers = (props) => {
  const { profile } = useContext(AuthContext);
  const users = useQuery(
    "users",
    () => authFetch("/users", { noAuth: true }).then((res) => res.json()),
    { keepPreviousData: true, initialData: [] }
  );

  const [currentAccordion, _setCurrentAccordion] = useState("");
  const setCurrentAccordion = (newValue) => {
    if (newValue === currentAccordion) {
      _setCurrentAccordion("");
      return;
    }
    _setCurrentAccordion(newValue);
  };

  return (
    <>
      <AccordionGroup activeAccordionName={currentAccordion}>
        {users.data.map((u) => {
          if (!u.colors.length && !u.palettes.length) return null;
          if (u.id === profile?.data?.id) return null;
          return (
            <Card showRainbow={users.isLoading}>
              <Accordion
                showRainbow={users.isLoading}
                name={u?.id}
                heading={
                  <CardHeader onClick={() => setCurrentAccordion(u.id)}>
                    {u.name}
                  </CardHeader>
                }
              >
                {u.palettes.map((p) => (
                  <MiniPalette palette={p} isLoading={users.isLoading} />
                ))}
                {u.colors && <Faves colors={u.colors} />}
              </Accordion>
            </Card>
          );
        })}
      </AccordionGroup>
    </>
  );
};

const Accordion = styled(ACCORDION)`
  ${({ showRainbow }) =>
    showRainbow && RainbowBackground({ brightLimit: true })}
  padding: 0.4rem;
  margin: 0;
`;

const Card = styled(CARD)`
  margin: ${(props) => props.theme["$spacer-halved"]};
  margin-right: ${(props) => props.theme["$spacer-halved"]};

  ${({ showRainbow }) =>
    showRainbow && RainbowBackground({ brightLimit: true })}
`;

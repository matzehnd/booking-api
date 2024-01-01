import { FC } from "react";
import { Title } from "./Titel";
import { Descritption } from "./Descritption";

export const Accommodation: FC = () => {
  return (
    <div className="max-w-sm rounded-md shadow-sm p-6 border border-gray-400 bg-gray-100 flex-col space-y-5">
      <Title> Ugglans bo</Title>
      <Descritption>
        Das Eulennest - Für einen rustikal-romantischen Aufenthalt zu zweit
        inmitten von Pferden empfehlen wir Ihnen unser Gästehäuschen in der
        Dalarna-Bauart.
      </Descritption>
    </div>
  );
};

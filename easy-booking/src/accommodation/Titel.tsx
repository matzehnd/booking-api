import { FC, PropsWithChildren } from "react";

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="text-xl font-bold">{children}</div>
    </div>
  );
};

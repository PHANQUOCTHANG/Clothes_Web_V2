import { ElementType } from "react";

export interface ContactInfoItem {
  icon: ElementType;
  title: string;
  detail: string;
}

export interface ContactPageProps {
  createRipple: (event: React.MouseEvent<HTMLElement>) => void;
  setCurrentView: (view: string) => void;
}
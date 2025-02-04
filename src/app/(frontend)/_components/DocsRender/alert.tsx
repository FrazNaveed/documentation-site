import {
  Children,
  type ComponentPropsWithoutRef,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
} from "react";
import { AlertOctagonIcon, InfoIcon } from "lucide-react";
import "./index.module.scss";

export type MdxAlertProps = ComponentPropsWithoutRef<"div"> & {
  type: "info" | "danger";
};

export const Alert = ({
  type,
  className,
  children,
  ...props
}: MdxAlertProps) => {
  const childrenArr = Children.toArray(children).filter(
    isValidElement
  ) as ReactElement<PropsWithChildren>[];

  return (
    <div {...props} className={`alert ${type} ${className || ""}`}>
      <p className="alert-header">
        {type === "danger" ? <AlertOctagonIcon /> : <InfoIcon />}
        {childrenArr[0]?.props.children}
      </p>
      {childrenArr.slice(1)}
    </div>
  );
};

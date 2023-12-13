import { forwardRef } from "react";

interface ContainerVerticalAnimationProps {
  inView?: boolean;
  children: React.ReactNode;
}
export const ContainerVerticalAnimationComponent = (
  props: ContainerVerticalAnimationProps,
  ref: any
) => {
  return (
    <div
      className="ContainerVerticalAnimation"
      style={{
        transform: props.inView ? "none" : "translateY(-1px)",
        opacity: props.inView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.12s",
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
};

export const ContainerVerticalAnimation = forwardRef(
  ContainerVerticalAnimationComponent
);

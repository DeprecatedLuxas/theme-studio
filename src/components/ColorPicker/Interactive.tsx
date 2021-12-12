import useEventCallback from "@hooks/use-event-callback";
import { Interaction } from "@lib/types";
import { clamp } from "@lib/utils";
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
export interface InteractiveProps extends HTMLAttributes<HTMLDivElement> {
  onMove?: (interaction: Interaction, event: MouseEvent) => void;
  onDown?: (offset: Interaction, event: MouseEvent) => void;
}

export const getPosition = (
  node: HTMLDivElement,
  event: MouseEvent
): Interaction => {
  const rect = node.getBoundingClientRect();
  return {
    left: clamp(
      (event.pageX - (rect.left + window.pageXOffset)) / rect.width,
      0,
      1
    ),
    top: clamp(
      (event.pageY - (rect.top + window.pageYOffset)) / rect.height,
      0,
      1
    ),
    width: rect.width,
    height: rect.height,
    x: event.pageX - (rect.left + window.pageXOffset),
    y: event.pageY - (rect.top + window.pageYOffset),
  };
};

const Interactive = forwardRef<HTMLDivElement, InteractiveProps>(
  (props, ref) => {
    const { onMove, onDown, children, ...rest } = props;
    const container = useRef<HTMLDivElement>(null);

    const [isDragging, setDragging] = useState(false);

    const onMoveCallback = useEventCallback<Interaction, MouseEvent>(onMove);
    const onKeyCallback = useEventCallback<Interaction, MouseEvent>(onDown);

    const handleMove = useCallback(
      (event: MouseEvent) => {
        event.preventDefault();

        if (event.buttons > 0 && container.current) {
          onMoveCallback &&
            onMoveCallback(getPosition(container.current!, event), event);
        } else {
          setDragging(false);
        }
      },
      [onMoveCallback]
    );

    const handleMoveEnd = useCallback(() => setDragging(false), []);
    const toggleDocumentEvents = useCallback((state: boolean) => {
      const toggleEvent = state
        ? window.addEventListener
        : window.removeEventListener;
      toggleEvent("mousemove", handleMove);
      toggleEvent("mouseup", handleMoveEnd);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      toggleDocumentEvents(isDragging);
      return () => {
        isDragging && toggleDocumentEvents(false);
      };
    }, [isDragging, toggleDocumentEvents]);

    const handleMoveStart = useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();

        onKeyCallback &&
          onKeyCallback(
            getPosition(container.current!, event.nativeEvent),
            event.nativeEvent
          );
        setDragging(true);
      },
      [onKeyCallback]
    );
    return (
      <div {...rest} ref={container} tabIndex={0} onMouseDown={handleMoveStart}>
        {children}
      </div>
    );
  }
);

Interactive.displayName = "TStudioInteractive";

export default Interactive;

import useEventCallback from "@hooks/useEventCallback";
import { Interaction } from "@lib/types";
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import _ from "lodash";
interface InteractiveProps extends HTMLAttributes<HTMLDivElement> {
  onMove?: (interaction: Interaction, event: MouseEvent) => void;
  onDown?: (offset: Interaction, event: MouseEvent) => void;
}

export const getPosition = (
  node: HTMLDivElement,
  event: MouseEvent
): Interaction => {
  const rect = node.getBoundingClientRect();

  // Get user's pointer position from `touches` array if it's a `TouchEvent

  return {
    left: _.clamp(
      (event.pageX - (rect.left + window.pageXOffset)) / rect.width,
      0,
      1
    ),
    top: _.clamp(
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
  function Interactive(props, ref) {
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
      <div
        {...rest}
        ref={container}
        tabIndex={0}
        onMouseDown={handleMoveStart}
      />
    );
  }
);
export default Interactive;

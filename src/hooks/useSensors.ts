import * as tweenFunctions from "tween-functions";
import { FluidDragActions, SensorAPI } from "react-beautiful-dnd";
import { BoardPart, BoardSide, CardType } from "@/types/game.enum";

const draggableAttribute = "data-rbd-drag-handle-draggable-id";
const droppableAttribute = "data-rbd-droppable-id";

export interface UseSensorsReturn {
  scriptedSensor: (value: SensorAPI) => void;
  moveCardScript: (params: moveCardScriptParams) => void;
}
export interface moveCardScriptParams {
  card: CardType;
  to: BoardPart;
  side: BoardSide;
}

export const useSensors = (): UseSensorsReturn => {
  let sensorApi: SensorAPI | undefined;

  const scriptedSensor = (value: SensorAPI) => {
    sensorApi = value;
  };

  const getEndCoords = (
    target: Element,
    origin: Element
  ): { x: number; y: number } => {
    const targetCoords = target.getBoundingClientRect();
    const originCoords = origin.getBoundingClientRect();

    const startX = originCoords.x + originCoords.width / 2;
    const endX = targetCoords.x + targetCoords.width / 2;

    const startY = originCoords.y;
    const endY = targetCoords.y;

    return { x: endX - startX, y: endY - startY };
  };

  const getDDEl = (id: string, attribute: string): Element | null => {
    const draggableSelector = `[${attribute}='${id}']`;
    return document.querySelector(draggableSelector);
  };

  const moveCardScript = function start({
    card,
    to,
    side,
  }: moveCardScriptParams) {
    if (sensorApi === undefined) return;

    const originEl = getDDEl(`${card}${side}`, draggableAttribute);
    const targetEL = getDDEl(`${to}${side}`, droppableAttribute);

    const preDrag = sensorApi.tryGetLock(`${card}${side}`);

    if (!preDrag || !originEl || !targetEL) return;

    const startCoords = { x: 0, y: 0 };
    const endCoords = getEndCoords(targetEL, originEl);

    const points = [];
    const steps = 20;

    for (let i = 0; i < steps; i++)
      points.push({
        x: tweenFunctions.easeOutCirc(i, 0, endCoords.x, steps),
        y: tweenFunctions.easeOutCirc(i, 0, endCoords.y, steps),
      });

    const drag = preDrag.fluidLift(startCoords);

    moveStepByStep(drag, points);
  };

  return { scriptedSensor, moveCardScript };
};

function moveStepByStep(
  drag: FluidDragActions,
  values: { x: number; y: number }[] = [{ x: 0, y: 0 }]
) {
  requestAnimationFrame(() => {
    const newPosition = values.shift();

    if (!newPosition) return drag.drop();

    drag.move(newPosition);

    if (values.length) moveStepByStep(drag, values);
    else drag.drop();
  });
}

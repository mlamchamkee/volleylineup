import * as React from 'react';
import { useLayoutEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';

import { MAIN_THEME } from '../../utils/constants';
import { LineupType } from '../../utils/types';
import Player from '../components/Player';
import { useAppSelector } from '../redux/store';

const ANIMATION_MS = 400;

type OrderType = {
  6: Array<number>,
  7: Array<number>,
  8: Array<number>,
  9: Array<number>,
  10: Array<number>,
};

function isRotation(prev: LineupType, next: LineupType): boolean {
  if (prev.length !== next.length || prev.length < 2) return false;
  return (
    prev[0].num === next[next.length - 1].num
    && prev.slice(1).every((p, i) => p.num === next[i].num)
  );
}

function animateFlip(
  el: HTMLElement,
  prevRect: DOMRect,
  newRect: DOMRect,
) {
  const dx = prevRect.left - newRect.left;
  const dy = prevRect.top - newRect.top;

  if (dx === 0 && dy === 0) return;

  el.style.transform = `translate(${dx}px, ${dy}px)`;
  el.style.transition = 'none';
  el.style.willChange = 'transform';

  requestAnimationFrame(() => {
    el.style.transition = `transform ${ANIMATION_MS}ms ease-in-out`;
    el.style.transform = '';

    const cleanup = () => {
      el.style.willChange = '';
      el.removeEventListener('transitionend', cleanup);
    };
    el.addEventListener('transitionend', cleanup);
  });
}

function Court() {
  const { playerCount, currentLineup } = useAppSelector((state) => state.app);
  const cardRefs = useRef<Map<number, HTMLElement>>(new Map());
  const prevPositionsRef = useRef<Map<number, DOMRect>>(new Map());
  const prevLineupRef = useRef<LineupType>(currentLineup);

  const order: OrderType = {
    6: [99, 3, 2, 1, 99, 99, 4, 5, 0, 99],
    7: [99, 3, 2, 1, 99, 4, 5, 6, 0, 99],
    8: [99, 3, 2, 1, 99, 4, 5, 6, 7, 0],
    9: [4, 3, 2, 1, 99, 5, 6, 7, 8, 0],
    10: [5, 4, 3, 2, 1, 6, 7, 8, 9, 0],
  };

  const offNums: OrderType = {
    6: [],
    7: [4],
    8: [0, 4],
    9: [0, 4, 5],
    10: [0, 1, 5, 6],
  };

  useLayoutEffect(() => {
    const shouldAnimate = isRotation(prevLineupRef.current, currentLineup);

    currentLineup.forEach((player) => {
      const el = cardRefs.current.get(player.num);
      if (!el) return;

      const newRect = el.getBoundingClientRect();
      const prevRect = prevPositionsRef.current.get(player.num);

      if (shouldAnimate && prevRect) {
        animateFlip(el, prevRect, newRect);
      }

      prevPositionsRef.current.set(player.num, newRect);
    });

    prevLineupRef.current = currentLineup;
  }, [currentLineup]);

  const gridItems: Array<JSX.Element> = order[playerCount].map((num, slotIndex) => {
    const player = currentLineup[num];
    if (player) {
      let backgroundColor = MAIN_THEME.fontColor;
      if (offNums[playerCount].includes(num)) backgroundColor = MAIN_THEME.backgroundGrey;

      return (
        <Grid2 key={`slot-${slotIndex}`} item xs={2.4}>
          <Box
            ref={(el: HTMLDivElement | null) => {
              if (el) cardRefs.current.set(player.num, el);
              else cardRefs.current.delete(player.num);
            }}
            sx={{ overflow: 'visible' }}
          >
            <Player name={player.name} position={player.position} backgroundColor={backgroundColor} />
          </Box>
        </Grid2>
      );
    }
    return <Grid2 key={`empty-${slotIndex}`} item xs={2.4} />;
  });

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 1,
    }}
    >
      <Box sx={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center', maxWidth: 0.98, overflow: 'visible',
      }}
      >
        <Grid2 container spacing={1} sx={{ overflow: 'visible' }}>
          {gridItems}
        </Grid2>
      </Box>
    </Box>
  );
}

export default Court;

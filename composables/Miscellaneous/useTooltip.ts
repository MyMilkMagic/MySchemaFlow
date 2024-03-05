import anime from 'animejs/lib/anime.es.js';
import { arrow, flip, shift, computePosition } from '@floating-ui/dom';
import type { MaybeElement, Placement } from '@floating-ui/vue';
import type { Ref } from 'vue';

export function useTooltip(
  sourceEl: Readonly<Ref<MaybeElement<HTMLElement>>>,
  floatingEl: Readonly<Ref<MaybeElement<HTMLElement>>>,
  floatingArrow: Readonly<Ref<MaybeElement<HTMLElement>>>,
  initialPlacement: Placement = 'bottom',
) {
  const ArrowWidth = 6;
  const Offset = 15;
  let translateY = 0;
  let placement = '';

  const onBeforeEnter = (el: Element) => {
    if (el instanceof HTMLElement) {
      Object.assign(el.style, {
        opacity: 0,
        zIndex: -9999,
      });
    }
  };
  const onEnter = async (el: Element, done: () => void) => {
    const AreAllComponentsExist =
      !sourceEl.value || !floatingEl.value || !floatingArrow.value;
    if (AreAllComponentsExist) return;

    await nextTick();

    const IsHTMLInstance =
      sourceEl.value instanceof HTMLElement &&
      floatingEl.value instanceof HTMLElement &&
      floatingArrow.value instanceof HTMLElement;

    if (IsHTMLInstance) {
      const Middlewares = [
        shift(),
        flip(),
        arrow({ element: floatingArrow.value }),
      ];
      const {
        x,
        y,
        middlewareData,
        placement: Placement,
      } = await computePosition(sourceEl.value, floatingEl.value, {
        middleware: Middlewares,
        placement: initialPlacement,
      });
      placement = Placement;
      translateY =
        placement === 'bottom'
          ? y + ArrowWidth
          : placement === 'top'
            ? y - ArrowWidth
            : y;
      const Transform =
        placement === 'bottom'
          ? `translateX(${x}px) translateY(${translateY + Offset}px)`
          : placement === 'left'
            ? `translateX(${x - ArrowWidth}px) translateY(${translateY - Offset}px)`
            : `translateX(${x}px) translateY(${translateY - Offset * 2}px)`;

      // Check arrow placement
      if (placement === 'bottom') {
        Object.assign(floatingArrow.value.style, {
          left:
            middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : 0,
          top:
            middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : 0,
        });
      } else if (placement === 'top') {
        Object.assign(floatingArrow.value.style, {
          left:
            middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : 0,
          top: '100%',
          transform: `rotate(180deg)`,
        });
      } else if (placement === 'left') {
        Object.assign(floatingArrow.value.style, {
          right: `-${ArrowWidth * 2}px`, // Need to multiply by each side
          top:
            middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : 0,
          transform: `rotate(90deg)`,
        });
      }

      Object.assign(floatingEl.value.style, {
        zIndex: null,
        top: 0,
        left: 0,
        transform: Transform,
      });

      anime({
        targets: el,
        translateY: translateY,
        opacity: 1,
        easing: 'easeOutExpo',
        duration: 350,
        complete: done,
      });
    }
  };
  const onLeave = (el: Element, done: () => void) => {
    const TranslateY =
      placement === 'bottom' ? translateY + Offset : translateY - Offset;

    anime({
      targets: el,
      translateY: TranslateY,
      opacity: 0,
      easing: 'easeOutExpo',
      duration: 150,
      complete: done,
    });
  };

  return {
    onBeforeEnter,
    onEnter,
    onLeave,
  };
}

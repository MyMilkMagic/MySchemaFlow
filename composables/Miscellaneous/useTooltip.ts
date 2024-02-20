import anime from 'animejs/lib/anime.es.js';
import { arrow, flip, shift, computePosition } from '@floating-ui/dom';
import type { MaybeElement } from '@floating-ui/vue';
import type { Ref } from 'vue';

export function useTooltip(
  sourceEl: Readonly<Ref<MaybeElement<HTMLElement>>>,
  floatingEl: Readonly<Ref<MaybeElement<HTMLElement>>>,
  floatingArrow: Readonly<Ref<MaybeElement<HTMLElement>>>,
) {
  const ArrowWidth = 6;
  const Offset = 15;
  let translateY = 0;

  const onBeforeEnter = (el: Element) => {
    if (el instanceof HTMLElement) {
      Object.assign(el.style, {
        opacity: 1,
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
      const { x, y, middlewareData } = await computePosition(
        sourceEl.value,
        floatingEl.value,
        {
          middleware: Middlewares,
        },
      );

      translateY = y + ArrowWidth;

      Object.assign(floatingArrow.value.style, {
        left:
          middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : 0,
        top:
          middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : 0,
      });

      Object.assign(floatingEl.value.style, {
        zIndex: null,
        opacity: 1,
        top: 0,
        left: 0,
        transform: `translateX(${x}px) translateY(${translateY + Offset}px)`,
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
    anime({
      targets: el,
      translateY: translateY + Offset,
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

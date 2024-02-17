import anime from 'animejs/lib/anime.es.js';
import { arrow, flip, shift, useFloating, autoUpdate } from '@floating-ui/vue';
import type { MaybeElement } from '@floating-ui/vue';
import type { Ref } from 'vue';

export function useTooltip(
  sourceEl: Readonly<Ref<MaybeElement<HTMLElement>>>,
  floatingEl: Readonly<Ref<MaybeElement<HTMLElement>>>,
  floatingArrow: Readonly<Ref<MaybeElement<HTMLElement>>>,
  isOpen: Ref<boolean>,
) {
  const {
    floatingStyles,
    placement,
    middlewareData,
    x,
    y,
    strategy,
    isPositioned,
    update,
  } = useFloating(sourceEl, floatingEl, {
    middleware: [shift(), flip(), arrow({ element: floatingArrow })],
    whileElementsMounted: autoUpdate,
    open: isOpen,
  });
  const arrowStyles = computed(() => {
    return {
      left:
        middlewareData.value.arrow?.x != null
          ? `${middlewareData.value.arrow.x}px`
          : 0,
      top:
        middlewareData.value.arrow?.y != null
          ? `${middlewareData.value.arrow.y}px`
          : 0,
    };
  });
  const ArrowWidth = 6;
  const Offset = 15;

  const onBeforeEnter = (el: HTMLElement) => {
    Object.assign(el.style, {
      opacity: 0,
      transform: `translateX(-10000%)`,
    });
  };
  const onEnter = async (el: HTMLElement, done: () => void) => {
    await nextTick();

    const checkDOMExistence = () => {
      setTimeout(() => {
        if (!isPositioned.value) checkDOMExistence();

        const TranslateY = y.value + ArrowWidth;

        //
        Object.assign(el.style, {
          opacity: 1,
          transform: `translateX(${x.value}px) translateY(${TranslateY + Offset}px)`,
        });

        anime({
          targets: el,
          translateY: TranslateY,
          opacity: 1,
          easing: 'easeOutExpo',
          duration: 350,
          complete: done,
        });
      }, 150);
    };
    checkDOMExistence();
  };
  const onLeave = (el: HTMLElement, done: () => void) => {
    const TranslateY = y.value + ArrowWidth;
    anime({
      targets: el,
      translateY: TranslateY + Offset,
      opacity: 0,
      easing: 'easeOutExpo',
      duration: 350,
      complete: done,
    });
  };

  return {
    floatingStyles,
    arrowStyles,
    placement,
    middlewareData,
    onBeforeEnter,
    onEnter,
    onLeave,
  };
}

import anime from 'animejs/lib/anime.es.js';

export const addNoteItemAnimation = () => {
  anime({
    targets: '.note-item',
    translateX: [100, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutExpo',
    delay: anime.stagger(100),
  });
};

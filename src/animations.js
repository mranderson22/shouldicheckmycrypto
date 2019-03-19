import posed from 'react-pose';

// Reveal "yes" or "no" animation
export const Reveal = posed.div({
  hidden: {
    opacity: 0,
    transition: { duration: 500 },
    x: 0,
    y: -10
  },
  visible: {
    opacity: 1,
    transition: { duration: 999 },
    x: 0,
    y: 0
  },
  stationary: {
    opacity: 1,
    transition: { duration: 999 },
    x: 0,
    y: 0
  }
});

// Reveal lock or arrows on main page animation
export const Reveal2 = posed.div({
  hidden: {
    opacity: 0,
    transition: { duration: 500 },
    x: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    transition: { duration: 1000 },
    x: 0,
    y: 0,
    delay: 200
  }
});

export const ResizeNoChartActual = posed.div({
  initial: {
    height: '55vh'
  },
  resized: {
    height: '37.5vh'
  }
});

export const Reveal3 = posed.div({
  hidden: {
    opacity: 0,
    transition: { duration: 800 },
    delay: 200
  },
  visible: {
    opacity: 1,
    transition: { duration: 800 },
    delay: 200
  },
  secondary: {
    opacity: 1,
    transition: { duration: 800 },
    delay: 200
  },
  movedOver: {
    opacity: 1,
    transition: { duration: 800 },
    delay: 200
  },
  fullSize: {
  }
});

export const Reveal4 = posed.div({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 900 },
    delay: 400
  },
  visible2: {
    opacity: 1,
    transition: { duration: 900 },
    delay: 400
  },
  visible3: {
    opacity: 1,
    transition: { duration: 900 },
    delay: 400
  }
});

export const Resize = posed.div({
  initial: {

  },
  resized: {

  },
  movedOver: {

  }

});

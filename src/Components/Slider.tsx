import styled from 'styled-components';
import { IMovie } from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { makeImgPath } from '../Routes/utils';

interface ISlider {
  data: IMovie[];
}

const Div = styled(motion.div)`
  position: relative;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  top: -100px;
  position: absolute;
`;

const MovieEl = styled(motion.div)`
  background-color: ${({ theme }) => theme.black.lighter};
  height: 150px;
  background-position: center;
  background-size: cover;
  > img {
    height: 150px;
    width: 100%;
    display: block;

    object-fit: cover;
  }
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 18px;
  opacity: 0;
  background-color: ${({ theme }) => theme.black.lighter};
  width: 100%;
  height: 96px;
  > h4 {
    text-align: center;
    font-size: 16px;
  }
`;

const rowVar = {
  hidden: {
    x: window.innerWidth - 2.5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth + 2.5,
  },
};

const boxVar = {
  normal: {
    scale: 1,
    transition: {
      type: 'tween',
    },
  },
  hover: {
    zIndex: 99,
    scale: 1.5,
    y: -64,
    transition: {
      duration: 0.3,
      delay: 0.5,
      type: 'tween',
    },
  },
};
const infoVar = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.5,
      type: 'tween',
    },
  },
};

const Slider: React.FC<ISlider> = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 6;
  const indexLength = Math.floor((data.length - 1) / offset);

  const changeIndex = (direction: number) => {
    if (leaving) return;
    else {
      setIndex((prev) =>
        prev + direction >= indexLength ? 0 : prev + direction
      );
    }
  };
  return (
    <Div
      onClick={() => {
        setLeaving(true);
        changeIndex(1);
      }}
    >
      <AnimatePresence onExitComplete={() => setLeaving(false)} initial={false}>
        <Row
          transition={{ type: 'tween', duration: 1 }}
          key={index}
          variants={rowVar}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {data
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((v) => (
              <MovieEl
                variants={boxVar}
                whileHover="hover"
                initial="normal"
                key={v.id}
                transition={{ type: 'tween' }}
              >
                <img src={makeImgPath(v.backdrop_path, 'w500')} />
                <Info variants={infoVar}>
                  <h4>{v.title}</h4>
                </Info>
              </MovieEl>
            ))}
        </Row>
      </AnimatePresence>
    </Div>
  );
};

export default Slider;
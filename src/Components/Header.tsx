import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, Outlet, useMatch } from 'react-router-dom';
import { useState } from 'react';

const Head = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  background-color: #000;
  font-size: 12px;
  color: #fff;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.svg)`
  margin: 0 50px;
  height: 60px;
  width: auto;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  margin-right: 20px;
  position: relative;
  color: ${({ theme }) => theme.white.darker};
  transition: color 0.3 ease-in-out;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${({ theme }) => theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: ${({ theme }) => theme.red};
  bottom: -6px;
  margin: 0 auto;
  left: 0;
  right: 0;
  border-radius: 100%;
`;

const Search = styled.span`
  svg {
    fill: ${({ theme }) => theme.white.lighter};
    width: 16px;

    path {
      fill: ${({ theme }) => theme.white.lighter};
    }
  }
`;

const Div = styled.div`
  margin-top: 80px;
`;

const logoVar = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0.5],
    scale: [1, 1.5, 1],
    transition: {},
  },
};

const Header = () => {
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('/tv');
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <Head>
        <Col>
          <Logo
            variants={logoVar}
            initial="normal"
            whileHover="active"
            height="800"
            width="1200"
            viewBox="-153.6 -69.1855 1331.2 415.113"
          >
            <motion.path
              fill="#d81f26"
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676L44.051 119.724v151.073C28.647 272.418 14.594 274.58 0 276.742V0h41.08l56.212 157.021V0h43.511zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461V0h119.724v43.241h-76.482zm237.284-58.104h-44.862V242.15c-14.594 0-29.188 0-43.239.539V43.242h-44.862V0H463.22zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433V0h120.808v43.241h-78.375zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676V0h43.24zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242V0h-42.43zM1024 0l-54.863 131.615L1024 276.742c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75L871.576 0h46.482l28.377 72.699L976.705 0z"
            />
          </Logo>
          <Items>
            <Item>
              <Link to={'/'}>Home</Link>
              {homeMatch && <Circle layoutId="cir" />}
            </Item>
            <Item>
              <Link to="/tv">TV Shows</Link>
              {tvMatch && <Circle layoutId="cir" />}
            </Item>
          </Items>
        </Col>
        <Col>
          <Search onClick={() => setSearchOpen((prev) => !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
            </svg>
          </Search>
        </Col>
      </Head>
      <Div>
        <Outlet />
      </Div>
    </>
  );
};

export default Header;

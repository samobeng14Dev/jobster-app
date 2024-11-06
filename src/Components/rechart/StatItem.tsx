import React from 'react';
import Wrapper from '../../assets/wrappers/StatItem';



// Define types for the props passed to StatItem
interface StatItemProps {
  count: number | string; // 'count' could be a number or a string
  title: string;
  icon: React.ReactNode;  // 'icon' can be any valid React element (e.g., SVG, Icon component)
  color: string;          // 'color' is used for text and border colors
  bcg: string;            // 'bcg' is used for the background of the icon container
}

const StatItem: React.FC<StatItemProps> = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;

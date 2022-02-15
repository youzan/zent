import { FC, useEffect, useRef, useState } from 'react';
import Pop from '../pop';

interface ITreeContentProps {
  showPop?: boolean;
}

export const TreeContent: FC<ITreeContentProps> = ({ children, showPop }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [popVisible, setPopVisible] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    const { scrollWidth, clientWidth } = contentRef.current;
    setIsOverflowing(scrollWidth > clientWidth);
  }, [contentRef]);

  return (
    <Pop
      centerArrow
      content={children}
      visible={popVisible}
      position="top-left"
      onVisibleChange={visible => setPopVisible(visible)}
      trigger={showPop && isOverflowing ? 'hover' : 'none'}
    >
      <span className="zent-tree-content" ref={contentRef}>
        {children}
      </span>
    </Pop>
  );
};

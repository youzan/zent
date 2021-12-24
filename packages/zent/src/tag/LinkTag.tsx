import { forwardRef } from 'react';
import Icon from '../icon';
import Tag, { ITagProps } from './Tag';

export interface ILinkTagProps
  extends Omit<ITagProps, 'closable' | 'closeButtonStyle' | 'size'> {
  linkIconStyle?: React.CSSProperties;
}

export const LinkTag = forwardRef<HTMLDivElement, ILinkTagProps>(
  ({ className, children, linkIconStyle, ...rest }, ref) => {
    return (
      <Tag className={`zent-link-tag ${className}`} ref={ref} outline {...rest}>
        <div className="zent-link-tag-content">{children}</div>
        <Icon
          type="right"
          className="zent-link-tag-right-icon"
          style={linkIconStyle}
        />
      </Tag>
    );
  }
);

LinkTag.displayName = 'ZentLinkTag';

export default LinkTag;

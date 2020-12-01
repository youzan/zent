import reactCSS from '../helpers/reactcss';

export const Swatch = ({ color, style, onClick, title = color }) => {
  const styles: any = reactCSS(
    {
      default: {
        swatch: {
          background: color,
          height: '100%',
          width: '100%',
          cursor: 'pointer',
        },
      },
      custom: {
        swatch: style,
      },
    },
    'custom'
  );

  const handleClick = e => {
    onClick(color, e);
  };

  return <div style={styles.swatch} onClick={handleClick} title={title} />;
};

export default Swatch;

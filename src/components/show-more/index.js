import { useTheme } from '@mui/material';

export default function ShowMore({ children, onViewRow }) {
  const theme = useTheme();
  const MoreComponent = ({ onClick }) => {
    return (
      <div
        style={{ cursor: 'pointer', color: theme.palette.mode == 'dark' ? 'red' : 'blue' }}
        onClick={() => {
          onViewRow();
        }}
      >
        View More
      </div>
    );
  };
  return (
    <div style={{ width: '100%' }}>
      {/* <ReactShowMoreText
        lines={2}
        more={<MoreComponent></MoreComponent>}
        less={<LessComponent></LessComponent>}
        onClick={(e) => {
          onViewRow();
        }}
        expanded={false}
        width={600}
        truncatedEndingComponent={'...'}
      >
        {children}
      </ReactShowMoreText> */}
      {children?.toString().slice(0, 200)}...
      <MoreComponent onClick={onViewRow}></MoreComponent>
    </div>
  );
}

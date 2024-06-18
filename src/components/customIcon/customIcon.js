import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
// ----------------------------------------------------------------------
const CustomIcon = forwardRef(({ icon, width = 20, sx, ...other }) => (
  <Box className="component-iconify" icon={icon} sx={{ width, height: width, ...sx }} {...other}>
    <img src={'/assets/icons/medical/' + icon} width={width} height={width}></img>
  </Box>
));

CustomIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  width: PropTypes.number,
};

export default CustomIcon;

import { useState, useEffect } from 'react';

import { LinearProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export const FileTrainingProgress = ({
  total,
  count,
  title,
  filename,
  status,
  totalPages,
  totalTokens,
  isTrain,
}) => {
  const renderFileStatus = (file_status) => {
    return (
      <>
        {file_status.map((item, key) => {
          return (
            <Box display={'flex'}>
              <Typography variant="body2" mr={3} color="textSecondary">
                {item.filename.slice(0, 30)}...{'.pdf'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.status}
              </Typography>
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Box display="flex" alignItems="center" width={'100%'} p={3}>
        <Box width="100%" mr={3}>
          <LinearProgress
            variant="determinate"
            value={count == 0 || total == 0 ? 0 : parseInt((count * 100) / total)}
          />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {count == 0 || total == 0 ? 0 : parseInt((count * 100) / total)}%
            {/* {count} / {total} */}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="flex-start" flexDirection={'column'}>
        <Box width="100%" mr={3} alignItems={'center'}>
          <Typography variant="body2" color="textSecondary">
            {title}
          </Typography>
        </Box>
        <Box width="100%" mr={3}>
          {isTrain ? (
            <>
              Documents: {total},  Pages: {totalPages},  Tokens: {totalTokens}
            </>
          ) : (
            renderFileStatus(status)
          )}
        </Box>
      </Box>
    </>
  );
};

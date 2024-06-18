import { useState, useEffect, use } from 'react';

//@import mui component
import { Box, Stack, useTheme } from '@mui/system';
import {
  Badge,
  Typography,
  Tooltip,
  InputBase,
  Dialog,
  DialogActions,
  Button,
  CircularProgress,
  FormGroup,
} from '@mui/material';

import { Icon } from '@iconify/react';
import SendIcon from '@mui/icons-material/Send';

import PDFViewer from 'src/components/PDFviewer/PDFViewer';
import { useBoolean } from 'src/hooks/use-boolean';
import { HOST_API } from 'src/config-global';
import { GetAnswerFromPrompt } from 'src/api/prompt';
import { ThreeDots } from 'react-loader-spinner';
import { useAuthContext } from 'src/auth/hooks';

export default function PromptDetail() {
  const theme = useTheme();
  const { promptData, savePrompt } = useAuthContext();

  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  const [isLoading, setLoading] = useState(false);
  const pdfView = useBoolean();
  const [file_name, setFileName] = useState('');
  const [page_number, setPageNumber] = useState(0);

  const handleEnter = async () => {
    setLoading(true);
    await GetAnswerFromPrompt(title).then((res) => {
      console.log(res);
      if (res.isError == 'success') {
        let tempData = data;
        let newData = {
          title: title,
          answer: res.answers,
        };
        tempData.push(newData);
        console.log('tempData', tempData);
        setData(tempData);
        savePrompt(tempData)
      } else if (res.isError == 'server_issue') {
        setData([
          { answer: 'Now The server has some problem, so please try it again after 1 min.' },
        ]);
      } else {
        let tempData = data;
        let newData = {
          title: title,
          answer: res.answers,
        };
        console.log('tempData', tempData);
        tempData.push(newData);
        setData(tempData);
        savePrompt(tempData)
      }
    });
    setLoading(false);
  };
  const renderAnswer = (answers) => {
    return (
      <>
        {answers?.map((item) => {
          return (
            <Stack>
              <Typography fontSize={'16px'}>
                {item.answer}
                <Tooltip
                  arrow
                  title={item.file_name + ' ' + item.page_number + ' page'}
                  sx={{ fontSize: '14px', padding: '4px', userSelect: 'none' }}
                >
                  {
                    parseInt(item.page_number) > 0 ? <Badge
                      color="primary"
                      badgeContent={item.order == 0 ? 1 : item.order}
                      style={{ marginLeft: '15px', cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => {
                        setFileName(item.file_name);
                        setPageNumber(item.page_number);
                        pdfView.onTrue();
                      }}
                    ></Badge> :
                      <></>
                  }

                </Tooltip>
              </Typography>
            </Stack>
          );
        })}
      </>
    );
  };
  useEffect(() => {
    console.log("promptData:", promptData);
    if (promptData) {
      setData(promptData)
    } else {
      setData([])
    }
  }, []);
  return (
    <Stack direction={'column'} spacing="5px">
      <Box padding={'15px'} height={'60vh'} overflow={'scroll'} position="relative">
        {data?.map((item) => {
          return (
            <Stack
              mb={'20px'}
              sx={{
                background: theme.palette.mode == 'dark' ? '#728d86' : '#e7e7e7',
                padding: '10px',
                borderRadius: '20px',
              }}
            >
              <Typography
                fontSize={'24px'}
                fontWeight={'900'}
                mb={'20px'}
                width={'fit-content'}
                padding={'4px'}
                borderRadius={'5px'}
              >
                {item.title}
              </Typography>

              <Stack flexDirection={'row'} spacing={'10px'} alignItems="center" mb={'20px'}>
                <Icon icon="ic:round-source" width={'30px'} height={'30px'} color="black"></Icon>
                <Typography fontSize={'16px'} fontWeight={'800'} letterSpacing={'2px'}>
                  Answer
                </Typography>
              </Stack>
              <Stack flexDirection={'column'} spacing={'20px'} paddingLeft={'20px'}>
                {renderAnswer(item.answer)}
              </Stack>
            </Stack>
          );
        })}

        {isLoading ? (
          <Box width={'100%'} display={'flex'} flexDirection={'column'}>
            <Typography fontSize={'24px'} fontWeight={'900'} mb={'20px'}>
              {title}
            </Typography>
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Typography variant='subtitle2' ml={2}>Instantdocs can make mistakes. Please double- check responses.</Typography>

      <Box
        display={'flex'}
        alignItems={'center'}
        sx={{
          width: '100%',
          background: theme.palette.mode == 'dark' ? '#161C24' : 'white',
          boxShadow: '0 0 5pt 2pt #D3D3D3',
          borderRadius: '100px',
          border: 'solid 1.5px #D3D3D3',
          zIndex: 9,
        }}
      >
        <InputBase
          fullWidth
          focused
          style={{
            borderColor: 'none',
            border: 'none',
            height: '60px',
            color: theme.palette.mode == 'dark' ? 'white' : 'black',
          }}
          sx={{ paddingX: '15px', fontSize: '38' }}
          placeholder="Ask me anything"
          value={value}
          onChange={(e) => {
            setTitle(e.target.value);
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              console.log('enter key event happend');
              handleEnter();
              setValue('');
            }
          }}
        ></InputBase>
        <Box height={'60px'}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            style={{ height: '100%', width: '100px', borderRadius: '30px' }}
            color="primary"
            onClick={() => {
              handleEnter();
              setValue('');
            }}
          ></Button>
        </Box>
      </Box>
      <Dialog fullScreen open={pdfView.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              p: 1.5,
            }}
          >
            <Button color="primary" variant="contained" onClick={pdfView.onFalse}>
              Back
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer
              fileUrl={HOST_API + '/assets/' + file_name}
              pageNumber={page_number}
            ></PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </Stack>
  );
}

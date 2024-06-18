import { useState, useEffect, useCallback } from 'react';

import { useBoolean } from 'src/hooks/use-boolean';
// import { Shake } from 'reshake'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { CustomIcon } from 'src/components/customIcon';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';

// import { MedicalIconAmbulance } from '@iconify/icons-medical-icon';

import { IconSearch } from 'src/utils/icons';

import { fDate } from 'src/utils/format-time';
import TimeLineSummaryTable from './timeline-summary-table';
import { InputAdornment, InputBase, Popover } from '@mui/material';
import CustomPopover from 'src/components/custom-popover/custom-popover';
import axios from 'axios';
import styled from 'styled-components';
import { InfinitySpin } from 'react-loader-spinner';

export default function CustomizedTimeline({ data, setTableData, editMode, setOldData, undoMode }) {
  const { enqueueSnackbar } = useSnackbar();

  const [facilityData, setFacilityData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const view = useBoolean();
  const iconPicker = useBoolean();

  const [searchQuery, setSearchQuery] = useState('');
  const [iconList, setIconList] = useState([]);
  const [selectedData, setSelectedData] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFacilityData(data);
    console.log(facilityData);
  }, [data]);

  const handleOnclickDate = (id) => {
    let tempData = facilityData.filter((item) => item.id == id);
    setSummaryData(tempData);
    view.onTrue();
  };
  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      setLoading(true)
      const url = "https://iconfinder-api-auth.herokuapp.com/v4/icons/search?query=" + searchQuery;
      // const options = {
      // method: 'GET',
      // headers: {
      //   accept: 'application/json',
      //   Authorization: 'Bearer X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1'
      // },
      // };
      axios.get(url).then(res => {
        setIconList(res.data.icons)
        setLoading(false)
      })
        .catch(err => {
          console.log(err);
          setLoading(false)
        })
    }
  }

  const selectIcon = (url) => {
    if (selectedData < 0 || selectedData >= facilityData.length) {
      enqueueSnackbar('Select Icon');
      return;
    }
    undoMode.onTrue()
    setOldData(facilityData)

    let data = [...facilityData.slice(0, selectedData), { ...facilityData[selectedData], icon: url }, ...facilityData.slice(selectedData + 1)]

    setFacilityData(data)
    setTableData(data)
    iconPicker.onFalse()
  }

  return (
    <>
      {facilityData.length > 0 ? (
        <>
          <Timeline
            position="alternate"
            style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {facilityData.map((item, key) => {
              return (
                <TimelineItem
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '220px',
                    justifyContent: 'end',
                    cursor: 'pointer',
                  }}
                  sx={{ py: 2 }}
                  key={key}
                  onClick={() => {
                    if (!editMode) {
                      handleOnclickDate(item.id);
                    }
                  }}
                >
                  <TimelineContent
                    sx={{ py: '12px', px: 2 }}
                    style={{ textAlign: 'center', alignContent: 'end' }}
                  >
                    <Typography fontWeight={700} mb={2}>
                      {item.activity_summarized}
                    </Typography>
                    <Typography color={'blue'}>
                      {item.signer ? item.signer : item.doctor_name}
                    </Typography>
                  </TimelineContent>
                  <TimelineSeparator style={{ flexDirection: 'row' }}>
                    <TimelineConnector style={{ width: '92px', height: '3px' }} />
                    {/* <Shake
                      h={3}
                      v={2}
                      r={10}
                      dur={300}
                      int={23.7}
                      max={66}
                      fixed={true}
                      fixedStop={false}
                      freez={false}> */}


                    {
                      // item.icon ?
                      editMode ?
                        <Box
                          sx={{ position: "relative" }}
                          onClick={() => { setSelectedData(key); editMode && iconPicker.onTrue() }}
                        >
                          <TimelineDot>

                            <VibratingImage
                              src={item.icon || '/assets/icons/medical/' + IconSearch(item.activity).icon}
                              alt="Vibrating Image"
                              width={'40px'}
                              height={'40px'}
                            >
                            </VibratingImage>
                          </TimelineDot>

                          <Iconify icon="eva:minus-fill" sx={{ borderRadius: "50%", backgroundColor: "gray", position: "absolute", left: "35px", top: "5px" }} />
                        </Box>
                        :
                        <TimelineDot>
                          <img
                            src={item.icon || '/assets/icons/medical/' + IconSearch(item.activity).icon}
                            width={'40px'}
                            height={'40px'}
                            onClick={() => { setSelectedData(key); editMode && iconPicker.onTrue() }}

                          />
                        </TimelineDot>

                      // <CustomIcon
                      //   icon={IconSearch(item.activity).icon}
                      //   width={'43px'}
                      //   height={'43px'}
                      //   onClick={() => { setSelectedData(key); editMode && iconPicker.onTrue() }}
                      // ></CustomIcon>
                    }

                    {/* </Shake> */}

                    <TimelineConnector style={{ width: '92px', height: '3px' }} />
                  </TimelineSeparator>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                    style={{ flex: 'none', borderBottom: 'solid 1px blue' }}
                  >
                    {item.visit_date == 'Unknown'
                      ? 'Unknown'
                      : fDate(item.visit_date, 'MM-dd-yyyy')}
                  </TimelineOppositeContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </>
      ) : (
        <></>
      )
      }
      <Dialog fullScreen open={view.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              p: 1.5,
            }}
          >
            <Button color="inherit" variant="contained" onClick={view.onFalse}>
              Close
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1 }}>
            <TimeLineSummaryTable data={summaryData}></TimeLineSummaryTable>
          </Box>
        </Box>
      </Dialog>
      <CustomPopover
        open={iconPicker.value}
        onClose={() => iconPicker.onFalse()}
        arrow='bottom-center'
        sx={{ width: "600px", maxWidth: "600px", minHeight: "200px", maxHeight: "400px", overflowY: "scroll", marginTop: "200px" }}
      >
        <Box sx={{ p: 2, borderBottom: `solid 1px gray` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e)}
            onKeyDown={(e) => handleEnter(e)}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={<Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>}
            inputProps={{
              sx: { typography: 'h6' },
            }}
          />
        </Box>

        <Box sx={{ pl: 2 }}>
          {
            loading ?
              <Box width={'100%'}
                sx={{ textAlign: "center" }}
              >
                <InfinitySpin
                />
              </Box> :
              iconList?.length > 0 && iconList.map((item, index) => (
                <img
                  key={index}
                  src={item.raster_sizes[item.raster_sizes.length - 1].formats[0].preview_url}
                  width={'40px'}
                  height={'40px'}
                  style={{ margin: "3px", cursor: "pointer" }}
                  onClick={() => selectIcon(item.raster_sizes[item.raster_sizes.length - 1].formats[0].preview_url)}
                />
              ))
          }

        </Box>

      </CustomPopover>

    </>
  );
}


const VibratingImage = styled.img`
  animation: vibrate 1s linear infinite;
`;

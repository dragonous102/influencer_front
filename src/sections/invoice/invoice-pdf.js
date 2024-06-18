import { useState, useEffect, useMemo } from 'react';
import { Page, View, Text, Font, Image, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { IconSearch } from 'src/utils/icons';
import { fDate } from 'src/utils/format-time';
import axiosInstance from 'src/utils/axios';
import { fetchPdfPageImages } from 'src/api/files';
import { HOST_API } from 'src/config-global';

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});
// ----------------------------------------------------------------------

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        col4: { width: '25%' },
        col8: { width: '75%' },
        col6: { width: '50%' },
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb14: { marginBottom: 14 },
        mb20: { marginBottom: 20 },
        mb40: { marginBottom: 40 },
        p2: { padding: 2 },
        p4: { padding: 4 },
        p8: { padding: 8 },
        p10: { padding: 10 },
        h3: { fontSize: 16, fontWeight: 700 },
        h4: { fontSize: 13, fontWeight: 700 },
        body1: { fontSize: 10, margin: 0, padding: 0, lineHeight: 'normal' },
        body2: { fontSize: 9, lineHeight: 'normal', color: 'black' },
        subtitle1: { fontSize: 10, fontWeight: 700 },
        subtitle2: { fontSize: 9, fontWeight: 700 },
        alignRight: { textAlign: 'right' },
        alignCenter: { textAlign: 'center' },
        page: {
          fontSize: 9,
          lineHeight: 1.6,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          textTransform: 'capitalize',
          padding: '40px 24px 120px 24px',
        },
        footer: {
          left: 0,
          right: 0,
          bottom: 0,
          padding: 24,
          margin: 'auto',
          borderTopWidth: 1,
          borderStyle: 'solid',
          position: 'absolute',
          borderColor: '#DFE3E8',
        },
        header: {
          top: 0,
          left: 0,
          right: 0,
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#DFE3E8',
          borderBottomStyle: 'solid',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        gridContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: '10px',
        },
        table: {
          display: 'flex',
          width: 'auto',
        },
        tableRow: {
          padding: '0',
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderStyle: 'solid',
          borderColor: 'black',
        },
        tableHeader: {
          padding: '0',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: 'black',
          backgroundColor: 'green',
        },
        noBorder: {
          paddingTop: 8,
          paddingBottom: 0,
          borderBottomWidth: 0,
        },
        tableCell_1: {
          width: '20%',
          padding: '8px 3px',
          textAlign: 'center',
          border: "0.5px solid gray"
        },
        tableCell_2: {
          width: '30%',
          padding: '8px 3px',
          textAlign: 'center',
          border: "0.5px solid gray"
        },
        tableCell_3: {
          width: '10%',
          padding: '8px 3px',
          textAlign: 'center',
          border: "0.5px solid gray"
        },
        tableCell_4: {
          width: '40%',
          padding: '8px 3px',
          textAlign: 'center',
          border: "0.5px solid gray"
        },

        column: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '95px',
          height: '130px',
        },

        timeLine: {
          width: '100%',
          borderTop: '5px solid #fc8803',
          display: 'flex',
          textAlign: 'center',
        },
        row: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        stick: {
          width: '5px',
          height: '10px',
          backgroundColor: '#fc8803',
        },
        colorblue: {
          color: 'blue',
        },
        fontWeightBold: {
          fontWeight: 'bold',
        },
        previous_view: {
          fontSize: 12,
          color: "black",
          backgroundColor: "green",
          padding: "8px",
          width: "100px",
          height: "30px",
          textAlign: "center",
        }
      }),
    []
  );

const Header = ({ styles, patient_name }) => (
  <View style={styles.header} fixed>
    <Text style={[styles.h3, styles.colorblue]}>{patient_name} TREATMENT TIMELINE</Text>
    {/* You can include more elements in your header */}
  </View>
);

const SummaryPageHeader = ({ styles, data }) => (
  <View style={styles.header}>
    <View style={styles.alignCenter}>
      <Text style={styles.h4}>{data?.patient_name}</Text>
      <View style={styles.row}>
        <Text>Date of Acident: </Text>
        <Text>{data?.visit_date === 'Unknown' ? 'Unknown' : fDate(data?.visit_date, 'MM-dd-yyyy')}</Text>
      </View>
      {/* <View style={styles.row}>
        <Text>Date of Birth: </Text>
        <Text>10/19/1969</Text>
      </View> */}
    </View>
  </View>
);


// ----------------------------------------------------------------------

export default function InvoicePDF({ patient_summary_data, patient_name }) {
  const styles = useStyles();
  const [prevPageId, setPrevPageId] = useState(null);
  const [pdfPageImages, setPdfPageImages] = useState({});

  const isObject = (val) => typeof val === 'object' && val !== null;

  const renderJson = (value) => {
    const isArray = Array.isArray(value);
    if (isArray) {
      return (
        <View>
          {value.map((item, index) => (
            <Text key={index}>{isObject(item) ? renderJson(item) : item.toString()}</Text>
          ))}
        </View>
      );
    } else if (isObject(value)) {
      return (
        <View>
          {Object.keys(value).map((key, index) => (
            <View key={index} style={{ textAlign: "left" }}>
              <Text style={{ fontWeight: "bold" }}>{key}:</Text>
              <Text>{renderJson(value[key])}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return value.toString();
    }
  };
  const timeLine = () => {
    let icon = IconSearch('accident');
    return (
      <View style={[styles.row]}>
        {patient_summary_data.map((item, index) => {
          return (
            <View style={[styles.column, styles.mb20]} key={item.id}>
              <View style={[styles.column, styles.mb8, styles.p4]}>
                <Image
                  source={item.icon || '/assets/icons/medical/' + IconSearch(item.activity).icon.replace('.svg', '.png')}
                  style={{ width: 50, height: 50, marginBottom: '5px' }}
                ></Image>
                <View style={[styles.mb8, styles.alignCenter, styles.fontWeightBold]}>
                  <Text style={[styles.body2]}>{item.activity_summarized}</Text>
                </View>
                <View>
                  <Text style={[styles.alignCenter, styles.body2, styles.colorblue]}>
                    {item.doctor_name}
                  </Text>
                </View>
              </View>
              <View style={[styles.stick]}></View>
              <View style={[styles.timeLine, styles.p2]}>
                <Link src={"#" + item.file_name.slice(-30) + item.page_number.toString().split('-')[0]}>
                  <Text style={[styles.body2]}>
                    {item.visit_date === 'Unknown' ? 'Unknown' : fDate(item.visit_date, 'MM-dd-yyyy')}
                  </Text>
                </Link>
              </View>
            </View>
          )
        }
        )
        }
      </View >
    );
  };


  // Call fetch function on component mount
  useEffect(() => {
    // loading.onTrue();
    fetchPdfPageImages().then(res => {
      setPdfPageImages(res.files);
      // loading.onFalse();
    })

  }, []);
  return (

    <Document
    >
      <Page size="A4" style={styles.page} orientation="landscape" id="page1">
        <Header styles={styles} patient_name={patient_name}></Header>
        <View style={[styles.gridContainer, styles.mb4]}>
          <View style={[styles.row]}>{timeLine()}</View>
        </View>
      </Page>
      <Page size="A4" style={styles.page} orientation="portrait">

        <SummaryPageHeader styles={styles} data={patient_summary_data[0]}></SummaryPageHeader>
        <View style={styles.table}>
          <View>
            <View style={styles.tableHeader}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>Date</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Facility/Provider</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Title</Text>
              </View>

              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>Page</Text>
              </View>
            </View>
          </View>
          {patient_summary_data.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCell_1}>
                <Text>{fDate(item.visit_date, 'MM-dd-yyyy')}</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>
                  {item.facility} / {item.doctor_name}
                </Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text>{item.activity_summarized}</Text>
              </View>

              <View style={styles.tableCell_1}>
                <Link src={"#" + item.file_name.slice(-30) + item.page_number.toString().split('-')[0]}>
                  <Text>{item.page_number}</Text>
                </Link>
              </View>
            </View>
          ))}
        </View>
      </Page>
      <Page size="A4" style={styles.page} orientation="portrait">
        <SummaryPageHeader styles={styles} data={patient_summary_data[0]}></SummaryPageHeader>

        <View style={styles.table}>
          <View>
            <View style={styles.tableHeader}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>Date of Service</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Page</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Facility/Provider</Text>
              </View>

              <View style={styles.tableCell_4}>
                <Text style={styles.subtitle2}>Review</Text>
              </View>
            </View>
          </View>
          {patient_summary_data.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCell_1}>
                <Text>{fDate(item.visit_date, 'MM-dd-yyyy')}</Text>
              </View>

              <View style={styles.tableCell_1}>
                <Link src={"#" + item.file_name.slice(-30) + item.page_number.toString().split('-')[0]}>
                  <Text>{item.page_number}</Text>
                </Link>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>
                  {item.facility} / {item.doctor_name}
                </Text>
              </View>

              <View style={styles.tableCell_2}>{renderJson(item.summary)}</View>
            </View>
          ))}
        </View>
      </Page>
      {
        Object.keys(pdfPageImages)?.map((filename) =>
          pdfPageImages[filename]?.map((imageSrc, index) => {
            return (
              <Page size="A4" style={{ position: "relative" }} key={filename.slice(-30) + (index + 1)} id={filename.slice(-30) + (index + 1)} orientation="portrait">
                <Image
                  src={HOST_API + "/" + imageSrc}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    width: "100%"
                  }} />

                <Link src="#page1" >
                  <Text style={styles.previous_view}>
                    Go to Timeline
                  </Text>
                </Link>
              </Page>
            )
          }))
      }
    </Document>
  );
}

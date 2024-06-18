import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';
import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

export async function useFiles() {
  const URL = endpoints.files.list;
  let resultData = { files: [], isError: false };

  await axiosInstance.get(URL).then((res) => {
    try {
      const _userList = res.data?.map((_, index) => ({
        id: _._id.$oid,
        name: _.name,
        url: _.url,
        size: _.file_size,
        createdAt: _mock.time(index),
        modifiedAt: _mock.time(index),
        type: `${_.name.split('.').pop()}`,
        isFavorited: _mock.boolean(index + 1),
        option: _.option,
      }));
      resultData.files = _userList;
      resultData.isError = false;
    } catch (err) {
      resultData.isError = true;
    }
  });
  return resultData;
}

export async function train_pdfs(filesList) {
  let resultData = { isError: true, totalPage: 0, totalPrice: 0, totalToken: 0 };

  await axiosInstance.post(endpoints.files.train, { fileNames: filesList }).then((res) => {
    try {
      resultData.isError = res.data.status == 'Success' ? false : true;
      if (resultData.isError == false) {
        resultData.totalPage = res.data.total_pages;
        resultData.totalPrice = res.data.total_price;
        resultData.totalToken = res.data.total_tokens;
      }
    } catch (err) {
      resultData.isError = true;
    }
  });
  return resultData;
}

export async function uploads(formData) {
  let resultData = { isError: true, fileNames: [] };
  await axiosInstance
    .post(
      endpoints.files.upload,
      { files: formData },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      try {
        resultData.isError = res.data.status == 'Success' ? false : true;
        if (!resultData.isError) {
          resultData.fileNames = res.data.files;
        }
      } catch (err) {
        resultData.isError = true;
      }
    });
  return resultData;
}

export const fetchPdfPageImages = async () => {
  let resultData = { files: [], isError: false };
  const URL = endpoints.files.pageImages;

  await axiosInstance.get(URL).then((res) => {
    resultData.files = res.data;
    resultData.isError = false;
  }).catch(error => {
    resultData.isError = true;
    console.error("There was a problem fetching PDF page images:", error);
  })
  return resultData;
};
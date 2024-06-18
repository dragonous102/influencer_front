import axiosInstance, { endpoints } from 'src/utils/axios';

export async function GetAnswerFromPrompt(prompt) {
  let resultData = { answers: [], isError: 'success' };
  await axiosInstance.get(endpoints.prompt.get + '/' + prompt).then((res) => {
    try {
      if (res.data.status == 'Failed') {
        resultData.answers.push({ answer: res.data.data });
        resultData.isError = 'logic_issue';
      } else {
        let file_names = res.data?.file_names;
        console.log('filenames ', file_names);
        // let file_names = [];
        const patinets = res.data?.data?.map((_, index) => ({
          answer: _.answer,
          page_number: _.page_number,
          file_name: _.file_name,
          order: file_names.indexOf(_.file_name) + 1,
        }));
        resultData.answers = patinets;
        resultData.isError = res.data?.data?.status;
      }
    } catch (err) {
      console.log(err);
      resultData.isError = 'server_issue';
    }
  });

  return resultData;
}

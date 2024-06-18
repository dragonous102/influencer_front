import axios from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};
// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    login: '/api/users/login',
    register: '/api/users/signup',
  },
  user: {
    list: '/api/users',
  },
  chat: '/api/chat', // for theme
  kanban: '/api/kanban', // for theme
  calendar: '/api/calendar', // for theme
  mail: {
    list: '/api/mail/list', // for theme
    details: '/api/mail/details', // for theme
    labels: '/api/mail/labels', // for theme
  },
  post: {
    list: '/api/post/list', // for theme
    details: '/api/post/details', // for theme
    latest: '/api/post/latest', // for theme
    search: '/api/post/search', // for theme
  },
  product: {
    list: '/api/product/list', // for theme
    details: '/api/product/details', // for theme
    search: '/api/product/search', // for theme
  },
  patient: {
    list: '/api/get_data',
    update: '/api/update_data',
    history: '/api/history', //history id
    patients: '/api/patients',
    patientsHistory: '/api/patient_history', //patient_name
    accident: '/api/get_accident',
    deleteIds: '/api/drop/summary',
  },
  files: {
    list: '/api/uploaded_files',
    upload: '/api/upload',
    train: '/api/train',
    deleteIds: '/api/drop/pdf',
    pageImages: 'api/pageImages'
  },
  prompt: {
    get: '/api/prompt', //@ String for prompt
  },
};

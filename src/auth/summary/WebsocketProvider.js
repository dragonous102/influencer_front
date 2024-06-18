'use client';
import { NEXT_PUBLIC_WEB_SOCKET_API } from 'src/config-global.js';
import { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const WebsocketContext = createContext(false, null, () => {});

export const WebsocketProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState({});

  const socketio = useRef(null);

  useEffect(() => {
    const socket = new io(NEXT_PUBLIC_WEB_SOCKET_API);
    //! assign ref to socket
    socketio.current = socket;

    socket.on('connect', () => {
      console.log('connected', socket);
      setIsReady(true);
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
      setIsReady(false);
    });

    socket.on('status', () => {
      console.log('status event happened');
    });

    socket.on('ocr_started', (res) => {
      console.log('ocr_started event happened', res);
      let tempData = {};
      tempData.title = 'OCR started';
      tempData.type = 'ocr_started';
      tempData.total = res.total;
      tempData.totalPages = res.total_pages;
      setVal(tempData);
    });

    socket.on('train_started', (res) => {
      console.log('train_started event happened', res);
      let tempData = {};
      tempData.title = 'Train started';
      tempData.type = 'train_started';
      tempData.total = res.total;
      setVal(tempData);
    });

    socket.on('ocr', (res) => {
      console.log('ocr event happened');
      let tempData = {};
      tempData.title = 'OCR...';
      tempData.type = 'ocr';
      tempData.status = res.status;
      tempData.filename = res.data;
      setVal(tempData);
    });

    socket.on('train', (res) => {
      console.log('train event happened');
      let tempData = {};
      tempData.title = 'Train...';
      tempData.type = 'train';
      tempData.status = res.status;
      tempData.filename = res.data;

      setVal(tempData);
    });

    socket.on('ocr_finished', (res) => {
      let tempData = {};
      tempData.title = 'OCR Finished';
      tempData.type = 'ocr_finished';
      tempData.status = null;
      tempData.filename = '';
      tempData.total = 0;
      setVal(tempData);
    });

    socket.on('train_finished', (res) => {
      let tempData = {};
      tempData.title = 'Train finished';
      tempData.type = 'train_finished';
      tempData.status = null;
      tempData.filename = '';
      tempData.total = 0;
      setVal(tempData);
    });
    return () => {
      socket.close();
    };
  }, []);

  const ret = [isReady, socketio, val];

  return <WebsocketContext.Provider value={ret}>{children}</WebsocketContext.Provider>;
};

import * as React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

import PDFPagePlugin from './plugin';
const PDFViewerForPage = ({ fileUrl, pageNumber }) => {
  const jumpToPagePluginInstance = PDFPagePlugin();
  const { jumpToPage } = jumpToPagePluginInstance;
  return (
    <>
      <div
        style={{
          border: '1px solid rgba(0, 0, 0, .3)',
          height: '750px',
        }}
      >
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
          <Viewer
            fileUrl={fileUrl}
            plugins={[jumpToPagePluginInstance]}
            onDocumentLoad={() => {
              jumpToPage(pageNumber - 1);
            }}
          />
        </Worker>
      </div>
    </>
  );
};

export default PDFViewerForPage;

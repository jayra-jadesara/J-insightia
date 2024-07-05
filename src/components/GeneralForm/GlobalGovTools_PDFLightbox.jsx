import React, { useEffect } from 'react';
import Model from './Modal';
import PdfViewer from './PdfViewer';
import { DOCS_INSIGHTIA_COM_REPORTS } from '../../constants/PathsConstant';
import ErrorBoundary from './ErrorBoundary';

const LightBoxPDFViewer = ({
  viewModalPopup,
  handleCloseModelPopup,
  handleSetBtnIdForExpandData,
  viewPDFFileName,
  pdfTitle
}) => {
  // function useKeypress(key, action) {
  //   useEffect(() => {
  //     async function onKeyup(e) {
  //       if (e.key === key) await action();
  //     }
  //     window.addEventListener('keyup', onKeyup);
  //     return () => window.removeEventListener('keyup', onKeyup);
  //   }, [action, key]);
  // }

  // useKeypress('Enter', handleCloseModelPopup);
  if (viewModalPopup === false) return null;

  return (
    <Model show={viewModalPopup} size='xl' handleClose={() => handleCloseModelPopup()} title='View PDF'>
      <ErrorBoundary>
      <PdfViewer
        IsShowCard
        isShowFooter
        title={pdfTitle}
        smalltitle=''
        fileUrl={`${DOCS_INSIGHTIA_COM_REPORTS}${viewPDFFileName}`} // fileUrl="/pdf/pdf-open-parameters.pdf"
        isOpen={viewModalPopup}
        clickEvent={handleSetBtnIdForExpandData}
      />
      </ErrorBoundary>
    </Model>
  );
};

export default React.memo(LightBoxPDFViewer);

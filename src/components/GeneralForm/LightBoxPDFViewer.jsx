import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import Model from './Modal';
import PdfViewer from './PdfViewer';

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
        fileUrl={viewPDFFileName} // fileUrl="/pdf/pdf-open-parameters.pdf"
        isOpen={viewModalPopup}
        clickEvent={handleSetBtnIdForExpandData}
      />
      </ErrorBoundary>
    </Model>
  );
};

export default React.memo(LightBoxPDFViewer);

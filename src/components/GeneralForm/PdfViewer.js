import PropTypes from 'prop-types';
import * as React from 'react';
// import 'pdfjs-dist/build/pdf'; //do not remove or remove after test
// import 'pdfjs-dist/build/pdf.worker'; //do not remove or remove after test
import { Button, Icon, Position, SpecialZoomLevel, Tooltip, Viewer, Worker } from '@react-pdf-viewer/core';
import {
  pageNavigationPlugin,
  RenderGoToNextPageProps,
  RenderGoToPreviousPageProps
} from '@react-pdf-viewer/page-navigation';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { NextIcon, PreviousIcon, searchPlugin, OnHighlightKeyword } from '@react-pdf-viewer/search';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { version } from 'pdfjs-dist';
import disableScrollPlugin from './disableScrollPlugin';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';

const PDFViewerComponent = (props) => {
  const [currentKeyword, setCurrentKeyword] = React.useState({
    keyword: '',
    matchCase: false,
    wholeWords: false
  });

  const searchPluginInstance = searchPlugin();
  const { highlight, jumpToNextMatch, jumpToPreviousMatch, clearHighlights } = searchPluginInstance;
  const search = (keyword) => {
    setCurrentKeyword(keyword);
    highlight(keyword);
  };
  const disableScrollPluginInstance = disableScrollPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance;
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      searchPlugin: {
        // keyword: ['document', 'PDF'], // 'supported by',
        onHighlightKeyword: (props: OnHighlightKeyword) => {
          if (props.keyword.source === 'document') {
            props.highlightEle.style.outline = '2px dashed blue';
            props.highlightEle.style.backgroundColor = 'rgba(0, 0, 0, .1)';
          }
        }
      },
      fullScreenPlugin: {
        onEnterFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        },
        onExitFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        }
      }
    }
  });
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  // const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  // const { toolbarPluginInstance } = defaultLayoutPluginInstance;
  // const { pageNavigationPluginInstance, searchPluginInstance, zoomPluginInstance } = toolbarPluginInstance;
  //   const { clearHighlights, highlight, jumpToPreviousMatch, jumpToNextMatch } = searchPluginInstance;
  // const { zoomTo } = zoomPluginInstance;
  //   const { jumpToPage } = pageNavigationPluginInstance;

  return (
    <Card IsShowCard={props.IsShowCard} title={props.title} smalltitle={props.smalltitle} addedClass={props.addedClass}>
      <ErrorBoundary>
      <div
        id='pdfViewId'
        style={{
          border: '1px solid rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div
          style={{
            alignItems: 'center',
            backgroundColor: '#eeeeee',
            borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
            display: 'flex',
            padding: '4px'
          }}
        >
          {/* Search Textbox */}
          <div
            className='col-6 col-md-4'
            style={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              display: 'flex',
              padding: '0 2px'
            }}
          >
            <input
              style={{
                border: 'none',
                padding: '8px',
                width: '100%'
              }}
              placeholder='Enter to search'
              type='text'
              value={currentKeyword.keyword}
              onChange={(e) => {
                if (e.target.value === '') {
                  setCurrentKeyword({
                    keyword: '',
                    matchCase: false,
                    wholeWords: false
                  });
                } else {
                  setCurrentKeyword({
                    keyword: e.target.value,
                    matchCase: currentKeyword.matchCase,
                    wholeWords: currentKeyword.wholeWords
                  });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && currentKeyword.keyword) {
                  highlight(currentKeyword);
                } else {
                  clearHighlights();
                }
              }}
            />
            <Tooltip
              position={Position.BottomCenter}
              target={
                <button
                  type='button'
                  style={{
                    background: '#fff',
                    border: 'none',
                    borderBottom: `2px solid ${currentKeyword.matchCase ? 'blue' : 'transparent'}`,
                    cursor: 'pointer',
                    height: '100%',
                    padding: '0 2px'
                  }}
                  onClick={() => {
                    // currentKeyword.keyword !== '' &&
                    search({
                      keyword: currentKeyword.keyword,
                      matchCase: !currentKeyword.matchCase,
                      wholeWords: currentKeyword.wholeWords
                    });
                  }}
                >
                  <Icon>
                    <path d='M15.979,21.725,9.453,2.612a.5.5,0,0,0-.946,0L2,21.725' />
                    <path d='M4.383 14.725L13.59 14.725' />
                    <path d='M0.5 21.725L3.52 21.725' />
                    <path d='M14.479 21.725L17.5 21.725' />
                    <path d='M22.5,21.725,18.377,9.647a.5.5,0,0,0-.946,0l-1.888,5.543' />
                    <path d='M16.92 16.725L20.794 16.725' />
                    <path d='M21.516 21.725L23.5 21.725' />
                  </Icon>
                </button>
              }
              content={() => 'Match case'}
              offset={{ left: 0, top: 8 }}
            />
            <Tooltip
              position={Position.BottomCenter}
              target={
                <button
                  type='button'
                  style={{
                    background: '#fff',
                    border: 'none',
                    borderBottom: `2px solid ${currentKeyword.wholeWords ? 'blue' : 'transparent'}`,
                    cursor: 'pointer',
                    height: '100%',
                    padding: '0 2px'
                  }}
                  onClick={() => {
                    // currentKeyword.keyword !== '' &&
                    search({
                      keyword: currentKeyword.keyword,
                      matchCase: currentKeyword.matchCase,
                      wholeWords: !currentKeyword.wholeWords
                    });
                  }}
                >
                  <Icon>
                    <path d='M0.500 7.498 L23.500 7.498 L23.500 16.498 L0.500 16.498 Z' />
                    <path d='M3.5 9.498L3.5 14.498' />
                  </Icon>
                </button>
              }
              content={() => 'Match whole word'}
              offset={{ left: 0, top: 8 }}
            />
          </div>
          {/* Previous Match & Next Match */}
          <div className='col-3 col-md-2 d-flex'>
            <div style={{ padding: '0 2px' }}>
              <Tooltip
                position={Position.BottomCenter}
                target={
                  <Button onClick={jumpToPreviousMatch}>
                    <PreviousIcon />
                  </Button>
                }
                content={() => 'Previous match'}
                offset={{ left: 0, top: 8 }}
              />
            </div>
            <div style={{ padding: '0 2px' }}>
              <Tooltip
                position={Position.BottomCenter}
                target={
                  <Button onClick={jumpToNextMatch}>
                    <NextIcon />
                  </Button>
                }
                content={() => 'Next match'}
                offset={{ left: 0, top: 8 }}
              />
            </div>
          </div>
          {/* Close Button */}
          <div className='col-3 col-md-6'>
            <button
              id='btnclosepdf'
              onClick={() => props.clickEvent(!props.isOpen)}
              type='button'
              className='btn btn-primary closePDFBtn float-end'
            >
              Close PDF
            </button>
          </div>
        </div>

        {/* For Mobile View: Without Scrolling & Floating Toolbar */}
        {window.innerWidth < 768 && (
          <div>
            <div>
              <div
                style={{
                  left: 0,
                  position: 'absolute',
                  top: '50%',
                  transform: 'translate(24px, -50%)',
                  zIndex: 1
                }}
              >
                {/* <ZoomOutButton />
              <ZoomPopover />
              <ZoomInButton /> */}

                <GoToPreviousPage>
                  {(props: RenderGoToPreviousPageProps) => (
                    <Tooltip
                      position={Position.BottomCenter}
                      target={
                        <Button onClick={props.onClick}>
                          <Icon size={16}>
                            <path d='M18.4.5,5.825,11.626a.5.5,0,0,0,0,.748L18.4,23.5' />
                          </Icon>
                        </Button>
                      }
                      content={() => 'Previous page'}
                      offset={{ left: 0, top: 8 }}
                    />
                  )}
                </GoToPreviousPage>
              </div>

              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translate(-24px, -50%)',
                  zIndex: 1
                }}
              >
                <GoToNextPage>
                  {(props: RenderGoToNextPageProps) => (
                    <Tooltip
                      position={Position.BottomCenter}
                      target={
                        <Button onClick={props.onClick}>
                          <Icon size={16}>
                            <path d='M5.651,23.5,18.227,12.374a.5.5,0,0,0,0-.748L5.651.5' />
                          </Icon>
                        </Button>
                      }
                      content={() => 'Next page'}
                      offset={{ left: 0, top: 8 }}
                    />
                  )}
                </GoToNextPage>
              </div>
            </div>
            <div
              style={{
                alignItems: 'center',
                backgroundColor: '#eeeeee',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '2px',
                bottom: '16px',
                display: 'flex',
                left: '50%',
                padding: '4px',
                position: 'absolute',
                transform: 'translate(-50%, 0)',
                zIndex: 1
              }}
            >
              <Toolbar>
                {(props: ToolbarSlot) => {
                  const {
                    CurrentPageInput,
                    Download,
                    EnterFullScreen,
                    GoToNextPage,
                    GoToPreviousPage,
                    NumberOfPages,
                    Print,
                    ZoomIn,
                    ZoomOut
                  } = props;
                  return (
                    <>
                      <div style={{ padding: '0px 2px' }}>
                        <ZoomOut />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <ZoomIn />
                      </div>
                      <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                        <GoToPreviousPage />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <CurrentPageInput /> / <NumberOfPages />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <GoToNextPage />
                      </div>
                      <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                        <EnterFullScreen />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <Download />
                      </div>
                      <div style={{ padding: '0px 2px' }}>
                        <Print />
                      </div>
                    </>
                  );
                }}
              </Toolbar>
            </div>
          </div>
        )}

        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.js`}>
          <div
            style={{
              height: window.innerWidth > 768 ? '720px' : '450px',
              width: '100%', //'640px',
              margin: '0 auto'
            }}
          >
            <Viewer
              fileUrl={props.fileUrl}
              withCredentials={false}
              httpHeaders={{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/pdf',
                Mode: 'no-cors',
                Origin: 'https://docs.insightia.com'
              }}
              // fileUrl="http://localhost:3000/pdf-open-parameters.pdf"
              plugins={
                window.innerWidth > 768
                  ? [defaultLayoutPluginInstance, searchPluginInstance]
                  : [
                      disableScrollPluginInstance,
                      pageNavigationPluginInstance,
                      searchPluginInstance,
                      toolbarPluginInstance
                    ] //zoomPluginInstance
              }
              defaultScale={window.innerWidth > 768 ? SpecialZoomLevel.ActualSize : SpecialZoomLevel.PageFit}
            />
          </div>
        </Worker>
      </div>
      </ErrorBoundary>
    </Card>
  );
};

PDFViewerComponent.propTypes = {
  CurrentPageInput: PropTypes.element,
  Download: PropTypes.element,
  EnterFullScreen: PropTypes.element,
  GoToNextPage: PropTypes.element,
  GoToPreviousPage: PropTypes.element,
  IsShowCard: PropTypes.bool,
  NumberOfPages: PropTypes.number,
  Print: PropTypes.element,
  ZoomIn: PropTypes.element,
  ZoomOut: PropTypes.element,
  addedClass: PropTypes.string,
  clickEvent: PropTypes.func,
  fileUrl: PropTypes.string,
  highlightEle: PropTypes.object,
  isOpen: PropTypes.bool,
  keyword: PropTypes.object,
  onClick: PropTypes.func,
  smalltitle: PropTypes.string,
  title: PropTypes.string
};

PDFViewerComponent.defaultProps = {
  IsShowCard: false,
  NumberOfPages: 0,
  addedClass: '',
  clickEvent: () => {},
  fileUrl: '',
  highlightEle: {},
  isOpen: false,
  keyword: {},
  onClick: () => {},
  smalltitle: '',
  title: ''
};

export default React.memo(PDFViewerComponent);

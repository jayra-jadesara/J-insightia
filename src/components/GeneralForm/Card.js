import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import bn from '../../utils/bemnames';
import { history } from '../../utils/navigation-util';
import ErrorBoundary from './ErrorBoundary';
import IWidget from '../GeneralForm/IWidget';

const bem = bn.create('myCard');

const Card = (props) => {
  const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  const [show] = React.useState(true);
  const [isExcelDownloadLoading, setExcelDownloadLoading] = React.useState(false);

  // Not shown card
  if (!props.IsShowCard && props.IsShowCard !== undefined) {
    return <>{props.children}</>;
  }

  // Show card
  return (
    <ErrorBoundary>
      <div
        className={bem.b(
          props.title !== undefined
            ? `card justify-content-around h-100 cursor-auto ${props.addedClass !== undefined ? props.addedClass : ''}`
            : `justify-content-around h-100 cursor-auto ${props.addedClass !== undefined ? props.addedClass : ''}`
        )}
      >
        <div className='text-primary cardheader'>
          {props.isHideHeaderDiv ? (
            <div className='mt-3' />
          ) : (
            <>
              <div className='cardTitle'>
                <div className='d-inline-block divTitle w-100'>
                  <div className='titleSelection' title={props.title}>
                    <h3>
                      {props.title}{' '}
                      {props.isHeaderInfoTooltip !== undefined ? (
                        <IWidget tooltipOverrideString={props.isHeaderInfoTooltip} />
                      ) : (
                        ''
                      )}
                    </h3>
                    {props.extratitle !== '' && <h3>{props.extratitle}</h3>}
                    {props.smalltitle !== '' && <h3 className='text-muted text-capitalize'>{props.smalltitle}</h3>}
                  </div>
                </div>
                {props.isExcelDownload && (
                  <div className='d-inline-block w-100 text-center'>
                    <a
                      className={`text-center ${
                        isExcelDownloadLoading ? 'text-disable text-pointer cursor-default' : 'cursor-pointer'
                      }`}
                      title={!isExcelDownloadLoading ? 'Export to excel' : 'Excel processing...'}
                      id={`btndown_${props.item.id}`}
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!isExcelDownloadLoading) {
                          await setExcelDownloadLoading(!isExcelDownloadLoading);
                          const a = await props.handleDownloadExcel({
                            item: props.item,
                            setExcelDownloadLoading,
                          });
                          console.log(a);
                          setExcelDownloadLoading(!isExcelDownloadLoading);
                        }
                      }}
                    >
                      <span className='pe-2'> Download Data</span>
                      <span
                        className={isExcelDownloadLoading ? 'spinner-border spinner-border-sm' : ''}
                        aria-hidden='true'
                      />
                    </a>
                  </div>
                )}
                {(props.isComp || props.isInvest) && (
                  <div className='d-inline-block w-100'>
                    {props.isComp && (
                      <svg
                        width='2em'
                        onClick={props.handleComapnyCog}
                        height='2em'
                        viewBox='0 0 16 16'
                        className='bi bi-gear float-end pe-1 ps-1'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <title>Company Filter</title>
                        <path
                          fillRule='evenodd'
                          d='M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z'
                        />
                        <path
                          fillRule='evenodd'
                          d='M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z'
                        />
                      </svg>
                    )}
                    {props.isInvest && (
                      <svg
                        width='2em'
                        height='2em'
                        onClick={props.handleInvestorCog}
                        viewBox='0 0 16 16'
                        className='bi bi-gear float-end pe-1 ps-1'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <title>Investor Filter</title>
                        <path
                          fillRule='evenodd'
                          d='M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z'
                        />
                        <path
                          fillRule='evenodd'
                          d='M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z'
                        />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {query.print || (props.cancelSlideBottomToUp && props.cancelSlideBottomToUp !== undefined) ? (
            <div
              className={`${
                query.print ? 'card-body d-block pt-0 ' : show ? 'card-body d-block ' : 'card-body d-none '
              } ${props.TrialUser ? 'blurrytext' : ''}`}
            >
              {props.children}
            </div>
          ) : (
            <div
              className={`${show ? 'card-body slideBottomToUp d-block pt-0 ' : 'card-body slideBottomToUp d-none '} ${
                props.TrialUser ? 'blurrytext' : ''
              }`}
            >
              {props.children}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  extratitle: PropTypes.string,
  smalltitle: PropTypes.string,
  isComp: PropTypes.bool,
  isInvest: PropTypes.bool,
  cancelSlideBottomToUp: PropTypes.bool,
  isHideHeaderDiv: PropTypes.bool,
  isHeaderInfoTooltip: PropTypes.any,
};

Card.defaultProps = {
  title: '',
  extratitle: '',
  smalltitle: '',
  isComp: false,
  isInvest: false,
  cancelSlideBottomToUp: false,
  isHideHeaderDiv: false,
  isHeaderInfoTooltip: undefined,
};

export default React.memo(Card);

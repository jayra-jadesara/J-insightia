import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import 'react-slidedown/lib/slidedown.css';
import bn from '../../utils/bemnames';
import Modal from './Modal';
import pathConstant, { QUERY_NEWS } from '../../constants/PathsConstant';

const bem = bn.create('linkShare');

const LinkShare = ({ newsid, mailSubject, mailBody }) => {
  const [isShowShareIcons, setIsShowShareIcons] = useState(false);
  const [isShowModel, setIsShowModel] = useState(false);
  function toggleShareIcons() {
    setIsShowShareIcons((wasOpened) => !wasOpened);
  }

  function useKeypress(key, action) {
    useEffect(() => {
      async function onKeyup(e) {
        if (e.key === key) await action(false);
      }
      window.addEventListener('keyup', onKeyup);
      return () => window.removeEventListener('keyup', onKeyup);
    }, [action, key]);
  }

  useKeypress('Enter', setIsShowModel);

  const sendMail = () => {
    const mBody = encodeURIComponent(
      `${mailBody.replace(/(<([^>]+)>)/gi, '')}\n\n
      ${window.location.host}${pathConstant.NEWS_OVERVIEW}${QUERY_NEWS}${newsid}`);

    const msubject = encodeURIComponent(mailSubject.replace(/(<([^>]+)>)/gi, ''));
    const link = `mailto:?subject=Insightia News: ${msubject}&body=${mBody}`;
    window.location.href = link;
    return false;
  };

  const handleLinkClick = () => {
    navigator.clipboard.writeText(`${window.location.host + pathConstant.NEWS_OVERVIEW}${QUERY_NEWS}${newsid}`);
    handleToggleModel(true);
  };

  const handleToggleModel = (val) => {
    setIsShowModel(val);
  };

  return (
    <div className='row col-12 justify-content-end'>
      <Modal
        show={isShowModel}
        handleClose={() => handleToggleModel(false)}
        size='md'
        isShowFooter
        title='News URL copied to clipboard'
      >
        {`link to: ${window.location.host}${pathConstant.NEWS_OVERVIEW}${QUERY_NEWS}${newsid}`}
      </Modal>
      <button
        aria-label=' '
        type='button'
        className={
          isShowShareIcons
            ? 'btn btn-secondary bi bi-share-fill newsShare draw meet btnActive order-2'
            : 'btn btn-secondary bi bi-share-fill newsShare draw meet order-2'
        }
        onClick={(e) => {
          e.stopPropagation();
          toggleShareIcons();
        }}
      />
      {isShowShareIcons && (
        <div className={bem.b('fadeInAnimation order-1')}>
          <div>
            <div className=''>
              <ul className='shareicons'>
                {/* <li className="">
                  <svg width={25} height={25} fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 17 17">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                </li>
                <li className="">
                  <i className="bi bi-linkedin" />
                </li>
                <li className="">
                  <i className="bi bi-twitter" />
                </li> */}
                <li className=''>
                  <i className='bi bi-files' onClick={handleLinkClick} />
                </li>
                <li className=''>
                  <i className='bi bi-envelope-fill' onClick={sendMail} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

LinkShare.propTypes = {
  mailBody: PropTypes.string,
  mailSubject: PropTypes.string,
  newsid: PropTypes.number
};

LinkShare.defaultProps = {
  mailBody: '',
  mailSubject: '',
  newsid: 0
};

export default React.memo(LinkShare);

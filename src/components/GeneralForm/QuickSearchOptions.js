import React, { useState, useEffect } from 'react';
import bn from '../../utils/bemnames';

const bem = bn.create('quickSearch');

function QuickSearchOptions({
  getQuickSearchReq,
  handleReset,
  setIsLoading,
  InputName,
}) {
  const [alphabet, setAlphabet] = useState([]);
  useEffect(() => {
    const alphabetS = [...Array(26)].map((e, i) =>
      (i + 10).toString(36).toUpperCase()
    );
    setAlphabet(alphabetS);
  }, [setAlphabet]);
  const handleResetInput = () => {
    const inputField = document.getElementsByName(InputName)[0];
    inputField.value = '';
  };
  const data =
    alphabet.length > 0
      ? alphabet.map((item) => {
          const abc = 1;
          return (
            <button
              key={item}
              id={item}
              value={item}
              type='button'
              onClick={async () => {
                handleReset();
                handleResetInput();
                setIsLoading(true);
                const data = { name_search: item, quicksearch: 1 };
                await getQuickSearchReq(data);
                setIsLoading(false);
              }}
              className='btnQuickSearch'
            >
              {item}
            </button>
          );
        })
      : 'QuickSearchOptions';
  return (
    <div className={bem.b('col-lg-6 col-md-12 col-sm-12')}>
      <button
        id='[0-9]'
        value='[0-9]'
        type='button'
        onClick={async () => {
          handleReset();
          handleResetInput();
          setIsLoading(true);
          const data = { name_search: '[0-9]', quicksearch: 1 };
          await getQuickSearchReq(data);
          setIsLoading(false);
        }}
        className='btnQuickSearch'
      >
        0-9
      </button>
      {data}
    </div>
  );
}

export default QuickSearchOptions;

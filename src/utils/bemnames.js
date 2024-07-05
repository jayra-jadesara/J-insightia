import classNames from 'classnames';

export const createBEM = (namespace) => {
  const Namespace = namespace;
  return {
    create: (blockName) => {
      let block = blockName;

      if (typeof Namespace === 'string') {
        block = `${Namespace}-${blockName}`;
      }

      return {
        b: (...more) => classNames(block, more),
        e: (className, ...more) => classNames(`${block}__${className}`, more),
        m: (className, ...more) => classNames(`${block}--${className}`, more)
      };
    }
  };
};

export const bemNames = createBEM('cr');

export default bemNames;

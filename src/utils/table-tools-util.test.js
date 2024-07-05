import {
  checkValuesToFixed,
  setCellStyleFinancial,
  setCellStyleFinancialComparison,
  buildVerticleTable
} from './table-tools-util';

describe('table tools test', () => {
  it('checkValuesToFixed', () => {
    expect(checkValuesToFixed(4.51111)).toBe('4.51');
    expect(checkValuesToFixed('Apple')).toBe('Apple');
  });

  it('setCellStyleFinancial', () => {
    expect(setCellStyleFinancial(4)).toEqual({ color: 'green' });
    expect(setCellStyleFinancial(-4)).toEqual({ color: 'red' });
  });

  it('setCellStyleFinancialComparison', () => {
    expect(setCellStyleFinancialComparison(4, 3)).toEqual({ color: 'green' });
    expect(setCellStyleFinancialComparison(3, 4)).toEqual({ color: 'red' });
  });

  it('buildVerticleTable w/ keyNamePrettier', () => {
    expect(buildVerticleTable({ all_out: 'all_out', return: 'b' })).toEqual([
      { key: 'All Out', value: 'all_out' },
      { key: 'Return', value: 'b' }
    ]);
  });
});

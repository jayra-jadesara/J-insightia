const { sql, poolPromise } = require('../config/db');
const general = require('../utill/general');

const activistCampaignRoutes = 'activistCampaignService';

class activistCampaignService {
  async getData(request, resultsCallback) {
    let SP;
    try {
      // SQL = this.buildSql(request);
      const pool = await poolPromise;
      if (request.serverSideTables !== undefined) {
        SP = request.serverSideTables.from;
        const results = await pool.request().execute(SP);
        const rowCount = this.getRowCount(request, results);
        const resultsForPage = this.cutResultsToPageSize(request, results);
        resultsCallback(resultsForPage, rowCount);
      }
    } catch (error) {
      general.ErrorLogSql(
        `${activistCampaignRoutes}/activistCampaignService/DynamicSQL`,
        error,
        SP
      );
    }
  }

  buildSql(request) {
    const selectSql = this.createSelectSql(request);
    const fromSql = this.createFromSql(request);
    const whereSql = this.createWhereSql(request, true);
    const whereFinalSql = this.createWhereSql(request, false);
    const limitSql = this.createLimitSql(request);
    const orderBySql = this.createOrderBySql(request);
    const groupBySql = this.createGroupBySql(request);
    const paramatiseSql = this.createParamatiseSqlSql(
      selectSql,
      fromSql,
      whereSql,
      whereFinalSql,
      groupBySql,
      orderBySql,
      limitSql
    );
    console.log(paramatiseSql);
    return paramatiseSql;
  }

  createSelectSql(request) {
    const { rowGroupCols } = request;
    const { valueCols } = request;
    const { groupKeys } = request;
    const { refreshButton } = request;
    const { serverSideTables } = request;

    const colsToSelect = [];

    if (this.isDoingGrouping(rowGroupCols, groupKeys)) {
      // const rowGroupCol = rowGroupCols[groupKeys.length];
      rowGroupCols.forEach((rowGroupCol) => {
        colsToSelect.push(`${rowGroupCol.field} as ''${rowGroupCol.field}''`);
      });

      valueCols.forEach((valueCol) => {
        if ((valueCol.isShown && refreshButton) || !refreshButton) {
          switch (valueCol.aggFunc) {
            case 'count(Dist)':
              colsToSelect.push(
                `count (distinct ${valueCol.field}) as ''${valueCol.field}''`
              );
              break;
            case 'count':
              colsToSelect.push(
                `count (${valueCol.field}) as ''${valueCol.field}''`
              );
              break;
            case 'avg':
              colsToSelect.push(
                `avg (${valueCol.field}) as ''${valueCol.field}''`
              );
              break;
            case 'max':
              colsToSelect.push(
                `max (${valueCol.field}) as ''${valueCol.field}''`
              );
              break;
            case 'min':
              colsToSelect.push(
                `min (${valueCol.field}) as ''${valueCol.field}''`
              );
              break;
            case 'sum':
              colsToSelect.push(
                `sum (${valueCol.field}) as ''${valueCol.field}''`
              );
              break;
            default:
              colsToSelect.push(
                `${valueCol.aggFunc} ${valueCol.field} as ''${valueCol.field}''`
              );
              break;
          }
        }
      });

      return `select top 50000 ${colsToSelect.join(', ')}`;
    }

    if (valueCols) {
      valueCols.forEach((valueCol) => {
        if ((valueCol.isShown && refreshButton) || !refreshButton) {
          colsToSelect.push(` ${valueCol.field} as ''${valueCol.field}''`);
        }
      });
      return ` drop table if exists #t
    
      select ${colsToSelect.join(', ')}`;
    }

    return ' SELECT *';
  }

  createFilterSql(key, item, index, operator) {
    const conditionArr = [];
    if (item.operator) {
      let condition1 = '';
      let condition2 = '';
      switch (item.condition1.filterType) {
        case 'text':
          condition1 = this.createTextFilterSql(
            key,
            item.condition1,
            index,
            item.operator
          );
          break;
        case 'number':
          condition1 = this.createNumberFilterSql(
            key,
            item.condition1,
            index,
            item.operator
          );
          break;
        case 'date':
          condition1 = this.createDateFilterSql(
            key,
            item.condition1,
            index,
            item.operator
          );
          break;
        default:
          console.log(`unkonwn filter type: ${item.filterType}`);
      }
      switch (item.condition2.filterType) {
        case 'text':
          condition2 = this.createTextFilterSql(
            key,
            item.condition2,
            index + 1,
            operator
          );
          break;
        case 'number':
          condition2 = this.createNumberFilterSql(
            key,
            item.condition2,
            index + 1,
            operator
          );
          break;
        case 'date':
          condition2 = this.createDateFilterSql(
            key,
            item.condition2,
            index + 1,
            operator
          );
          break;
        default:
          console.log(`unkonwn filter type: ${item.filterType}`);
      }
      conditionArr.push(condition1);
      conditionArr.push(condition2);
      return conditionArr;
    }

    switch (item.filterType) {
      case 'text':
        conditionArr.push(this.createTextFilterSql(key, item, index, operator));
        break;
      case 'number':
        conditionArr.push(
          this.createNumberFilterSql(key, item, index, operator)
        );
        break;
      case 'date':
        conditionArr.push(this.createDateFilterSql(key, item, index, operator));
        break;
      case 'set':
        item.values.forEach((country, i) => {
          const thisItem = {
            filter: country,
            type: 'setEquals',
            brace: i === 0 ? '(' : '',
          };
          let adjOperator = '';
          if (item.values.length - 1 > i) {
            adjOperator = 'or';
          } else if (item.values.length - 1 === i) {
            adjOperator = `) ${operator}`;
          }
          conditionArr.push(
            this.createTextFilterSql(
              key,
              thisItem,
              `${index}_${i}`,
              adjOperator
            )
          );
        });
        break;
      default:
        console.log(`unkonwn filter type: ${item.filterType}`);
    }
    return conditionArr;
  }

  createNumberFilterSql(key, item, index, operator) {
    switch (item.type) {
      case 'exists':
        return {
          query: `${key} IS NOT NULL ${operator}`,
          declare: `@ks${index}`,
          datatype: 'varchar(255)',
          column: `'${item.filter}'`,
        };
      case 'equals':
        return {
          query: `${key} = @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'decimal(38)',
          column: `${item.filter}`,
        };
      case 'notEqual':
        return {
          query: `${key} <> @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'decimal(38)',
          column: `${item.filter}`,
        };
      case 'greaterThan':
        return {
          query: `${key} > @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'decimal(38)',
          column: `${item.filter}`,
        };
      case 'greaterThanOrEqual':
        return {
          query: `${key} >= @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'decimal(38)',
          column: `${item.filter}`,
        };
      case 'lessThan':
        return {
          query: `${key} < @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'decimal(38)',
          column: `${item.filter}`,
        };
      case 'lessThanOrEqual':
        return {
          query: `${key} <= @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'decimal(38)',
          column: `${item.filter}`,
        };
      case 'inRange':
        return {
          query: `(${key} >= @ks${index} and ${key} <= @ksto${index} ${operator})`,
          declare: `@ks${index}`,
          declareto: `@ksto${index}`,
          datatype: 'decimal(38)',
          column: `${item.filter}`,
          columnto: `${item.filterTo}`,
        };
      default:
        console.log(`unknown number filter type: ${item.type}`);
        return 'true';
    }
  }

  createTextFilterSql(key, item, index, operator) {
    switch (item.type) {
      case 'exists':
        return {
          query: `${key} IS NOT NULL ${operator}`,
          declare: `@ks${index}`,
          datatype: 'varchar(255)',
          column: `''`,
        };
      case 'setEquals':
        if (item.filter === null) {
          return {
            query: `${item.brace}${key} IS NULL ${operator}`,
            declare: `@ks${index}`,
            datatype: 'varchar(255)',
            column: `''`,
          };
        }
        return {
          query: `${item.brace}${key} = @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'varchar(255)',
          column: `'${item.filter.replace(/'/g, "''")}'`,
        };
      case 'equals':
        return {
          query: `${key} = @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'varchar(255)',
          column: `'${item.filter.replace(/'/g, "''")}'`,
        };
      case 'notEqual':
        return {
          query: `${key} <> @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'varchar(255)',
          column: `'${item.filter.replace(/'/g, "''")}'`,
        };
      case 'contains':
        return {
          query: `${key} like @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'varchar(255)',
          column: `'%${item.filter.replace(/'/g, "''")}%'`,
        };
      case 'notContains':
        return {
          query: `${key} not like @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'varchar(255)',
          column: `'%${item.filter.replace(/'/g, "''")}%'`,
        };
      case 'startsWith':
        return {
          query: `${key} like @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'varchar(255)',
          column: `'${item.filter.replace(/'/g, "''")}%'`,
        };
      case 'endsWith':
        return {};
      case 'inRange':
        return {
          query: `(${key} >= @ks${index} and ${key} <= @ksto${index} ${operator})`,
          declare: `@ks${index}`,
          declareto: `@ksto${index}`,
          datatype: 'varchar(255)',
          column: `'${item.filter.replace(/'/g, "''")}'`,
          columnto: `'${item.filterTo.replace(/'/g, "''")}'`,
        };
      default:
        console.log(`unknown text filter type: ${item.type}`);
        return 'true';
    }
  }

  createDateFilterSql(key, item, index, operator = '') {
    switch (item.type) {
      case 'exists':
        return {
          query: `${key} IS NOT NULL ${operator}`,
          declare: `@ks${index}`,
          datatype: 'varchar(255)',
          column: `'${item.filter}'`,
        };
      case 'equals':
        return {
          query: `${key} = @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'date',
          column: `'${item.filter}'`,
        };
      case 'notEqual':
        return {
          query: `${key} <> @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'date',
          column: `'${item.filter}'`,
        };
      case 'contains':
        return {
          query: `${key} like @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'date',
          column: `'%${item.filter}%'`,
        };
      case 'notContains':
        return {
          query: `${key} not like @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'date',
          column: `'%${item.filter}%'`,
        };
      case 'startsWith':
        return {
          query: `${key} like @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'date',
          column: `'${item.filter}%'`,
        };
      case 'endsWith':
        return {
          query: `${key} like @ks${index} ${operator}`,
          declare: `@ks${index}`,
          datatype: 'date',
          column: `'%${item.filter}'`,
        };
      case 'inRange':
        return {
          query: `(${key} >= @ks${index} and ${key} <= @ksto${index} ${operator})`,
          declare: `@ks${index}`,
          declareto: `@ksto${index}`,
          datatype: 'date',
          column: `'${item.filter}'`,
          columnto: `'${item.filterTo}'`,
        };
      default:
        console.log(`unknown text filter type: ${item.type}`);
        return 'true';
    }
  }

  createFromSql(request) {
    const { serverSideTables } = request;
    const tablesToJoin = [];
    if (serverSideTables.joins) {
      serverSideTables.joins.forEach((join) => {
        let additionalJoin = '';
        if (join.and) {
          additionalJoin = ` and ${join.and}`;
        }
        tablesToJoin.push(
          `${join.type} join ${join.table} on ${join.on} = ${join.at}${additionalJoin}`
        );
      });
      return ` from ${serverSideTables.from} ${tablesToJoin.join(' ')}`;
    }
    // return `from ${serverSideTables.from}`;
    return ` from ${serverSideTables.from}`;
  }

  createWhereSql(request, inline) {
    const { rowGroupCols } = request;
    const { groupKeys } = request;
    const { filterModel } = request;

    const that = this;
    const whereParts = [];

    if (groupKeys.length > 0) {
      groupKeys.forEach((key, index) => {
        const colName = rowGroupCols[index].field;
        const rand = (Math.random() + 1).toString(36).substring(7);
        const operator = groupKeys.length - 1 === index ? '' : 'and';
        const createFilter = that.createFilterSql(
          key,
          colName,
          `gk_${rand}_${index}`,
          operator
        );
        whereParts.push(...createFilter);
      });
    }

    if (filterModel) {
      const filterModelAdjusted = [];
      for (const [key, value] of Object.entries(filterModel)) {
        if (value.isInline === inline) {
          filterModelAdjusted[key] = value;
        }
      }

      const keySet = Object.keys(filterModelAdjusted);
      keySet.forEach((key, index) => {
        const item = filterModelAdjusted[key];
        if (item.isInline === inline) {
          const rand = (Math.random() + 1).toString(36).substring(7);
          const operator = keySet.length - 1 === index ? '' : 'and';
          const createFilter = that.createFilterSql(
            key,
            item,
            `${rand}_${index}`,
            operator
          );
          whereParts.push(...createFilter);
        }
      });
    }

    if (whereParts.length > 0) {
      return whereParts;
    }
    return [];
  }

  createGroupBySql(request) {
    const { rowGroupCols } = request;
    const { groupKeys } = request;

    if (this.isDoingGrouping(rowGroupCols, groupKeys)) {
      const colsToGroupBy = [];

      //      const rowGroupCol = rowGroupCols[groupKeys.length];
      rowGroupCols.forEach((rowGroupCol) => {
        colsToGroupBy.push(rowGroupCol.field);
      });
      return ` group by ${colsToGroupBy.join(', ')}`;
    }
    // select all columns
    return '';
  }

  createOrderBySql(request) {
    const { rowGroupCols } = request;
    const { groupKeys } = request;
    const { sortModel } = request;

    const grouping = this.isDoingGrouping(rowGroupCols, groupKeys);

    const sortParts = [];
    if (sortModel) {
      const groupColIds = rowGroupCols
        .map((groupCol) => groupCol.id)
        .slice(0, groupKeys.length + 1);

      sortModel.forEach((item) => {
        if (grouping && groupColIds.indexOf(item.colId) < 0) {
          // ignore
          // return gro
        } else {
          sortParts.push(`${item.colId} ${item.sort}`);
        }
      });
    }

    if (sortParts.length > 0) {
      return ' order by 1';
    }
    return ' order by 1';
  }

  isDoingGrouping(rowGroupCols, groupKeys) {
    // we are not doing grouping if at the lowest level. we are at the lowest level
    // if we are grouping by more columns than we have keys for (that means the user
    // has not expanded a lowest level group, OR we are not grouping at all).
    return rowGroupCols.length > groupKeys.length;
  }

  createLimitSql(request) {
    const { startRow } = request;
    const { endRow } = request;
    const pageSize = endRow - startRow;
    return ` `;
  }

  getRowCount(request, results) {
    if (
      results === null ||
      results === undefined ||
      results.recordset.length === 0
    ) {
      return 0;
    }
    const currentLastRow = request.startRow + results.recordset.length;
    return currentLastRow <= request.endRow ? currentLastRow : -1;
  }

  cutResultsToPageSize(request, results, rowCount) {
    const pageSize = rowCount;
    if (results && results.length > pageSize) {
      return results.splice(0, pageSize);
    }
    return results;
  }

  createParamatiseSqlSql(
    selectSql,
    fromSql,
    whereSql,
    whereFinalSql,
    groupBySql,
    orderBySql,
    limitSql
  ) {
    const whereStatementArr = [];
    const finalWhereStatementArr = [];
    const decalareArr = [];
    const columnArr = [];
    whereSql.forEach((where) => {
      whereStatementArr.push(where.query);
      decalareArr.push(`${where.declare} ${where.datatype}`);
      columnArr.push(`${where.declare} = ${where.column}`);
      if (where.declareto !== null && where.declareto !== undefined) {
        decalareArr.push(`${where.declareto} ${where.datatype}`);
        columnArr.push(`${where.declareto} = ${where.columnto}`);
      }
    });

    whereFinalSql.forEach((where) => {
      finalWhereStatementArr.push(where.query);
      decalareArr.push(`${where.declare} ${where.datatype}`);
      columnArr.push(`${where.declare} = ${where.column}`);
      if (where.declareto !== null && where.declareto !== undefined) {
        decalareArr.push(`${where.declareto} ${where.datatype}`);
        columnArr.push(`${where.declareto} = ${where.columnto}`);
      }
    });
    const whereSql2 =
      whereStatementArr.length > 0
        ? ` where ${whereStatementArr.join(' ')}`
        : '';
    const finalWhere =
      finalWhereStatementArr.length > 0
        ? ` where ${finalWhereStatementArr.join(' ')}`
        : '';
    const decalareSQL =
      decalareArr.length > 0 ? `, N'${decalareArr.join(', ')}'` : '';
    const columnSQL = columnArr.length > 0 ? `,${columnArr.join(', ')}` : '';
    if (finalWhereStatementArr.length === 0) {
      return `EXECUTE sp_executesql N'${
        selectSql + fromSql + whereSql2 + groupBySql + orderBySql + limitSql
      }'${decalareSQL}${columnSQL}`;
    }
    return `EXECUTE sp_executesql N'${`${`${selectSql} into  #t ${fromSql}${whereSql2}`} select * from #t ${finalWhere}${groupBySql}${orderBySql}${limitSql}`}'${decalareSQL}${columnSQL}`;
  }
}

module.exports = { activistCampaignService };

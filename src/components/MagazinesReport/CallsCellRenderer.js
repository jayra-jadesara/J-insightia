import numConst from '../../constants/NumberConstants';

function CallsCellRenderer() {}

CallsCellRenderer.prototype.init = function (params) {
  const eTemp = document.createElement('div');
  eTemp.innerHTML =
    '<span class="calls-cell-renderer">' +
    '<button ref="btAdd">+</button>' +
    '<button ref="btRemove">-</button>' +
    '<span ref="eValue"></span>' +
    '</span>';

  this.eGui = eTemp.firstChild;

  this.eValue = this.eGui.querySelector('[ref="eValue"]');
  const btAdd = this.eGui.querySelector('[ref="btAdd"]');
  const btRemove = this.eGui.querySelector('[ref="btRemove"]');

  btAdd.addEventListener('click', this.onBtAdd.bind(this, params));
  btRemove.addEventListener('click', this.onBtRemove.bind(this, params));

  this.refresh(params);
};

CallsCellRenderer.prototype.onBtRemove = function (params) {
  const oldData = params.node.data;

  const oldCallRecords = oldData.callRecords;

  if (oldCallRecords.length === numConst.EMPTY_TABLE_LENGTH) {
    return;
  }

  const newCallRecords = oldCallRecords.slice(0); // make a copy
  newCallRecords.pop(); // remove one item

  let minutes = 0;
  newCallRecords.forEach((r) => {
    minutes += r.duration;
  });

  const newData = {
    name: oldData.name,
    account: oldData.account,
    calls: newCallRecords.length,
    minutes,
    callRecords: newCallRecords,
  };

  gridOptions.api.applyTransaction({ update: [newData] });
};

CallsCellRenderer.prototype.onBtAdd = function (params) {
  const oldData = params.node.data;

  const oldCallRecords = oldData.callRecords;

  const newCallRecords = oldCallRecords.slice(0); // make a copy
  newCallRecords.push({
    name: ['Bob', 'Paul', 'David', 'John'][Math.floor(Math.random() * 4)],
    callId: Math.floor(Math.random() * 1000),
    duration: Math.floor(Math.random() * 100) + 1,
    switchCode: 'SW5',
    direction: 'Out',
    number: `(02) ${Math.floor(Math.random() * 1000000)}`,
  }); // add one item

  let minutes = 0;
  newCallRecords.forEach((r) => {
    minutes += r.duration;
  });

  const newData = {
    name: oldData.name,
    account: oldData.account,
    calls: newCallRecords.length,
    minutes,
    callRecords: newCallRecords,
  };

  gridOptions.api.applyTransaction({ update: [newData] });

  params.node.setExpanded(true);
};

CallsCellRenderer.prototype.refresh = function (params) {
  this.eValue.innerHTML = params.value;
};

CallsCellRenderer.prototype.getGui = function () {
  return this.eGui;
};

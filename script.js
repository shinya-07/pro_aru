'use strict';

const storage = localStorage;

const table = document.querySelector('table');
const bottle = document.getElementById('bottle');
const search_txet_id = document.getElementById('search')
const category = document.querySelector('select');
const select_category = document.getElementById('cat_select');
const low = document.getElementById('low');
const main = document.querySelector('main');

let list = [];

document.addEventListener('DOMContentLoaded', () => {
  const json = storage.bottleList;
  if (json == undefined) {
    return;
  }
  list = JSON.parse(json);
  for (const item of list) {
    addItem(item);
  }

  
});

const addItem = (item) => {
  const tr = document.createElement('tr');

  for (const prop in item) {
    const td = document.createElement('td');
    if (prop == 'low') {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item[prop];
      td.appendChild(checkbox);
      checkbox.addEventListener('change', checkBoxListener);
    } else {
      td.textContent = item[prop];
    }
    tr.appendChild(td);
  }

  table.append(tr);
};

const checkBoxListener = (ev) => {
  const trList = Array.from(document.getElementsByTagName('tr'));
  const currentTr = ev.currentTarget.parentElement.parentElement;
  const idx = trList.indexOf(currentTr) - 1;
  list[idx].low = ev.currentTarget.checked;
  storage.bottleList = JSON.stringify(list);
};

//登録ボタンクリック時にデータ記録
submit.addEventListener('click', () => {
  const item = {};
  if (bottle.value != '') {
    item.bottle = bottle.value;
  } else {
    item.bottle = 'ダミーbottle';
  }
  item.category = category.value;
  item.low = false;

  bottle.value = '';
  category.value = '';

  addItem(item);

  list.push(item);
  storage.bottleList = JSON.stringify(list);
});

//カテゴリーごとに表示機能
//すべての時に二回目以降表示ができない
const datas = JSON.parse(storage.bottleList);
console.log(select_category.value)
//const result = datas.filter(data => data.category === '0')

document.addEventListener('DOMContentLoaded', function(){
  select_category.addEventListener('change',function(){
    const num = select_category.value;
    console.log(num);
    clearTable();
    for(const item of list){
      if(num == 0){
        addItem(item);
      }else if(item.category == num){      
        addItem(item);
        //console.log(item);
        console.log(datas);
      }
    }
  },false);
},false);


const clearTable = () => {
  const trList = Array.from(document.getElementsByTagName('tr'));
  trList.shift();
  for (const tr of trList) {
    tr.remove();
  }
};


//検索機能
function inputChange(event){
  const search_txet = search_txet_id.value;
  console.log(search_txet_id.value)
  clearTable();
  for(const item of list){
    if(item.bottle == search_txet){
      console.log(item)
      addItem(item)
    }
  }
  search.value = '';
}

search_txet_id.addEventListener('change',inputChange);

//全表示機能


all_show.addEventListener('click',() => {
  console.log("ok")
  clearTable();
  for(const item of list){
    addItem(item);
  }
})


const remove = document.createElement('button');
remove.textContent = 'delete low bottle';
remove.id = 'remove';
const br = document.createElement('br');
main.appendChild(br);
main.appendChild(remove);

remove.addEventListener('click', () => {
  console.log("ok")
  clearTable();
  list = list.filter((item) => item.low == false);
  for (const item of list) {
    addItem(item);
  }
  storage.bottleList = JSON.stringify(list);
});



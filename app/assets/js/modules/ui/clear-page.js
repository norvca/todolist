const syncState = document.querySelector('.todolist__sync-state');
const taskLists = document.querySelector('.todolist__tasks');
const detail = document.querySelector('.detail__paragraph');
const detailTitle = document.querySelector('.detail__title');

function clearPage() {
  syncState.innerText = '';
  taskLists.innerText = '';
  detailTitle.innerText = '';
  detail.innerText = '';
}

export default clearPage;

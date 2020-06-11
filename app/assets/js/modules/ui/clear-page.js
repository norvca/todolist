import pubsub from '../utils/pubsub';

pubsub.on('deleteAllTasks', clearPage);

function clearPage() {
  const syncState = document.querySelector('.todolist__sync-state');
  const taskLists = document.querySelector('.todolist__tasks');
  const detail = document.querySelector('.detail__paragraph');
  const detailTitle = document.querySelector('.detail__title');
  syncState.innerText = '';
  taskLists.innerText = '';
  detailTitle.innerText = '';
  detail.innerText = '';
}

export default clearPage;

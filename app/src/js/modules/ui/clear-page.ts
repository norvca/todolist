import pubsub from '../utils/pubsub';

pubsub.on('deleteAllTasks', clearPage);

function clearPage(): void {
  const syncState = document.querySelector('.todolist__sync-state') as HTMLDivElement;
  const taskLists = document.querySelector('.todolist__tasks') as HTMLDivElement;
  const detail = document.querySelector('.detail__paragraph') as HTMLTextAreaElement;
  const detailTitle = document.querySelector('.detail__title') as HTMLHeadingElement;
  syncState.innerText = '';
  taskLists.innerText = '';
  detailTitle.innerText = '';
  detail.innerText = '';
}

export default clearPage;

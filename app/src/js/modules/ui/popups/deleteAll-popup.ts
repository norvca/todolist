import { backendDB as db } from '../../model/db-interface';
import deleteAllHTML from '../../templates/deleteAll-template';

class DeleteAllPopup {
  db;
  deleteAllHTML;
  constructor() {
    this.db = db;
    this.deleteAllHTML = deleteAllHTML;
  }

  createPopup() {
    document.body.insertAdjacentHTML('beforeend', this.deleteAllHTML);
    this.popupHandler();
  }

  popupHandler() {
    const confirmDelete = document.querySelector('.deleteAll-popup__btn-yes') as HTMLButtonElement;
    const regretDelete = document.querySelector('.deleteAll-popup__btn-no') as HTMLButtonElement;

    confirmDelete.addEventListener('click', this.deleteAllTasks);
    regretDelete.addEventListener('click', this.regretDeleteTasks);
  }

  deleteAllTasks = () => {
    this.db.deleteAllTasks();
    this.deletePopup();
  };

  regretDeleteTasks = () => {
    this.deletePopup();
  };

  deletePopup() {
    const modal = document.querySelector('.deleteAll-popup') as HTMLDivElement;
    modal.remove();
  }
}

const deleteAllPopup = new DeleteAllPopup();
export { deleteAllPopup };

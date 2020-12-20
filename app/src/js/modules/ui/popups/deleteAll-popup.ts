import {backendDB as db} from '../../database/db-interface';
import deleteAllHTML from '../../templates/deleteAll-template';

class DeleteAllPopup {
  constructor() {
    this.db = db;
    this.deleteAllHTML = deleteAllHTML;
  }

  createPopup() {
    document.body.insertAdjacentHTML('beforeend', this.deleteAllHTML);
    this.popupHandler();
  }

  popupHandler() {
    this.confirmDelete = document.querySelector('.deleteAll-popup__btn-yes') as HTMLButtonElement;
    this.regretDelete = document.querySelector('.deleteAll-popup__btn-no') as HTMLButtonElement;

    this.confirmDelete.addEventListener('click', this.deleteAllTasks);
    this.regretDelete.addEventListener('click', this.regretDeleteTasks);
  }

  deleteAllTasks = () => {
    db.deleteAllTasks();
    this.deletePopup();
  };

  regretDeleteTasks = () => {
    this.deletePopup();
  };

  deletePopup() {
    this.modal = document.querySelector('.deleteAll-popup') as HTMLDivElement;
    this.modal.remove();
  }
}

const deleteAllPopup = new DeleteAllPopup();
export {deleteAllPopup};

const deleteAllHTML = document.createElement('div');
deleteAllHTML.classList.add('modal', 'fade');
deleteAllHTML.innerHTML = `<div class='modal__box'>
                             <p class='modal__aware'>删除全部数据</p>
                             <div class='modal__delete'>
                               <a class='modal__btn-yes'>是的</a>
                               <a class='modal__btn-no'>再想想</a>
                             </div>
                           </div>`;

export default deleteAllHTML;

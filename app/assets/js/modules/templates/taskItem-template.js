// 组装任务条
export default function taskItemTemplate(element) {
  // 单项任务的属性设计
  const taskItemHTML = `<li id="things_${element._id}" class="todolist__content ${element.level}" idnum="${element._id}">
                            <div>
                              <span class='todolist__title' contenteditable='true' idnum=${element._id}> ${element.title} </span>
                            </div>
                            <div class='icon__todo'>
                              <svg class='icon icon__nofinish' aria-hidden='true' name='search' idnum=${element._id}>
                                <use class='icon__finish' xlink:href='#icon-eglass-finish1'></use>
                                <use xlink:href='#icon-eglass-finish'></use>
                              </svg>
                              <svg class='icon icon__delete' aria-hidden='true' name='search' idnum=${element._id}>
                                <use xlink:href='#icon-delete'></use>
                              </svg>
                            </div>
                          </li>`;

  const fragement = document
    .createRange()
    .createContextualFragment(taskItemHTML);

  return fragement;
}

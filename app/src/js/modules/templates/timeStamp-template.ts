import { ITask } from '../interfaces/ITask';

// 组装时间戳
export default function timeStampTemplate(element: ITask): DocumentFragment {
  // 创建时间戳
  const taskTime = element.taskTime;
  const taskWeek = element.taskWeek;

  const timeStampHTML = `<li class="todolist__time">
                            <span class='todolist__week'>${taskWeek}</span>
                            <span class='todolist__date'>${taskTime}</span>
                          </li>`;

  const fragement = document.createRange().createContextualFragment(timeStampHTML);
  return fragement;
}

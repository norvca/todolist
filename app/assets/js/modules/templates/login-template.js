import signinHtml from './signin-template';
import signupHtml from './signup-template';

const loginHTML = `<div class="login fade">
                      <div class="login__box">
                        ${signinHtml}
                        ${signupHtml}
                      </div>
                    </div>`;

export default loginHTML;

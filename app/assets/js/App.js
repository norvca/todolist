import './modules/utils/app-handler';
import './modules/utils/db-interface';
import './modules/layout/header/random-task';
import './modules/layout/header/search-bar';
import './modules/layout/header/level-changer';
import './modules/layout/header/theme-changer';
import '../sass/main.scss';

import { reinitApp } from './modules/utils/app-init';

reinitApp();

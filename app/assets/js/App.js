import "./modules/Handler";
import "./modules/BackendDB";
import RandomTask from "./modules/HeaderModule/RandomTask";
import SearchBar from "./modules/HeaderModule/SearchBar";
import LevelDot from "./modules/HeaderModule/LevelDot";
import ChangeTheme from "./modules/HeaderModule/ChangeTheme";
import getSingleModule from "./modules/ModalModule";

new RandomTask();
new SearchBar();
new LevelDot();
new ChangeTheme();
getSingleModule();
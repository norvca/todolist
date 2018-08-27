import "./modules/Handler";
import "./modules/BackendDB";
import RandomTask from "./modules/HeaderModule/RandomTask";
import SearchBar from "./modules/HeaderModule/SearchBar";
import LevelDot from "./modules/HeaderModule/LevelDot";
import ChangeTheme from "./modules/HeaderModule/ChangeTheme";

new RandomTask();
new SearchBar();
new LevelDot();
new ChangeTheme();

// deleteDataButton.addEventListener("click", ModalModule.getSingleModule);

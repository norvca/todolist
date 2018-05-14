var modalModule = (function() {
  // 加载数据库模块
  var db = require("./DB");

  // 是否清空数据库功能
  var isDeleteDB = function(e){
    if( e.target.classList.contains("modal__btn-yes") ) {
      this.classList.remove("modal--visible");
      db.deleteAllThings();
    } else if ( e.target.classList.contains("modal__btn-no") ) {
      this.classList.remove("modal--visible");
    }
  };

  return {
    isDeleteDB
  };
})();

module.exports = modalModule;
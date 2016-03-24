angular
  .module('timesheetApp')
  .service('toastService', function(toasty) {

    this.displayError = function(title, data) {
      toasty.pop.error({
        title: title,
        msg: data,
        showClose: true,
        clickToClose: true,
        timeout: 0
      });
      console.log(title + ': ' + data);
    };

    this.displayWarning = function(title, data) {
      toasty.pop.warning({
        title: title,
        msg: data,
        showClose: true,
        clickToClose: true,
        timeout: 5000
      });
      console.log(title + ': ' + data);
    };

  });


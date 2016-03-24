angular
  .module('timesheetApp')
  .factory('toastService', function(toasty) {

    function displayError(title, data) {
      toasty.pop.error({
        title: title,
        msg: data,
        showClose: true,
        clickToClose: true,
        timeout: 0
      });
      console.log(title + ': ' + data);
    }

    function displayWarning(title, data) {
      toasty.pop.warning({
        title: title,
        msg: data,
        showClose: true,
        clickToClose: true,
        timeout: 5000
      });
      console.log(title + ': ' + data);
    }

    return {
      displayError: displayError,
      displayWarning: displayWarning
    };
  });


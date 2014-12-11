/* jshint unused: false, latedef: false*/
/*global jsPDF: false, pdfMake: false */


(function () {
  'use strict';

  angular.module('DemoApp', ['ngAnimate'])
    .controller('Demo', Demo);

  function Demo() {
    var demo = this;
    demo.table2PDF = table2PDF;
    demo.table2PDF2 = table2PDF2;

    /////////////////////////////////////

    function table2PDF() {
      var pdf = new jsPDF('p', 'pt', 'letter'),
        source = $('#customers')[0],
        specialElementHandlers = {
          '#bypassme': function (/*element, renderer*/) {
            return true;
          }
        },
        margins = {
          top: 0,
          bottom: 10,
          left: 10,
          width: 100
        };
      // all coords and widths are in jsPDF instance's declared units
      // 'inches' in this case
      pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, {// y coord
          'width': margins.width, // max width of content on PDF
          'elementHandlers': specialElementHandlers
        },
        function (/*dispose*/) {
          // dispose: object with X, Y of the last line add to the PDF
          //          this allow the insertion of new lines after html
          pdf.save('Test.pdf');
        }, margins);
    }

    function table2PDF2() {
      var docDefinition = {
        content: {
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?']
            ]
          }
        }
      };
      pdfMake.createPdf(docDefinition).download();
    }

    ///////////////////////////////////
    demo.items = [
      {
        name: 'Heading 1'
      },
      {
        name: 'Heading 2'
      },
      {
        name: 'Heading 3'
      },
      {
        name: 'Heading 4'
      },
      {
        name: 'Heading 5'
      }

    ];

    demo.show = true;

    demo.add = function () {
      demo.items.push({
        name: 'Patrick'
      });
    };

    demo.remove = function () {
      demo.items.pop();
    };

    demo.showHide = function () {
      demo.show = !demo.show;
    };

    ///////////////////////////////

    //round number
    var fixRound = function (number) {
      return Math.ceil(number * 1e5) / 1e5;
    };

    var roundToDecimal = function (number, decimal) {
      var num = 1.0;
      var zeros = num.toFixed(decimal);
      zeros = zeros.substr(2);
      var mulDiv = parseInt('1' + zeros, 10);
      return Math.round(fixRound(number) * mulDiv) / mulDiv;
    };

    var rad = Math.rad
    demo.oriNumber = rad;
    demo.rodNumber = roundToDecimal(rad,2);

  }
})();


import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric'; // v5
import './Project.css'


import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import { MuiDraggableTreeView } from "mui-draggable-treeview";

function Project() {

  const ref = useRef(null)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const data = {
    id: "1",
    name: "Cars",
    children: [
      {
        id: "2",
        name: "Sport Cars",
        children: [
          {
            id: "24",
            name: "Porsche"
          },
          {
            id: "25",
            name: "Ferrari"
          },
          {
            id: "26",
            name: "McLaren"
          }
        ]
      },
      {
        id: "3",
        name: "Classic Cars",
        children: [
          {
            id: "34",
            name: "1957 Corvette"
          },
          {
            id: "35",
            name: "Volkswagen Beetle"
          },
          {
            id: "36",
            name: "Bentley"
          }
        ]
      }
    ]
  };


  useEffect(() => {


    const asideSize = document.getElementById("project__instruments-id").offsetWidth

    const canvasWidth = document.documentElement.clientWidth - 220 - asideSize * 2
    const canvasHeight = document.documentElement.clientHeight - 300

    console.log(document.documentElement.clientHeight)
    console.log(document.documentElement.clientWidth)

    const canvas = new fabric.Canvas('fabric-canvas', {
      width: canvasWidth,
      height: canvasHeight,
    });

    //canvas.setHeight(canvasHeight)
    //canvas.setWidth(canvasWidth)
    console.log(canvasWidth)
    console.log(canvasHeight)
    let counter = 0
    let rectLeft = 0
    const snap = 15; //Pixels to snap

    function handleDragStart(e) {
      [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
      });
      this.classList.add('img_dragging');

    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }

      e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
      // NOTE: comment above refers to the article (see top) -natchiketa

      return false;
    }

    function handleDragEnter(e) {
      // this / e.target is the current hover target.
      this.classList.add('over');
      canvas.setBackgroundColor('rgba(37, 251, 0, 0.4)', canvas.renderAll.bind(canvas));
    }

    function handleDragLeave(e) {
      this.classList.remove('over'); // this / e.target is previous target element.
      console.log(1)
    }

    function handleDrop(e) {
      // this / e.target is current target element.

      if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
      }

      //plusrect(e.layerY - 50, e.layerX - 50)
      const _loadSVG = function (svg) {

        fabric.loadSVGFromString(svg, function (objects, options) {
          var obj = fabric.util.groupSVGElements(objects, {
            top: e.layerY - 50,
            left: e.layerX - 50,
            name: 'svg',
            lockRotation: false,
            lockScalingY: true,
            lockScalingX: true,
            hasControls: false,
            originX: 'left',
            originY: 'top',
            cornerSize: 15,
            hasRotatingPoint: false,
            perPixelTargetFind: false,
            minScaleLimit: 1,
            maxWidth: 100,
            maxHeight: 100
          });
          canvas.add(obj).renderAll();
          obj.setCoords();
        });
      };

      _loadSVG('<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M43.3351 4.51232e-07C42.6354 -0.000363279 41.9534 0.219179 41.3857 0.628027C40.8179 1.03688 40.3932 1.61401 40.1718 2.27765L36.7873 12.4306C35.4208 12.9117 34.0842 13.4633 32.7779 14.0902L23.2036 9.30663C22.578 8.99399 21.8698 8.88627 21.1794 8.99839C20.4891 9.1105 19.8515 9.43703 19.3569 9.93159L9.93231 19.3554C9.4377 19.8499 9.1112 20.4877 8.99906 21.178C8.88692 21.8684 8.99482 22.5764 9.30747 23.202L14.0849 32.7562C13.4564 34.0689 12.9003 35.4115 12.4186 36.7849L2.27805 40.1691C1.61436 40.3905 1.03719 40.8152 0.62832 41.3829C0.219452 41.9506 -0.000372086 42.6323 4.7278e-07 43.3319V56.6612C-0.000372086 57.3608 0.219452 58.0429 0.62832 58.6106C1.03719 59.1783 1.61436 59.6029 2.27805 59.8244L12.4512 63.2151C12.9307 64.5733 13.4812 65.8995 14.1044 67.1981L9.30747 76.7915C8.99485 77.417 8.88696 78.1251 8.9991 78.8154C9.11124 79.5057 9.43772 80.1432 9.93231 80.6376L19.3569 90.0684C19.8515 90.563 20.4891 90.8891 21.1794 91.0012C21.8698 91.1133 22.578 91.0056 23.2036 90.693L32.7779 85.9028C34.0828 86.5263 35.416 87.0767 36.7808 87.5559L40.1718 97.722C40.3932 98.3856 40.8179 98.9627 41.3857 99.3716C41.9534 99.7804 42.6354 100 43.3351 100H56.6649C57.3646 100 58.0466 99.7804 58.6143 99.3716C59.1821 98.9627 59.6068 98.3856 59.8282 97.722L63.2192 87.5363C64.5738 87.059 65.9006 86.5099 67.196 85.8898L76.7964 90.693C77.422 91.0056 78.1302 91.1133 78.8206 91.0012C79.5109 90.8891 80.1485 90.563 80.6431 90.0684L90.0677 80.6376C90.5623 80.1432 90.8888 79.5057 91.0009 78.8154C91.113 78.1251 91.0051 77.417 90.6925 76.7915L85.9086 67.2242C86.5357 65.9161 87.087 64.577 87.5683 63.2085L97.7219 59.8244C98.3856 59.6029 98.9628 59.1783 99.3717 58.6106C99.7805 58.0429 100 57.3608 100 56.6612V43.3323C100 42.6327 99.7805 41.9506 99.3717 41.3829C98.9628 40.8152 98.3856 40.3905 97.7219 40.1691L87.5618 36.7849C87.0808 35.4207 86.5281 34.0863 85.9021 32.7823L90.6925 23.202C91.0052 22.5764 91.1131 21.8684 91.0009 21.178C90.8888 20.4877 90.5623 19.8499 90.0677 19.3554L80.6431 9.93159C80.1485 9.43703 79.5109 9.1105 78.8206 8.99839C78.1302 8.88627 77.4221 8.99438 76.7964 9.30702L67.2481 14.0776C65.931 13.4478 64.5842 12.8936 63.2062 12.4114L59.8282 2.27804C59.6068 1.61436 59.1821 1.0369 58.6144 0.628027C58.0466 0.219155 57.3646 -0.000355791 56.6649 4.51232e-07H43.3351ZM45.7368 6.66423H54.2632L57.3549 15.9451C57.5243 16.4537 57.814 16.9141 58.1992 17.2869C58.5844 17.6596 59.0539 17.9337 59.5678 18.0863C61.7367 18.7312 63.8355 19.5936 65.8292 20.6638C66.2989 20.9169 66.8224 21.0536 67.3559 21.0623C67.8893 21.0711 68.4171 20.9517 68.8948 20.7141L77.6295 16.3471L83.6566 22.3737L79.2697 31.1469C79.0303 31.625 78.9095 32.1539 78.9174 32.6885C78.9253 33.2232 79.0618 33.7482 79.3153 34.219C80.383 36.1995 81.2515 38.2798 81.8993 40.4343C82.0522 40.9463 82.3259 41.414 82.6975 41.798C83.069 42.182 83.5275 42.4712 84.0341 42.6409L93.3351 45.7387V54.2644L84.0406 57.3626C83.534 57.5323 83.0756 57.8211 82.704 58.2051C82.3325 58.5891 82.0587 59.0568 81.9058 59.5688C81.2587 61.7274 80.3902 63.813 79.3218 65.7971C79.0683 66.268 78.9318 66.7929 78.9239 67.3276C78.9159 67.8623 79.0368 68.3911 79.2762 68.8692L83.6566 77.6293L77.6295 83.6625L68.8362 79.2628C68.3577 79.0241 67.8287 78.9043 67.294 78.9131C66.7593 78.9218 66.2346 79.0589 65.7641 79.3132C63.7907 80.3749 61.7205 81.2386 59.5743 81.8841C59.0623 82.037 58.5946 82.3108 58.2106 82.6824C57.8266 83.0539 57.5376 83.5121 57.3679 84.0188L54.2632 93.3454H45.7368L42.6321 84.0318C42.4633 83.524 42.1746 83.0643 41.7906 82.6916C41.4065 82.3189 40.9384 82.0441 40.4257 81.8906C38.2714 81.247 36.1843 80.3898 34.2033 79.3262C33.7337 79.0731 33.2101 78.9364 32.6767 78.9277C32.1432 78.9189 31.6154 79.0383 31.1377 79.2759L22.3705 83.6625L16.3434 77.6293L20.7368 68.8431C20.9762 68.365 21.097 67.8361 21.0891 67.3015C21.0812 66.7668 20.9447 66.2422 20.6912 65.7714C19.6266 63.7963 18.7608 61.717 18.1137 59.5688C17.9599 59.058 17.6858 58.5917 17.3143 58.2089C16.9428 57.8261 16.4848 57.5378 15.9789 57.3687L6.66489 54.2644V45.7387L15.9528 42.6409C16.4607 42.472 16.9205 42.1832 17.2932 41.7991C17.6659 41.4151 17.9407 40.947 18.0942 40.4343C18.7405 38.2716 19.6025 36.1808 20.6717 34.1929C20.9252 33.722 21.0617 33.1971 21.0696 32.6624C21.0776 32.1277 20.9567 31.5989 20.7173 31.1208L16.3434 22.3737L22.3705 16.3471L31.1377 20.7272C31.6163 20.9659 32.1452 21.0857 32.6799 21.0769C33.2146 21.0682 33.7394 20.9311 34.2098 20.6768C36.1923 19.6088 38.2754 18.7402 40.4322 18.0929C40.9442 17.94 41.4119 17.6665 41.7959 17.2949C42.1799 16.9234 42.4689 16.4648 42.6386 15.9582L45.7368 6.66423Z" fill="white"/>' +
        '<path d="M49.9885 26.6516C37.1447 26.6516 26.6678 37.1523 26.6678 49.9954C26.6678 62.8384 37.1447 73.3146 49.9885 73.3146C62.8324 73.3146 73.3338 62.8384 73.3338 49.9954C73.3338 37.1523 62.8324 26.6516 49.9885 26.6516ZM49.9885 33.3177C59.2304 33.3177 66.6673 40.7542 66.6673 49.9954C66.6673 59.2366 59.2304 66.6485 49.9885 66.6485C40.7467 66.6485 33.3344 59.2366 33.3344 49.9954C33.3344 40.7542 40.7467 33.3177 49.9885 33.3177Z" fill="white"/>' +
        '</svg>')
      canvas.setBackgroundColor('rgba(37, 201, 0, 0.0)', canvas.renderAll.bind(canvas));
      var img = document.querySelector('#images img.img_dragging');

      /*console.log('event: ', e);
  
      var newImage = new fabric.Image(img, {
          width: img.width,
          height: img.height,
          // Set the center of the new object based on the event coordinates relative
          // to the canvas container.
          left: e.layerX - img.width / 2,
          top: e.layerY - img.height / 2
      });
      canvas.add(newImage);*/

      return false;
    }

    function handleDragEnd(e) {
      // this/e.target is the source node.
      [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
      });
      canvas.setBackgroundColor('rgba(37, 201, 0, 0.0)', canvas.renderAll.bind(canvas));
    }


    // Bind the event listeners for the image elements
    var images = document.querySelectorAll('#images img');
    [].forEach.call(images, function (img) {
      img.addEventListener('dragstart', handleDragStart, false);
      img.addEventListener('dragend', handleDragEnd, false);
    });
    var images = document.querySelectorAll('#images ');
    [].forEach.call(images, function (img) {
      img.addEventListener('dragstart', handleDragStart, false);
      img.addEventListener('dragend', handleDragEnd, false);
    });

    var drag = document.querySelectorAll('.MuiTreeItem-label');
    [].forEach.call(drag, function (img) {
      img.addEventListener('dragstart', handleDragStart, false);
      img.addEventListener('dragend', handleDragEnd, false);

    });




    // Bind the event listeners for the canvas
    var canvasContainer = document.getElementById('canvas-container');
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);




    function plusrect(top, left, width, height, fill) {
      const rect = new fabric.Rect({
        top: top,
        name: 'rectangle ' + counter,
        left: left,
        width: 100,
        height: 100,
        fill: 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', 0.75)',
        lockRotation: false,
        lockScalingY: true,
        lockScalingX: true,
        hasControls: false,
        originX: 'left',
        originY: 'top',
        cornerSize: 15,
        hasRotatingPoint: false,
        perPixelTargetFind: true,
        minScaleLimit: 1,
        maxWidth: 100,
        maxHeight: 100
      });

      rect.custom = {};
      rect.custom.counter = counter;

      canvas.add(rect);
      counter++;
      rectLeft += 150;
    }

    function plusrect1(top, left, width, height, fill) {
      const rect = new fabric.Rect({
        top: 200,
        name: 'rectangle ' + counter,
        left: 0 + rectLeft,
        width: 100,
        height: 200,
        fill: 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', 0.75)',
        lockRotation: false,
        lockScalingY: true,
        lockScalingX: true,
        hasControls: false,
        originX: 'left',
        originY: 'top',
        cornerSize: 15,
        hasRotatingPoint: false,
        perPixelTargetFind: true,
        minScaleLimit: 1,
        maxWidth: 100,
        maxHeight: 100
      });

      rect.custom = {};
      rect.custom.counter = counter;

      canvas.add(rect);
      counter++;
      rectLeft += 150;
    }
    canvas.selection = false;
    plusrect(100, 100);
    plusrect1();



    /* const _loadSVG = function (svg) {
 
       fabric.loadSVGFromString(svg, function (objects, options) {
         var obj = fabric.util.groupSVGElements(objects, {
           name: 'svg',
           lockRotation: false,
           lockScalingY: true,
           lockScalingX: true,
           hasControls: false,
           originX: 'left',
           originY: 'top',
           cornerSize: 15,
           hasRotatingPoint: false,
           perPixelTargetFind: false,
           minScaleLimit: 1,
           maxWidth: 100,
           maxHeight: 100,
           selectable: false
         });
         canvas.add(obj).centerObject(obj).renderAll();
         obj.setCoords();
       });
     };
 
     _loadSVG('<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
       '<path d="M43.3351 4.51232e-07C42.6354 -0.000363279 41.9534 0.219179 41.3857 0.628027C40.8179 1.03688 40.3932 1.61401 40.1718 2.27765L36.7873 12.4306C35.4208 12.9117 34.0842 13.4633 32.7779 14.0902L23.2036 9.30663C22.578 8.99399 21.8698 8.88627 21.1794 8.99839C20.4891 9.1105 19.8515 9.43703 19.3569 9.93159L9.93231 19.3554C9.4377 19.8499 9.1112 20.4877 8.99906 21.178C8.88692 21.8684 8.99482 22.5764 9.30747 23.202L14.0849 32.7562C13.4564 34.0689 12.9003 35.4115 12.4186 36.7849L2.27805 40.1691C1.61436 40.3905 1.03719 40.8152 0.62832 41.3829C0.219452 41.9506 -0.000372086 42.6323 4.7278e-07 43.3319V56.6612C-0.000372086 57.3608 0.219452 58.0429 0.62832 58.6106C1.03719 59.1783 1.61436 59.6029 2.27805 59.8244L12.4512 63.2151C12.9307 64.5733 13.4812 65.8995 14.1044 67.1981L9.30747 76.7915C8.99485 77.417 8.88696 78.1251 8.9991 78.8154C9.11124 79.5057 9.43772 80.1432 9.93231 80.6376L19.3569 90.0684C19.8515 90.563 20.4891 90.8891 21.1794 91.0012C21.8698 91.1133 22.578 91.0056 23.2036 90.693L32.7779 85.9028C34.0828 86.5263 35.416 87.0767 36.7808 87.5559L40.1718 97.722C40.3932 98.3856 40.8179 98.9627 41.3857 99.3716C41.9534 99.7804 42.6354 100 43.3351 100H56.6649C57.3646 100 58.0466 99.7804 58.6143 99.3716C59.1821 98.9627 59.6068 98.3856 59.8282 97.722L63.2192 87.5363C64.5738 87.059 65.9006 86.5099 67.196 85.8898L76.7964 90.693C77.422 91.0056 78.1302 91.1133 78.8206 91.0012C79.5109 90.8891 80.1485 90.563 80.6431 90.0684L90.0677 80.6376C90.5623 80.1432 90.8888 79.5057 91.0009 78.8154C91.113 78.1251 91.0051 77.417 90.6925 76.7915L85.9086 67.2242C86.5357 65.9161 87.087 64.577 87.5683 63.2085L97.7219 59.8244C98.3856 59.6029 98.9628 59.1783 99.3717 58.6106C99.7805 58.0429 100 57.3608 100 56.6612V43.3323C100 42.6327 99.7805 41.9506 99.3717 41.3829C98.9628 40.8152 98.3856 40.3905 97.7219 40.1691L87.5618 36.7849C87.0808 35.4207 86.5281 34.0863 85.9021 32.7823L90.6925 23.202C91.0052 22.5764 91.1131 21.8684 91.0009 21.178C90.8888 20.4877 90.5623 19.8499 90.0677 19.3554L80.6431 9.93159C80.1485 9.43703 79.5109 9.1105 78.8206 8.99839C78.1302 8.88627 77.4221 8.99438 76.7964 9.30702L67.2481 14.0776C65.931 13.4478 64.5842 12.8936 63.2062 12.4114L59.8282 2.27804C59.6068 1.61436 59.1821 1.0369 58.6144 0.628027C58.0466 0.219155 57.3646 -0.000355791 56.6649 4.51232e-07H43.3351ZM45.7368 6.66423H54.2632L57.3549 15.9451C57.5243 16.4537 57.814 16.9141 58.1992 17.2869C58.5844 17.6596 59.0539 17.9337 59.5678 18.0863C61.7367 18.7312 63.8355 19.5936 65.8292 20.6638C66.2989 20.9169 66.8224 21.0536 67.3559 21.0623C67.8893 21.0711 68.4171 20.9517 68.8948 20.7141L77.6295 16.3471L83.6566 22.3737L79.2697 31.1469C79.0303 31.625 78.9095 32.1539 78.9174 32.6885C78.9253 33.2232 79.0618 33.7482 79.3153 34.219C80.383 36.1995 81.2515 38.2798 81.8993 40.4343C82.0522 40.9463 82.3259 41.414 82.6975 41.798C83.069 42.182 83.5275 42.4712 84.0341 42.6409L93.3351 45.7387V54.2644L84.0406 57.3626C83.534 57.5323 83.0756 57.8211 82.704 58.2051C82.3325 58.5891 82.0587 59.0568 81.9058 59.5688C81.2587 61.7274 80.3902 63.813 79.3218 65.7971C79.0683 66.268 78.9318 66.7929 78.9239 67.3276C78.9159 67.8623 79.0368 68.3911 79.2762 68.8692L83.6566 77.6293L77.6295 83.6625L68.8362 79.2628C68.3577 79.0241 67.8287 78.9043 67.294 78.9131C66.7593 78.9218 66.2346 79.0589 65.7641 79.3132C63.7907 80.3749 61.7205 81.2386 59.5743 81.8841C59.0623 82.037 58.5946 82.3108 58.2106 82.6824C57.8266 83.0539 57.5376 83.5121 57.3679 84.0188L54.2632 93.3454H45.7368L42.6321 84.0318C42.4633 83.524 42.1746 83.0643 41.7906 82.6916C41.4065 82.3189 40.9384 82.0441 40.4257 81.8906C38.2714 81.247 36.1843 80.3898 34.2033 79.3262C33.7337 79.0731 33.2101 78.9364 32.6767 78.9277C32.1432 78.9189 31.6154 79.0383 31.1377 79.2759L22.3705 83.6625L16.3434 77.6293L20.7368 68.8431C20.9762 68.365 21.097 67.8361 21.0891 67.3015C21.0812 66.7668 20.9447 66.2422 20.6912 65.7714C19.6266 63.7963 18.7608 61.717 18.1137 59.5688C17.9599 59.058 17.6858 58.5917 17.3143 58.2089C16.9428 57.8261 16.4848 57.5378 15.9789 57.3687L6.66489 54.2644V45.7387L15.9528 42.6409C16.4607 42.472 16.9205 42.1832 17.2932 41.7991C17.6659 41.4151 17.9407 40.947 18.0942 40.4343C18.7405 38.2716 19.6025 36.1808 20.6717 34.1929C20.9252 33.722 21.0617 33.1971 21.0696 32.6624C21.0776 32.1277 20.9567 31.5989 20.7173 31.1208L16.3434 22.3737L22.3705 16.3471L31.1377 20.7272C31.6163 20.9659 32.1452 21.0857 32.6799 21.0769C33.2146 21.0682 33.7394 20.9311 34.2098 20.6768C36.1923 19.6088 38.2754 18.7402 40.4322 18.0929C40.9442 17.94 41.4119 17.6665 41.7959 17.2949C42.1799 16.9234 42.4689 16.4648 42.6386 15.9582L45.7368 6.66423Z" fill="white"/>' +
       '<path d="M49.9885 26.6516C37.1447 26.6516 26.6678 37.1523 26.6678 49.9954C26.6678 62.8384 37.1447 73.3146 49.9885 73.3146C62.8324 73.3146 73.3338 62.8384 73.3338 49.9954C73.3338 37.1523 62.8324 26.6516 49.9885 26.6516ZM49.9885 33.3177C59.2304 33.3177 66.6673 40.7542 66.6673 49.9954C66.6673 59.2366 59.2304 66.6485 49.9885 66.6485C40.7467 66.6485 33.3344 59.2366 33.3344 49.9954C33.3344 40.7542 40.7467 33.3177 49.9885 33.3177Z" fill="white"/>' +
       '</svg>')*/

    function findNewPos(distX, distY, target, obj) {
      // See whether to focus on X or Y axis
      if (Math.abs(distX) > Math.abs(distY)) {
        if (distX > 0) {
          target.set("left", obj.left - target.width);
        } else {
          target.set("left", obj.left + obj.width);
        }
      } else {
        if (distY > 0) {
          target.set("top", obj.top - target.height);
        } else {
          target.set("top", obj.top + obj.height);
        }
      }
    }

    /*canvas.on("mouse:wheel", () => {
        canvas.setZoom(2)
        console.log(canvas.getZoom(10))
        canvas.setWidth(canvasWidth * canvas.getZoom());
        canvas.setHeight(canvasHeight * canvas.getZoom());
    })*/

    console.log(canvas.getObjects()[2])

    canvas.on("object:moving", (options) => {

      canvas.setBackgroundColor('rgba(37, 251, 0, 0.4)', canvas.renderAll.bind(canvas));
    })

    canvas.on("mouse:up", () => {
      canvas.setBackgroundColor('rgba(37, 201, 0, 0.0)', canvas.renderAll.bind(canvas));
    })

    canvas.on('object:moving', function (options) {
      // Sets corner position coordinates based on current angle, width and height
      options.target.setCoords();
      options.target.width



      // Don't allow objects off the canvas
      if (options.target.left < snap) {
        options.target.set("left", 0)

      }

      if (options.target.top < snap) {
        options.target.set("top", 0)
      }

      if ((options.target.width + options.target.left) > (canvasWidth - snap)) {
        options.target.set("left", canvasWidth - options.target.width);
      }

      if ((options.target.height + options.target.top) > (canvasHeight - snap)) {
        options.target.set("top", canvasHeight - options.target.height);
      }

      // Loop through objects
      canvas.forEachObject(function (obj) {
        if (obj === options.target) return;

        // If objects intersect
        if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {

          var distX = ((obj.left + obj.width) / 2) - ((options.target.left + options.target.width) / 2);
          var distY = ((obj.top + obj.height) / 2) - ((options.target.top + options.target.height) / 2);

          // Set new position
          findNewPos(distX, distY, options.target, obj);
        }

        // Snap objects to each other horizontally

        // If bottom points are on same Y axis
        if (Math.abs((options.target.top + options.target.height) - (obj.top + obj.height)) < snap) {
          // Snap target BL to object BR
          if (Math.abs(options.target.left - (obj.left + obj.width)) < snap) {
            options.target.set("left", obj.left + obj.width);
            options.target.set("top", obj.top + obj.height - options.target.height);
          }

          // Snap target BR to object BL
          if (Math.abs((options.target.left + options.target.width) - obj.left) < snap) {
            options.target.set("left", obj.left - options.target.width);
            options.target.set("top", obj.top + obj.height - options.target.height);
          }
        }

        // If top points are on same Y axis
        if (Math.abs(options.target.top - obj.top) < snap) {
          // Snap target TL to object TR
          if (Math.abs(options.target.left - (obj.left + obj.width)) < snap) {
            options.target.set("left", obj.left + obj.width);
            options.target.set("top", obj.top);
          }

          // Snap target TR to object TL
          if (Math.abs((options.target.left + options.target.width) - obj.left) < snap) {
            options.target.set("left", obj.left - options.target.width);
            options.target.set("top", obj.top);
          }
        }

        // Snap objects to each other vertically

        // If right points are on same X axis
        if (Math.abs((options.target.left + options.target.width) - (obj.left + obj.width)) < snap) {
          // Snap target TR to object BR
          if (Math.abs(options.target.top - (obj.top + obj.height)) < snap) {
            options.target.set("left", obj.left + obj.width - options.target.width);
            options.target.set("top", obj.top + obj.height);
          }

          // Snap target BR to object TR
          if (Math.abs((options.target.top + options.target.height) - obj.top) < snap) {
            options.target.set("left", obj.left + obj.width - options.target.width);
            options.target.set("top", obj.top - options.target.height);
          }
        }

        // If left points are on same X axis
        if (Math.abs(options.target.left - obj.left) < snap) {
          // Snap target TL to object BL
          if (Math.abs(options.target.top - (obj.top + obj.height)) < snap) {
            options.target.set("left", obj.left);
            options.target.set("top", obj.top + obj.height);
          }

          // Snap target BL to object TL
          if (Math.abs((options.target.top + options.target.height) - obj.top) < snap) {
            options.target.set("left", obj.left);
            options.target.set("top", obj.top - options.target.height);
          }
        }
      });

      options.target.setCoords();

      // If objects still overlap

      var outerAreaLeft = null,
        outerAreaTop = null,
        outerAreaRight = null,
        outerAreaBottom = null;

      canvas.forEachObject(function (obj) {
        if (obj === options.target) return;

        if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {

          var intersectLeft = null,
            intersectTop = null,
            intersectWidth = null,
            intersectHeight = null,
            intersectSize = null,
            targetLeft = options.target.left,
            targetRight = targetLeft + options.target.width,
            targetTop = options.target.top,
            targetBottom = targetTop + options.target.height,
            objectLeft = obj.left,
            objectRight = objectLeft + obj.width,
            objectTop = obj.top,
            objectBottom = objectTop + obj.height;

          // Find intersect information for X axis
          if (targetLeft >= objectLeft && targetLeft <= objectRight) {
            intersectLeft = targetLeft;
            intersectWidth = obj.width - (intersectLeft - objectLeft);

          } else if (objectLeft >= targetLeft && objectLeft <= targetRight) {
            intersectLeft = objectLeft;
            intersectWidth = options.target.width - (intersectLeft - targetLeft);
          }

          // Find intersect information for Y axis
          if (targetTop >= objectTop && targetTop <= objectBottom) {
            intersectTop = targetTop;
            intersectHeight = obj.height - (intersectTop - objectTop);

          } else if (objectTop >= targetTop && objectTop <= targetBottom) {
            intersectTop = objectTop;
            intersectHeight = options.target.height - (intersectTop - targetTop);
          }

          // Find intersect size (this will be 0 if objects are touching but not overlapping)
          if (intersectWidth > 0 && intersectHeight > 0) {
            intersectSize = intersectWidth * intersectHeight;
          }

          // Set outer snapping area
          if (obj.left < outerAreaLeft || outerAreaLeft == null) {
            outerAreaLeft = obj.left;
          }

          if (obj.top < outerAreaTop || outerAreaTop == null) {
            outerAreaTop = obj.top;
          }

          if ((obj.left + obj.width) > outerAreaRight || outerAreaRight == null) {
            outerAreaRight = obj.left + obj.width;
          }

          if ((obj.top + obj.height) > outerAreaBottom || outerAreaBottom == null) {
            outerAreaBottom = obj.top + obj.height;
          }

          // If objects are intersecting, reposition outside all shapes which touch
          if (intersectSize) {
            var distX = (outerAreaRight / 2) - ((options.target.left + options.target.width) / 2);
            var distY = (outerAreaBottom / 2) - ((options.target.top + options.target.height) / 2);

            // Set new position
            findNewPos(distX, distY, options.target, obj);
          }
        }
      });
    });


    return () => {

      canvas.dispose();
    }


  }, [])


  return (
    <div className="project">
      <div className="project__options" >
        <ul className="options__list">
          <li className="options__item">
            <Button
              id="basic-button-1"
              className='options__item-btn'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Файл
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-1',
              }}
            >
              <MenuItem onClick={handleClose}>Сохранить</MenuItem>
              <MenuItem onClick={handleClose}>Удалить</MenuItem>

            </Menu>
          </li>
          <li className="options__item">
            <Button
              id="basic-button-2"
              className='options__item-btn'
              aria-controls={open ? 'basic-menu-2' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Настройки
            </Button>
            <Menu
              id="basic-menu-2"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-2',
              }}
            >
              <MenuItem onClick={handleClose}>Настройки</MenuItem>
              <MenuItem onClick={handleClose}>Настройки</MenuItem>
              <MenuItem onClick={handleClose}>Настройки</MenuItem>
            </Menu>
          </li>
          <li className="options__item">
            <Button
              id="basic-button-3"
              className='options__item-btn'
              aria-controls={open ? 'basic-menu-3' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Помощь
            </Button>
            <Menu
              id="basic-menu-3"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-3',
              }}
            >
              <MenuItem onClick={handleClose}>О проекте</MenuItem>
              <MenuItem onClick={handleClose}>Возможности</MenuItem>
              <MenuItem onClick={handleClose}>Документация</MenuItem>
            </Menu>
          </li>
        </ul>
      </div>
      <div className="subdiv"></div>
      <div className="project__container">
        <div className="project__instruments" id='project__instruments-id'>
          <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <TreeItem nodeId="1" label="Applications">
                <TreeItem nodeId="2" label="Calendar" />
              </TreeItem>
              <TreeItem nodeId="5" label="Documents">
                <TreeItem nodeId="10" label="OSS" />
                <TreeItem nodeId="6" label="MUI">
                  <TreeItem nodeId="8" label="index.js" draggable="true" className='treedrag' />
                </TreeItem>
              </TreeItem>
            </TreeView>
          </Box>
          <MuiDraggableTreeView tree={data} enableDragAndDrop={true} />
        </div>
        <div className="project__layout">

          <div className="project__layout--inner" id="canvas-container">

            <canvas className='fabricjs__canvas' id="fabric-canvas" ref={ref}></canvas>
          </div>
        </div>
        <div className="project__objects" id='project__objects-id'>
          <div id="images">
            <img draggable="true" src="http://i.imgur.com/8rmMZI3.jpg" width="100" height="100"></img>
            <img draggable="true" src="http://i.imgur.com/q9aLMza.png" width="100" height="100"></img>
            <img draggable="true" src="http://i.imgur.com/wMU4SFn.jpg" width="100" height="100"></img>
            <div className="drag" draggable="true">Болтик</div>
          </div>
        </div>
      </div>
      <div className="subdiv" draggable="true"></div>


    </div>

  );
}

export default Project



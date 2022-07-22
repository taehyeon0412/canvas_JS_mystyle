const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector("#color");
const colorOption = Array.from(
  document.getElementsByClassName("color-option")
);
const paintingBtn = document.querySelector(".painting-btn");
const paintingFillBtn = document.querySelector(".painting-fill-btn");
const bgFillBtn = document.querySelector(".bg-fill-btn");
const saveBtn = document.querySelector(".save");
const newBtn = document.querySelector(".new-btn");
const eraserBtn = document.querySelector(".eraser-btn");

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round"; // butt round square 종류 3가지
ctx.lineWidth = lineWidth.value; //초기값을 설정하기위해 준다
//
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//초기값배경색으로 하얀색을 주기위해서

let painting = false;
let filling = false;

function paintingStart() {
  painting = true;
}

function paintingEnd() {
  if (filling) {
    painting = false;
    ctx.fill();
    ctx.beginPath();
  } else {
    painting = false;
    ctx.beginPath();
  }
}

function mouseMove(event) {
  if (painting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
//--------연필부분

function lineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
//--------굵기 조절

function colorChange(event) {
  const colorValue = event.target.value;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
}

function colorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
  //사용자가 색을 바꿨다는것을 알 수 있게 color input에도 넣어준다
}
//---------------색깔 바꾸기

function paintingBtnClick() {
  filling = false;
  ctx.strokeStyle = color.value;
  ctx.lineWidth = lineWidth.value;
}
function paintingFillBtnClick() {
  filling = true;
  ctx.strokeStyle = color.value;
  ctx.fillStyle = color.value;
  ctx.lineWidth = lineWidth.value;
}
/*paintingEnd함수에 filling 조건문을 추가해서
  버튼을 누르면 모드 바뀌게 하였다  
  지우개로 한 후에 이전에 있던 속성으로 다시 돌아가기위해 
  color.value,lineWidth.value를 넣음*/

function bgFillBtnClick() {
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

//그리기 그리면채워짐 화면채우기 버튼

function saveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a"); //가상의 a를 만들어준다
  if (confirm("저장하시겠습니까?") == true) {
    a.href = url;
    a.download = "내그림.jpg";
    a.click();
  } else {
    return;
  }
}
//저장하기

function newBtnClick() {
  saveClick();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
//새로만들기

function eraserBtnClick() {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 50;
  filling = false;
}
/* 지우개 
지우개로 한 후에 이전에 있던 속성으로 다시 돌아가기위해 
다른 버튼들에 color.value,lineWidth.value를 넣는다*/

canvas.addEventListener("mousedown", paintingStart);
canvas.addEventListener("mouseup", paintingEnd);
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mouseleave", paintingEnd);
//-------연필부분

lineWidth.addEventListener("change", lineWidthChange);
//-------굵기 조절

color.addEventListener("change", colorChange);
colorOption.forEach((color) =>
  color.addEventListener("click", colorClick)
); // 색깔을 클릭할때마다 함수 호출
//---------색깔바꾸기

paintingBtn.addEventListener("click", paintingBtnClick);
paintingFillBtn.addEventListener("click", paintingFillBtnClick);
bgFillBtn.addEventListener("click", bgFillBtnClick);
//그리기 그리면채워짐 화면채우기 버튼클릭

saveBtn.addEventListener("click", saveClick);
//저장하기

newBtn.addEventListener("click", newBtnClick);
//새로만들기

eraserBtn.addEventListener("click", eraserBtnClick);
//지우개

/*클릭 좌표 = client는 window기준 
             offset은 canvas기준  
             console.log(event)*/

/* moveTo() = 시작 좌표
   lineTo() = 끝나는 좌표
   stroke() = 선을 그림 */

/* ctx.beginPath() =  이전에 했던 것과 별개로 새로운 path를 시작한다*/

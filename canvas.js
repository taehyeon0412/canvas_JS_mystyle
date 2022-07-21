const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector("#color");
const colorOption = Array.from(
  document.getElementsByClassName("color-option")
);

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round"; // butt round square 종류 3가지
ctx.lineWidth = lineWidth.value; //초기값을 설정하기위해 준다

let painting = false;

function paintingStart() {
  painting = true;
}

function paintingEnd() {
  painting = false;
  ctx.beginPath();
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

/*클릭 좌표 = client는 window기준 
             offset은 canvas기준  
             console.log(event)*/

/* moveTo() = 시작 좌표
   lineTo() = 끝나는 좌표
   stroke() = 선을 그림 */

/* ctx.beginPath() =  이전에 했던 것과 별개로 새로운 path를 시작한다*/

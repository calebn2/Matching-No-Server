var container = document.getElementById("container");
var bank = document.getElementById("bank");
var codeBox = document.getElementById("codeBox");
var header = document.getElementById("header");
var selectionContainer = document.getElementById("selectionContainer");

var retry = document.getElementById("retry");
retry.addEventListener("click", reset);
var check = document.getElementById("check");
check.addEventListener("click", checkAnswer);
var boxes;
// loadBoxes() is used to gather data from a json file stored in a server, much like what an actaul app would do.
/*
function loadBoxes() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      boxes = data;
      makeBoxes();
    })
    .catch(error => console.error('Error loading data:', error));
}
*/

// here is the data stored on the JSON file so it can be used on a machine without a server.
boxes = [
    {
        "identifier" : "box1",
        "class" : "1",
        "data" : "<code>int x = 0;<br>int[] nums = {0, 1, 2, 3, 4}</code>"
    },
    {
        "identifier" : "box2",
        "class" : "2",
        "data" : "<code>for (int i = 0; i < nums.length; i++ {<br>&emsp;x += nums[i]<br>}</code>"
    },
    {
        "identifier" : "box3",
        "class" : "3",
        "data" : "<code>int y = x / nums.length;</code>"
    },
    {
        "identifier" : "box4",
        "class" : "4",
        "data" : "<code>System.out.println(y);</code>"
    }
]

makeBoxes();


function makeBoxes() {
  for (var i = 0; i < boxes.length; i++) {
    var code = document.createElement("div");
    bank.appendChild(code);
    code.id = boxes[i].identifier;
    code.classList.add("box");
    code.classList.add(boxes[i].class);
    code.innerHTML = boxes[i].data;
    code.addEventListener("click", moveBox);
  }
}

function moveBox() {
    if (bank.contains(this)) codeBox.appendChild(this);
    else if (codeBox.contains(this)) bank.appendChild(this);
}

function checkAnswer() {
    var num = 0;
    var answer = codeBox.children;
    if (!(bank.children.length > 0)) {
        for (let i = 0; i < answer.length; i++) {
            if (!(answer[i].classList.contains(i + 1))) {
                num = 1;
                break;
            }
        }
    } else {
        num = 1;
    }
    bank.classList.add("disabled");
    codeBox.classList.add("disabled");
    header.classList.add("disabled");
    if (num == 0) correct();
    else wrong();
}

function wrong() {
    var el = document.getElementById("incorrect");
    el.classList.replace("disappear", "appear");
    selectionContainer.classList.replace("disappear", "appear");
    retry.classList.add("wrong");
}

function correct() {
    var correct = document.getElementById("correct");
    correct.classList.replace("disappear", "appear");
    selectionContainer.classList.replace("disappear", "appear");
    next.classList.replace("disappear", "appear");
    retry.classList.add("next");
    console.log(retry.classList);
}

function reset() {
    bank.classList.remove("disabled");
    codeBox.classList.remove("disabled");
    header.classList.remove("disabled");
    window.location.reload();
}

//loadBoxes();
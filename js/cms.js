/* Adding Boxes to UI */
var container = document.getElementById("current-classes");
var allClasses = document.getElementById("all-classes");

var classes;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    classes = JSON.parse(this.responseText);
    classes.forEach(displayAllClass);
  }
};
xmlhttp.open("GET", "documents/defaultClasses.json", true);
xmlhttp.send();

var selectedClaseses = localStorage.getItem("selectedClasses");
if (selectedClaseses == null) {
  selectedClaseses = [""];
} else {
  selectedClaseses = selectedClaseses.split(",");
  console.log(selectedClaseses);
  for (var x in selectedClaseses) {
    var element = selectedClaseses[x];
    if (element != "") {
      var jsonClass = getId(element);
      addClassBox(element, true);
    }
  }
}

function getId(id) {
  for (const classObject in classes) {
      const element = classes[classObject];
      if (element.classID == id) {
        console.log(element);
        return element;
      }
  }
}

function displayAllClass(item, index) {
  addClassBox(item, false);
}

function addClassBox(item, selected) {
  var name = item.className;
  var color = item.color;
  var subject = item.subject;
  var description = item.classDescription;
  var gradeLevel = item.gradeLevel;
  var ap = item.ap;
  var honors = item.honors;
  var classID = item.classID;

  var background = document.createElement("div");
  background.className = "class-container";
  background.setAttribute("data-class-id", classID);

  var header = document.createElement("div");
  header.className = "class-name";
  header.innerHTML = name;
  header.style.backgroundColor = color;
  background.appendChild(header);

  var descriptionDiv = document.createElement("div");
  descriptionDiv.innerHTML = description;
  descriptionDiv.className = "class-desciption";
  background.appendChild(descriptionDiv);

  var classCode = document.createElement("div");
  classCode.innerHTML = classID;
  classCode.className = "class-id"
  background.appendChild(classCode);


  if (selected) {
    container.appendChild(background);
  } else {
    allClasses.appendChild(background);
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
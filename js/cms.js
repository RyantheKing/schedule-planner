/* Adding Boxes to UI */
var container = document.getElementById("current-classes");
var allClasses = document.getElementById("all-classes");

var classes;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    classes = JSON.parse(this.responseText);
    classes.forEach(displayAllClass);
    showSelectedClasses(classes);
  }
};
xmlhttp.open("GET", "documents/defaultClasses.json", true);
xmlhttp.send();

function displayAllClass(item, index) {
  addClassBox(item, false);
}

function getId(id) {
  for (const classObject in classes) {
      const element = classes[classObject];
      if (element.classID == id) {
        return element;
      }
  }
}



function addClassBox(item, selected) {
  console.log(item)
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

function showSelectedClasses (classes) {
  var selectedClaseses = localStorage.getItem("selectedClasses");
  if (selectedClaseses == null) {
    selectedClaseses = [];
  } else {
    selectedClaseses = selectedClaseses.split(",");
    for (var x in selectedClaseses) {
      var element = selectedClaseses[x];
      if (element != "") {
        var jsonClass = getId(element);
        addClassBox(jsonClass, true);
      }
    }
  }
}
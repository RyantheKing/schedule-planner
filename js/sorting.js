var document = new Document();

/* search box & sorting*/
var searchBox = document.getElementById("search-searchbox");
searchBox.onkeyup = function(){sorting()};
var apCheckbox = document.getElementById("search-ap-option");
var hrCheckbox = document.getElementById("search-honors-option");
var dropDown = document.getElementById("search-grade-selector");

hrCheckbox.addEventListener('change', function () {
  if (hrCheckbox.checked) {
    // do this
    document.getElementById("search-ap-option").checked = false;
  }
  sorting();
});
apCheckbox.addEventListener('change', function () {
  if (apCheckbox.checked) {
    // do this
    document.getElementById("search-honors-option").checked = false;
  }
  sorting();
});
dropDown.addEventListener('change', function () {
  sorting();
});

var defaultClasses;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    defaultClasses = JSON.parse(this.responseText);
  }
};
xmlhttp.open("GET", "documents/defaultClasses.json", true);
xmlhttp.send();

function sorting() {
  var input, apCheck, honorsCheck, gradeCheck, classContainer, classes, element, i, name, subject, gradeLevel, ap, honors, classID;
  input = document.getElementById("search-searchbox").value.toUpperCase();
  apCheck = document.getElementById("search-ap-option").checked;
  honorsCheck = document.getElementById("search-honors-option").checked;
  gradeCheck = document.getElementById("search-grade-selector").value;

  classContainer = document.getElementById("all-classes");
  classes = classContainer.children;
  for (i = 0; i < classes.length; i++) {
    /*
    get id from element
    get information about class
    find matching sections (name, class code, "<30" = serch for things less than 30 min of hw)
    find matching ap
    find matching honors
    find matching grade?
    */

    element = classes[i];
    defaultClasses.forEach(element => {
      if (element.classID == element.getAttribute("data-class-id")) {
        name = element.className;
        subject = element.subject;
        gradeLevel = element.gradeLevel;
        ap = element.ap;
        honors = element.honors;
      }
    });

    if (name.toUpperCase().indexOf(input) > -1 ||
          subject.toUpperCase().indexOf(input) > -1 ||
          gradeLevel.toUpperCase().indexOf(input) > -1 ||
          classID.toUpperCase().indexOf(input) > -1
        ) {
          classes[i].style.display = "";
        } else {
          classes[i].style.display = "none";
        }

    if (apCheck) {
      if (ap != "true") {
        classes[i].style.display = "none";
      }
    } else if (honorsCheck) {
      if (honors != "true") {
        classes[i].style.display = "none";
      }
    }

    if (gradeCheck != 0) {
      if (gradeCheck != gradeLevel) {
        classes[i].style.display = "none";
      }
    }
  }
}


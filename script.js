

  /* All Globel Variable here */

  var addBtn = document.querySelector('#add-btn');
  var modal =  document.querySelector('.modal');
  var closeBtn = document.querySelector('.class-icon');
  var registerBtn = document.querySelector('#registerBtn');
  var updateBtn = document.querySelector('#update-btn');

  /*This is for storing data */
  var userData = [];

  var id_Element = document.querySelector('#id');
  var name_Element = document.querySelector('#name');
  var l_name_Element = document.querySelector('#l-name');
  var email_Element = document.querySelector('#email');
  var officeCode_Element = document.querySelector('#Office_Code');
  var jobTitle_Element = document.querySelector('#Job_Title');
  var registerForm = document.querySelector("#register_form");
  var allInput = document.querySelectorAll('input');
  var imgUrl;

  /* Modal component */

  addBtn.addEventListener('click', function() {
    updateBtn.disabled = true;
    modal.classList.add("active");
  });

  closeBtn.addEventListener('click', () =>{
    modal.classList.remove('active');
    for(let i = 0; i <= allInput.length; i++){
      allInput[i].value = "";
    }
  });

  /* Registration work on register click */

  // registerBtn.addEventListener('click', (e) =>{
  //   e.preventDefault();
  //   registrationData();
  //   getDataFromLocal();
  //   registerForm.reset('');
  //   closeBtn.click();
  // });  

  registerBtn.onclick = function(e){
    e.preventDefault();
    registrationData();
    getDataFromLocal();
    registerForm.reset('');
    closeBtn.click();
  }

  if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
  }

  // var userData = JSON.parse(localStorage.getItem("userData")) || [];

  const registrationData = () =>{
    userData.push({
      id: id_Element.value,
      name: name_Element.value,
      l_name: l_name_Element.value,
      email: email_Element.value,
      officeCode: officeCode_Element.value,
      jobTitle: jobTitle_Element.value,
      profilePic: imgUrl || "./image/avtar.png"
    })
    var userString = JSON.stringify(userData);
    localStorage.setItem("userData",userString);

    // for showing alert success
    swal("Good job!", "Registration Successful", "success");
  }

  // start returning data on page from localstorage
  var tableData = document.querySelector("#table_id");
  const getDataFromLocal = () =>{
      tableData.innerHTML = '';
      userData.forEach((data,index) =>{
          tableData.innerHTML += `
        <tr data-index="${index}">
                <td>${index+1}</td>
                <td><img src=${data.profilePic} width="40" height="40"/></td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.l_name}</td>
                <td>${data.email}</td>
                <td>${data.officeCode}</td>
                <td>${data.jobTitle}</td>
              <td>
                  <button class="edit_btn"><i class="fa fa-eye"></i></button>
                  <button class="del_btn" style="background-color: #EE534F;"><i class="fa fa-trash"></i></button>
              </td>
          </tr>
  
          `
      });

      /* Start Delete */

      var allDelBtn = document.querySelectorAll('.del_btn');
      console.log(allDelBtn);
      for(var i = 0; i < allDelBtn.length; i++){
        allDelBtn[i].onclick = function() {
          var tr = this.parentElement.parentElement;
          var index = tr.getAttribute("data-index");

          //for alerting delete message;
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

              userData.splice(index,1);
              localStorage.setItem("userData",JSON.stringify(userData)); //update local storage
              getDataFromLocal(); // Refresh the table

              swal("Poof! Employee Data has been deleted!", {
                icon: "success",
              });
            } else {
              swal("File is safe!");
            }
          });
         
        }
      }

      // start Update 
      var allEdit = document.querySelectorAll(".edit_btn");
      for(let i =0; i< allEdit.length; i++){
        allEdit[i].onclick = function() {
          var tr = this.parentElement.parentElement;
          var td = tr.getElementsByTagName("TD");
          
          var index = tr.getAttribute("data-index")
          var imgTag = td[1].getElementsByTagName("IMG");
          var profile_pic = imgTag[0].src;
          var id = td[2].innerHTML;
          var name = td[3].innerHTML;
          var l_name = td[4].innerHTML;
          var email = td[5].innerHTML;
          var officeCode = td[6].innerHTML;
          var jobTitle = td[7].innerHTML;
          
          addBtn.click()
          registerBtn.disabled = true;
          updateBtn.disabled = false;
          id_Element.value = id;
          name_Element.value = name;
          l_name_Element.value = l_name;
          email_Element.value = email;
          officeCode_Element.value = officeCode;
          jobTitle_Element.value = jobTitle;
          profilePic.src = profile_pic;
          updateBtn.onclick = function(e){
            userData[index] = {
              id: id_Element.value,
              name: name_Element.value,
              l_name: l_name_Element.value,
              email: email_Element.value,
              officeCode: officeCode_Element.value,
              jobTitle: jobTitle_Element.value,
              profilePic: uploadPic.value == "" ? profilePic.src : imgUrl
            }
            localStorage.setItem("userData", JSON.stringify(userData));
          }
        }
      }

  }

getDataFromLocal();



 // Image processing
var profilePic = document.querySelector("#profile_pic");
var uploadPic = document.querySelector("#upload_pic");
uploadPic.onchange = function() {
  if (uploadPic.files && uploadPic.files[0]) {
    if(uploadPic.files[0].size < 1000000) { // 1MB limit
      var fReader = new FileReader();
      fReader.onload = function(e) {
        imgUrl = e.target.result;
        profilePic.src = imgUrl; // Display the selected image
      };
      fReader.readAsDataURL(uploadPic.files[0]);
    } else {
      alert("File size is too large");
    }
  }
};


let dataform = document.forms.namedItem("dataform");
if(dataform !== null){
	dataform.addEventListener("submit", (e) => {
	  e.preventDefault();
	  let TextREd = [];
	  if(dataform['nombres'].value === "")
		TextREd.push("Faltaron los nombres.");
	  if(dataform['fnacimiento'].value === "")
		TextREd.push("Falto la fecha de fecha nacimiento.");
	  if(dataform['celular'].value === "")
		TextREd.push("Falto el número de celular.");
	  if(dataform['genero'].value === "")
		TextREd.push("Falto el genero.");
	  if(dataform['ntorre'].value === "")
		TextREd.push("Falto el número de torre.");
	  if(dataform['napartamento'].value === "")
		TextREd.push("Falto el número de apartamento.");
	  if(TextREd.length){
		const elements = document.getElementsByClassName('alert');
		elements[0].innerHTML = "";
		elements[0].innerHTML += '<span class="closebtn">&times;</span>';
		TextREd.forEach(function(currentValue, index, arr){
		  elements[0].innerHTML += `<strong>■ ${currentValue}</strong><br>`;
		});
		elements[0].style.display = "block";
	  }
	  else
		dataform.submit();

	});	
}


let form_login = document.forms.namedItem("login-form");
form_login.addEventListener("submit", (e) =>{
	e.preventDefault();
	var errors = [];
	if(form_login['email'].value === "")
		errors.push("Falta el correo electronicó");
	if(form_login['password'].value === "")
		errors.push("Falta la contraseña.");
	if(errors.length){
		const elements = document.getElementsByClassName('alert');
		elements[0].innerHTML = "";
		elements[0].innerHTML += '<span class="closebtn">&times;</span>';
		errors.forEach(value =>{
		  elements[0].innerHTML += `<strong>■ ${value}</strong><br>`;
		});
		elements[0].style.display = "block";

	}
	else
		form_login.submit();
});

elemento = document.getElementById('msg');
elemento.onclick = function(){
  elemento.style.display = "none";
}

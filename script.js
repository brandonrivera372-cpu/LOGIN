const tabLogin = document.getElementById('tabLogin');
const tabSignup = document.getElementById('tabSignup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toast = document.getElementById('toast');

function showLogin(){
  tabLogin.classList.add('active');
  tabSignup.classList.remove('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
}
function showSignup(){
  tabSignup.classList.add('active');
  tabLogin.classList.remove('active');
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
}
tabLogin.addEventListener('click', showLogin);
tabSignup.addEventListener('click', showSignup);

function setError(shellId, errId, isError){
  document.getElementById(shellId).classList.toggle('error', isError);
  document.getElementById(errId).classList.toggle('show', isError);
}

function isValidEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), 2600);
}

// ----CONFIRMACIONES DEL LOGIN ----
loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;

  const emailOk = isValidEmail(email);
  const passOk = pass.length > 0;

  setError('shellLoginEmail', 'errLoginEmail', !emailOk);
  setError('shellLoginPass', 'errLoginPass', !passOk);

  if (emailOk && passOk){
    showToast('Sesión iniciada correctamente');
    loginForm.reset();
  }
});

// ---- CREACION DE CUENTA ----
const signPass = document.getElementById('signPass');
const strengthBar = document.getElementById('strengthBar');

signPass.addEventListener('input', function(){
  const v = signPass.value;
  let score = 0;
  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  const pct = (score / 4) * 100;
  strengthBar.style.width = pct + '%';
  if (score <= 1) strengthBar.style.background = '#c14f4f';
  else if (score <= 2) strengthBar.style.background = '#d1a13f';
  else if (score <= 3) strengthBar.style.background = '#8fae52';
  else strengthBar.style.background = '#6b46c1';
});

function passwordValid(v){
  return v.length >= 8 && /[A-Za-z]/.test(v) && /[0-9]/.test(v);
}

signupForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('signName').value.trim();
  const email = document.getElementById('signEmail').value;
  const pass = document.getElementById('signPass').value;
  const confirm = document.getElementById('signConfirm').value;

  const nameOk = name.length >= 3;
  const emailOk = isValidEmail(email);
  const passOk = passwordValid(pass);
  const confirmOk = confirm.length > 0 && confirm === pass;

  setError('shellName', 'errName', !nameOk);
  setError('shellEmail', 'errEmail', !emailOk);
  setError('shellPass', 'errPass', !passOk);
  setError('shellConfirm', 'errConfirm', !confirmOk);

  if (nameOk && emailOk && passOk && confirmOk){
    showToast('Cuenta creada correctamente');
    signupForm.reset();
    strengthBar.style.width = '0%';
    setTimeout(showLogin, 900);
  }
});

// limpiar el error de un campo apenas el usuario lo corrige
document.querySelectorAll('.input-shell input').forEach(inp=>{
  inp.addEventListener('input', ()=>{
    const shell = inp.closest('.input-shell');
    shell.classList.remove('error');
    const err = shell.parentElement.querySelector('.error-msg');
    if (err) err.classList.remove('show');
  });
});

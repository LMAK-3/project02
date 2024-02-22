const burguerMenu = document.querySelector('.burguer_menu');
const menu = document.querySelector(".mobile_menu");

burguerMenu.addEventListener('click', () => {
    menu.classList.toggle('hidden');
})
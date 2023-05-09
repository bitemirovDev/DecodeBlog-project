const dropdown = document.querySelectorAll('.dropdown')
const dropdownContent = document.querySelectorAll('.dropdownContent')
    
for(let i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener('click', function(){
        dropdownContent[i].classList.toggle('show')
    });
}

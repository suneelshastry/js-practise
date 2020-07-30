export class Dropdown {
    _isOpen = false;
    constructor(dropdown) {
        this.dropdownElement = dropdown;
        this.dropdownMenu = dropdown.querySelector('.dropdown-menu');
        this.dropdownValue = dropdown.querySelector('.dropdown-value');
        this.init();
    }

    attachMenuEvents () {
        const menuItems = this.dropdownMenu.querySelectorAll('.dropdown-item');

        menuItems
        .forEach(
            menuItem => menuItem.addEventListener('click', this.handleItemClick.bind(this))
        );
    }

    attachDropdownEvent () {
        this.dropdownValue
        .addEventListener('click', this.toggleDropdown.bind(this));
    }

    attachBackdrop () {
        let backDrop = document.querySelector('.backdrop');

        if (!backDrop) {
            backDrop = document.createElement('div');
            backDrop.classList.add('backdrop');
        }

        backDrop.addEventListener('click', this.handleBackDropClick.bind(this))

        document.querySelector('body')
        .appendChild(backDrop);
    }

    toggleDropdown () {
        if (!this._isOpen) {
            this.showDropdown();
        } else {
            this.removeDropdown();
        }
    }

    handleItemClick (e) {
        const value = e.target.textContent || '';
        this.dropdownValue.textContent = value;
        
        this.removeDropdown();
    }

    showDropdown () {
        if (!this.dropdownMenu) {
            return;
        }
        this._isOpen = true;
        this.dropdownMenu.classList.add('active');
    }

    removeDropdown () {
        if (!this.dropdownMenu) {
            return;
        }
        this._isOpen = false;
        this.dropdownMenu.classList.remove('active');
    }

    handleBackDropClick (_e) {
        if (!this._isOpen) {
            return;
        }

        this.removeDropdown();
    }

    init () {
        this.attachBackdrop();
        this.attachDropdownEvent();
        this.attachMenuEvents();
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => new Dropdown(dropdown));
});
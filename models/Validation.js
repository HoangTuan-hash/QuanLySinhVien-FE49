var Validation = function () {
    this.kiemTraRong = function (value, selectError) {
        if (value.trim() === '') {
            document.querySelector(selectError).innerHTML = 'Không được bỏ trống';
            document.querySelector(selectError).style.display = 'block';
            return false;
        }
        document.querySelector(selectError).innerHTML = '';
        document.querySelector(selectError).style.display = 'none';
        return true;
    }
    this.kiemTraTatCaLaChuoi = function (value, selectorError) {
        var regexName = /^[a-z A-Z]+$/;
        if (regexName.test(value.trim())) {
            document.querySelector(selectorError).style.display = 'none';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Bạn đã nhập sai tên!';
        document.querySelector(selectorError).style.display = 'block';
        return false;

    }
    this.kiemTraEmail = function (value, selectorError) {
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexEmail.test(value.trim())) {
            document.querySelector(selectorError).style.display = 'none';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Bạn đã nhập sai email !';
        document.querySelector(selectorError).style.display = 'block';
        return false;

    }
    this.kiemTraAllNumber = function (value, selectorError) {
        var regexNumber = /^[0-9.]+$/;
        if (regexNumber.test(value.trim())) {
            document.querySelector(selectorError).style.display = 'none';
            return true;
        }

        document.querySelector(selectorError).innerHTML = 'Bạn đã nhập sai điểm !';
        document.querySelector(selectorError).style.display = 'block';
        return false;
    }
    this.kiemTraGiaTri = function (value, selectorError, minValue, maxValue) {
        var valid = this.kiemTraAllNumber(value, selectorError);
        if (Number(value.trim()) < minValue || Number(value.trim()) > maxValue || !valid) {
            document.querySelector(selectorError).style.display = 'block';
            document.querySelector(selectorError).innerHTML = `Giá trị từ ${minValue} - ${maxValue}   !`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }
    this.kiemTraDoDai = function (value, selectorError, minLength, maxLength) {
        if (value.length < minLength || value.length > maxLength) {
            document.querySelector(selectorError).style.display = 'block';
            document.querySelector(selectorError).innerHTML = `Giá trị từ ${minLength} - ${maxLength} ký tự  !`;
            return false;
        } else {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true;
        }
    }
}
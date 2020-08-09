//Chứa thông tin tất cả sinh viên được thêm từ form
var mangSinhVien = [];
var validate = new Validation();

//------------------Giao Tiếp với API----------------


var objectAPI = {
    url:''//đường dẫn đến file hoặc link backend cung cấp

}




var renderTableSinhVien = function (mangSV) {
    //Từ dữ liệu mảng tạo ra các thẻ tr tương ứng
    var chuoiTr = '';
    for (var index = 0; index < mangSV.length; index++) {
        //Mỗi lần duyệt lấy ra dữ liệu của 1 sinh vien trong mảng
        var sinhVien = mangSV[index];
        //Từ dữ liệu sinh viên tạo ra từng dòng <tr> tương ứng
        var sv = new SinhVien();
        sv.tenSV = sinhVien.maSV;
        sv.maSV = sinhVien.tenSV;
        sv.diemToan = sinhVien.diemToan;
        sv.diemLy = sinhVien.diemLy;
        sv.diemHoa = sinhVien.diemHoa;
        sv.diemRenLuyen = sinhVien.diemRenLuyen;
        sv.email = sinhVien.email;
        chuoiTr += `
                <tr>
                    <td>${sv.maSV}</td>
                    <td>${sv.tenSV}</td>
                    <td>${sv.email}</td>
                    <td>${sv.xepLoai()}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td>${sv.diemRenLuyen}</td>
                    <td><button class="btn btn-danger" onclick = "xoaSinhVien('${sinhVien.maSV}')">Xóa</button></td>
                </tr>
        `
    }
    //Thoát ra khỏi vòng lặp
    document.getElementById('tableSinhVien').innerHTML = chuoiTr;
}
var xoaSinhVien = function (maSV) {
    //Từ mã sinh viên sẽ tìm ra thằng sinhVien cần xóa
    for (var index = mangSinhVien.length - 1; index >= 0; index--) {
        var sinhVien = mangSinhVien[index];
        if (sinhVien.maSV === maSV)//Nếu sinhVien trong mảng có mã = maSinhVien được click
        {
            //Tại vị trí đó mình sẽ xóa phần đó đi
            mangSinhVien.splice(index, 1);
        }
    }
    renderTableSinhVien(mangSinhVien);
    luuLocalStorage();
}

document.querySelector('#btnThemSinhVien').onclick = function () {
    // Lấy thông tin sinh viên thêm vào
    var sinhVien = new SinhVien();
    sinhVien.maSV = document.querySelector('#maSV').value;
    sinhVien.tenSV = document.querySelector('#tenSV').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.loaiSV = document.querySelector('#loaiSinhVien').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    console.log(sinhVien.diemToan);

    //Kiểm tra dữ liệu hợp lệ trước khi thêm vào mảng
    //kiểm tra rỗng
    var valid = validate.kiemTraRong(sinhVien.maSV, '#error_maSinhVien') & validate.kiemTraRong(sinhVien.tenSV, '#error_tenSinhVien') & validate.kiemTraRong(sinhVien.email, '#error_email') & validate.kiemTraRong(sinhVien.diemToan, '#error_diemToan') & validate.kiemTraRong(sinhVien.diemLy, '#error_diemLy') & validate.kiemTraRong(sinhVien.diemHoa, '#error_diemHoa') & validate.kiemTraRong(sinhVien.diemRenLuyen, '#error_diemRenLuyen');
    //Kiểm tra tên sinh viên la ky tu
    valid &= validate.kiemTraTatCaLaChuoi(sinhVien.tenSV, '#error_all_letter_tenSinhVien');
    valid &= validate.kiemTraEmail(sinhVien.email, '#error_style_email');

    valid &= validate.kiemTraAllNumber(sinhVien.diemToan, '#error_all_number_diemToan');
    valid &= validate.kiemTraGiaTri(sinhVien.diemToan, '#error_min_max_value_diemToan', 0, 10);

    valid &= validate.kiemTraAllNumber(sinhVien.diemLy, '#error_all_number_diemLy');
    valid &= validate.kiemTraGiaTri(sinhVien.diemLy, '#error_min_max_value_diemLy', 0, 10);

    valid &= validate.kiemTraAllNumber(sinhVien.diemHoa, '#error_all_number_diemHoa');
    valid &= validate.kiemTraGiaTri(sinhVien.diemHoa, '#error_min_max_value_diemHoa', 0, 10);

    valid &= validate.kiemTraAllNumber(sinhVien.diemRenLuyen, '#error_all_number_diemHoa');
    valid &= validate.kiemTraGiaTri(sinhVien.diemRenLuyen, '#error_min_max_value_diemRenLuyen', 0, 10);

    //kiểm tra độ dài
    valid &= validate.kiemTraDoDai(sinhVien.maSV, '#error_min_max_length_maSinhVien', 3, 6);

    if (!valid) {//nếu valid = false
        return;
    }
    //push(): phương thức thêm 1 phần tử vào mangSinhVien
    mangSinhVien.push(sinhVien);
    //tạo ra giao diện từ mảng;


    renderTableSinhVien(mangSinhVien);
    luuLocalStorage();

}

var luuLocalStorage = function () {
    //Biến mangSinhVien => chuỗi
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    //Lưu vào localstorage
    localStorage.setItem('mangSinhVien', sMangSinhVien);
}
var layDuLieuLocalStorage = function () {
    if (localStorage.getItem('mangSinhVien'))
        //Lấy dữ liệu từ localStorage
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
    //Lưu vào localstorage

    //Chuyển chuỗi localStorage  về mảng (object) và gán cho mangSinhVien
    mangSinhVien = JSON.parse(sMangSinhVien);
    //Gọi hàm render mangSinhVien => render lại table
    renderTableSinhVien(mangSinhVien);
    console.log(mangSinhVien);
}

layDuLieuLocalStorage();

var sapXepSinhVien =function(){
    console.log('UserA , sap xếp sinh viên');
}
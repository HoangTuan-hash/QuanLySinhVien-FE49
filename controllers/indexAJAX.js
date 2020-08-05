//Khai báo svService tương tác API
var svService = new SinhVienServices();


//------------------Giao Tiếp với API----------------
var getApiSinhVien = function () {
    var objectAPI = {
        url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',//đường dẫn đến file hoặc link backend cung cấp
        method: 'GET'//phương thức BE cung cấp
    }
    //Gởi yêu cầu dữ liệu đến BE
    var promise = axios(objectAPI);

    //Xử lý thành công 
    var funcSuccess = function (result) {
        // console.log(result.data);
        renderTableSinhVien(result.data);
    }
    //Xử lý thất bại
    var funcFail = function (error) {
        console.log(error);
    }

    //then(): Hàm nhận vào giá trị là 1 hàm xử lý thành công
    //catch(): Hàm nhận vào giá trị là 1 hàm xử lý thất bại
    promise.then(funcSuccess).catch(funcFail);

    //Lưu ý: ajax là 1 kỹ thuật xử lý bất đồng bộ. Trong hki nó đc thực thi thì mấy hàm khác vẫn đc thực thi song song, ko cần chờ đợi như hàm dồng bộ là thực thị từ trên xuống dưới.
}

getApiSinhVien();
var renderTableSinhVien = function (mangSinhVien) {
    var contentTable = '';
    //Sau khi lấy đc data từ BE thì tạo bảng table
    for (i = 0; i < mangSinhVien.length; i++) {
        var sinhVien = mangSinhVien[i];
        //Tạo ra 1 sv object từ prototype sinh vien
        var sv = new SinhVien();

        sv.maSV = sinhVien.MaSV;
        sv.tenSV = sinhVien.HoTen;
        sv.email = sinhVien.Email;
        sv.diemToan = sinhVien.DiemToan;
        sv.diemLy = sinhVien.DiemLy;
        sv.diemHoa = sinhVien.DiemHoa;
        sv.diemRenLuyen = 5;
        contentTable += `
                <tr>
                    <td>${sv.maSV}</td>
                    <td>${sv.tenSV}</td>
                    <td>${sv.email}</td>
                    <td>${sv.xepLoai()}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td>${sv.diemRenLuyen}</td>

                    <td>
                    <button class="btn btn-primary" onclick = "chinhSuaSinhVien('${sv.maSV}')">Chỉnh sửa</button>
                    <button class="btn btn-danger" onclick = "xoaSinhVien('${sv.maSV}')">Xóa</button>
                    </td>
                </tr>
        `
    }
    //DOM đến giao diện ghi thông tin dữ liệu vào
    document.getElementById('tableSinhVien').innerHTML = contentTable;
}
//

var chinhSuaSinhVien = function (maSV) {
    var promise = svService.layThongTinSinhVien(maSV);
    promise.then(function (result) {
        // console.log(result.data);
        var sinhVienEdit = result.data;
        document.getElementById('maSV').value = sinhVienEdit.MaSV;
        document.getElementById('tenSV').value = sinhVienEdit.HoTen;
        document.getElementById('diemToan').value = sinhVienEdit.DiemToan;
        document.getElementById('diemLy').value = sinhVienEdit.DiemLy;
        document.getElementById('diemHoa').value = sinhVienEdit.DiemHoa;
        document.getElementById('email').value = sinhVienEdit.Email;
        //Khóa mã lại không cho người dung chỉnh sửa
        document.getElementById('maSV').disabled = true;
        document.getElementById('btnThemSinhVien').disabled = true; 
    }).catch(function (error) {
        console.log(error);
    })
}
document.getElementById('btnLuuSinhVien').onclick = function(){
    //Lấy thông tin sinh viên gán vào data để gửi lên API
    var sinhVienCapNhat = {
        "MaSV": document.getElementById('maSV').value,
        "HoTen":document.getElementById('tenSV').value,
        "Email": document.getElementById('email').value,
        "SoDT": "123456789",
        "CMND": "123456789",
        "DiemToan": document.getElementById('diemToan').value,
        "DiemLy": document.getElementById('diemLy').value,
        "DiemHoa": document.getElementById('diemHoa').value
      }
      //Gọi services cập nhật dữ liệu server
      var promise = svService.capNhatSinhVien(sinhVienCapNhat);
      promise.then(function(result){
          console.log(result.data);
          //Load Lại table
          getApiSinhVien();
          //Mở khóa nút thêm sinh viên
          document.getElementById('btnThemSinhVien').disabled = false;
          document.getElementById('maSV').disabled = false;
          document.getElementById('btnLuuSinhVien').disabled = true;
      })
      console.log(sinhVienCapNhat);
}
//----------Thêm dữ liệu cho sever qua API POST---------
document.getElementById('btnThemSinhVien').onclick = function () {
    //Lấy thông tin từ người dùng
    var sinhVien = {

        MaSV: document.getElementById('maSV').value,
        HoTen: document.getElementById('tenSV').value,
        Email: document.getElementById('email').value,
        SoDT: 123456789,
        CMND: 123456789,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value

    }



    console.log(sinhVien);
    //DÙng axios gọi ajax đưa dữ liệu lên BE xử lý
    var objectAxios = {
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: sinhVien //Thuộc tính BE yêu cầu dữ liệu gửi đi phải đúng định dạng
    }
    var promise = axios(objectAxios);

    promise.then(function (result) {
        //Thêm thành công gọi lại API lấy danh sách sinh viên mưới về
        getApiSinhVien();
        console.log(result.data);
    }).catch(function (error) {
        console.log(error);
    })
}

//-----------Xóa Sinh Viên qua api

var xoaSinhVien = function (maSV) {
    //Dung service gọi api xóa
    var promise = svService.xoaSinhVien(maSV);

    promise.then(function (result) {
        //Xóa thành công thì load lại api get LayDanhSachSinhVien
        getApiSinhVien();
        console.log(result.data);
    }).catch(function (error) {
        console.log(error);
    })
}
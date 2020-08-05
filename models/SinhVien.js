var SinhVien = function () {
    this.tenSV = '';
    this.maSV = '';
    this.diemToan = '';
    this.diemLy = '';
    this.diemHoa = '';
    this.diemRenLuyen = '';
    this.loaiSV = '';
    this.email = '';
    this.tinhDiemTrungBinh = function () {
        return (Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa)) / 3;
    };
    this.xepLoai = function (diemTrungBinh, diemRenLuyen) {
        var diemTrungBinh = this.tinhDiemTrungBinh();
        if (this.diemRenLuyen < 5) {
            return 'Yeu';
        } else if (this.diemRenLuyen >= 5) {
            if (diemTrungBinh < 5) {
                return 'Yeu'
            } else if (diemTrungBinh >= 5 && diemTrungBinh < 6.5) {
                return 'Trung Bình Khá';
            } else if (diemTrungBinh >= 6.5 && diemTrungBinh < 8) {
                return 'Khá';
            } else if (diemTrungBinh >= 8 && diemTrungBinh < 9) {
                return 'Giỏi';
            } else if (diemTrungBinh >= 9 && diemTrungBinh <= 10) {
                return 'Xuất sắc';
            } else {
                return 'Điểm trung bình không hợp lệ';
            }
        }
    }
}
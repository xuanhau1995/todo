const numbers = [-5, 3, -10, 8, 15, -2];

function findMaxAbsValueIndex(arrNumber) {
  let maxAbsValue = -1; // Khởi tạo giá trị ban đầu
  let maxAbsValueIndex = -1; // khởi tạo vị tri ban đầu

  for (let i = 0; i < numbers.length; i++) {
    const absValue = Math.abs(arrNumber[i]); // Lấy giá trị tuyệt đối

    if (absValue > maxAbsValue) {
      maxAbsValue = absValue; // Cập nhật giá trị tuyệt đối lớn nhất
      maxAbsValueIndex = i; // Cập nhật vị trí
    }
  }

  return maxAbsValueIndex;
}

const maxAbsValueIndex = findMaxAbsValueIndex(numbers);
console.log(
  "Vị trí của số có giá trị tuyệt đối lớn nhất là:",
  maxAbsValueIndex
);

/**
 * Diẽn giải
 * 1. Đâu tiên khởi tạo 1 mảng 'numbers' chứa các số nguyên.
 * 2. Sau đó định nghĩa 1 hàm: findMaxAbsValueIndex để tìm vị trí của số
 * nguyên tuyệt đối lớn nhất trong mảng.
 * 3. Trong hàm findMaxAbsValueIndex đầu tiên ta khởi tạo maxAbsValue với giá trị
 * ban đầu là  -1, để theo giỏi giá trị tuyệt đối lớn nhất.
 * 'maxAbsValueIndex' với giá trị ban đầu là -1, để theo dõi vị trí của số có giá
 * trị tuyệt đối lớn nhất
 * 4. Sử dụng vòng lập for để duyệt for mỗi phần tử trong mảng 'numbers'. Biến 'i' dùng để
 * duyệt qua các phần tử.
 * 5. Trong mỗi vòng lập ta dùng Math.abs() để lấy giá trị tuyệt đối của phần tử tại vị trí 'i'
 * sau đó ta lưu nó và biến absValue
 * 6. Ta so sánh absValue với maxAbsValue. nếu absValue lớn hơn maxAbsValue ta cập nhật
 * maxAbsValue bằng giá trị tuyệt đối và maxAbsValueIndex bằng i
 * 7. Khi hoàn thành vong lập thì maxAbsValueIndex sẽ chưa vị trí của số có giá trị tuyệt đối lớn nhất
 */
